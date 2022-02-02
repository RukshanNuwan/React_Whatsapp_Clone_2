import {Button} from "@mui/material";
import {auth} from "../firebase";
import {useStateValue} from "../StateProvider";
import {actionTypes} from "../reducer";
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import './Login.css';

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((result) => {
      dispatch({
        type: actionTypes.SET_USER,
        payload: result.user
      });
    }).catch((error) => {
      alert(error.message());
    });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" alt=""/>
        <div className="login__text">
          <h1>Sign in to Whatsapp</h1>
        </div>

        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
};

export default Login;
