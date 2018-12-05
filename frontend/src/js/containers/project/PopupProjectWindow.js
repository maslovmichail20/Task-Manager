import { connect } from 'react-redux';

import { createTaskColumn, editTaskColumn, removeTaskColumn, closePopupWindow } from '../../actions/index';
import DialogWindow from '../../components/app/common/DialogWindow';


const mapStateToProps = state => {
  const { id, type } = state.currentProject.present.popupWindow;

  switch (type) {
    case 'edit-column': {
      const { name, color } = state.currentProject.present.columns.find(col => col.id === id);
      return {
        config: {
          windowTitle: 'Edit column menu',
          fields: [
            {
              name: 'Column title',
              withValidation: true,
              value: name,
              serializeTo: 'name'
            }
          ],
          saveButton: {
            text: 'edit',
            handler: 'editColumnHandler'
          },
          additionButton: {
            text: 'delete',
            handler: 'removeColumnHandler',
            data: id
          },
          colors: {
            title: 'Column color',
            checkedColor: color,
            serializeTo: 'color'
          },
          otherData: [
            {
              value: id,
              serializeTo: 'id'
            }
          ]
        }
      }
    }
    default: {
      return {
        config: {
          windowTitle: 'Create column menu',
          fields: [
            {
              name: 'Column title',
              withValidation: true,
              value: '',
              serializeTo: 'name'
            }
          ],
          saveButton: {
            text: 'create',
            handler: 'createColumnHandler'
          },
          colors: {
            title: 'Column color',
            checkedColor: 'teal',
            serializeTo: 'color'
          }
        }
      }
    }
  }
};

const mapDispatchToProps = dispatch => ({
  editColumnHandler: columnConfig => dispatch(editTaskColumn(columnConfig)),
  createColumnHandler: columnConfig => dispatch(createTaskColumn(columnConfig)),
  removeColumnHandler: id => dispatch(removeTaskColumn(id)),
  closeHandler: () => dispatch(closePopupWindow())
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogWindow);