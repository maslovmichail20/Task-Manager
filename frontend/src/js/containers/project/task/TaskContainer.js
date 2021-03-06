import React from 'react';
import { connect } from 'react-redux';

import SortableList from "../../SortableList";
import AddTask from './AddTask';
import {moveTaskInsideColumn, editTask, removeTask, openPopupWindow} from "../../../actions";
import Task from "../../../components/app/project/Task";


const TaskContainer = ({ columnId, tasksList, nextColumnId, positionInNextCol,
                         onSortEnd, onRemove, onMove, onShow }) => {
  const tasks = tasksList.map((task, i) =>
    <Task shortName={task.shortName}
          onRemove={onRemove(columnId, i)}
          onMove={nextColumnId ? onMove({
            oldColumnId: columnId,
            newColumnId: nextColumnId,
            ...task,
            newPosition: positionInNextCol + 1,
            oldPosition: i
          }) : null}
          onShow={onShow(columnId, i)}
    />
  );

  const shouldCancelStart = e => e.target.tagName.toLowerCase() === 'i';

  return (
    <SortableList className={'task-container'}
                  itemClassName={'task'}
                  axis={'y'}
                  items={tasks}
                  onSortEnd={onSortEnd(columnId)}
                  shouldCancelStart={shouldCancelStart}
                  insertComponent={<AddTask columnId={columnId}/>}
                  useWindowAsScrollContainer={true}
    />
  )
};

const mapStateToProps = (state, ownProps) => {
  const { columns } = state.currentProject.present;
  const { columnId } = ownProps;

  let colIndex = columns.findIndex(col => col.id === columnId);
  const tasksList = columns[colIndex].tasks;
  const nextColumnId = columns[colIndex+1] ? columns[colIndex+1].id : undefined;
  const positionInNextCol = columns[colIndex+1] ? columns[colIndex+1].tasks.length : undefined;

  return {
    columnId,
    tasksList,
    nextColumnId,
    positionInNextCol
  }
};

const mapDispatchToProps = dispatch => ({
  onSortEnd: columnId => ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) dispatch(moveTaskInsideColumn(columnId, oldIndex, newIndex))
  },
  onRemove: (columnId, position) => () => {
    dispatch(removeTask(columnId, position))
  },
  onMove: taskConfig => () => {
    dispatch(editTask(taskConfig));
  },
  onShow: (columnId, index) => () => {
    dispatch(openPopupWindow('show-task', columnId, index));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);