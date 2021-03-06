import { connect } from 'react-redux';

import { signInRequest, signInSuccess, signInFailure } from '../../actions/index';
import SignInButton from '../../components/app/login/SignInButton';

const mapStateToProps = ({ status, ws }) => ({
  isSignedIn: status.isSignedIn,
  isRequesting: status.isRequesting,
  wsStatus: ws.status
});

const mapDispatchToProps = dispatch => ({
  onSuccess: response => dispatch(signInSuccess(response)),
  onRequest: () => dispatch(signInRequest()),
  onFailure: () => dispatch(signInFailure())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInButton);

