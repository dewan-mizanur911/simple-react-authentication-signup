import "bootstrap/dist/css/bootstrap.min.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signOut
} from "firebase/auth";
import { Card, Col } from "react-bootstrap";
import './App.css';
import React, { useState } from "react";
import initializeAuthentication from "./Firebase/firebase.initialize";
import SignUp from "./components/SignUp/SignUp";
import Details from "./components/Details/Details";

export const UserContext = React.createContext('User');

initializeAuthentication();
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const yahooProvider = new OAuthProvider("yahoo.com");

function App() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleCheckBox = e => {
    setCheck(e.target.checked);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    !check ?
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
      console.log(result.user);
      }).catch(error => {
        setError(error.message);
      })
      :
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
        const { displayName, email, photoURL } = result.user;
        const user = {
          name: displayName,
          email: email,
          img: photoURL,
        };
        setUser(user);
        }).catch(error => {
      setError(error.message)
    })
  }

  const handleGoogleSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const user = {
          name: displayName,
          email: email,
          img: photoURL
        };
        setUser(user);
      }).catch(error => {
        setError(error.message);
    })
  }

  const handleFacebookSignin = () => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const user = {
          name: displayName,
          email: email,
          img: photoURL
        }
        setUser(user);
      }).catch(error => {
      setError(error.message);
    })
  }

  const handleGithubSignin = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const user = {
          name: displayName,
          email: email,
          img: photoURL
        };
        setUser(user);
      })
      .catch(error => {
        setError(error.message);
    })
  }

  const handleYahooSignin = () => {
    signInWithPopup(auth, yahooProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const user = {
          name: displayName,
          email: email,
          img: photoURL
        };
        setUser(user);
      }).catch(error => {
        setError(error.message);
    })
  }

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <UserContext.Provider
      value={{
        handleEmailChange: handleEmailChange,
        handlePasswordChange: handlePasswordChange,
        handleCheckBox: handleCheckBox,
        handleOnSubmit: handleOnSubmit,
        handleGoogleSignin: handleGoogleSignin,
        handleFacebookSignin: handleFacebookSignin,
        handleYahooSignin: handleYahooSignin,
        handleGithubSignin: handleGithubSignin,
        handleLogOut: handleLogOut,
        user: user,
        error: error,
        check: check,
      }}
    >
      <div className="App">
        <Col md={6} className="mx-auto mt-5">
          {!user.name ?
            <Card className="px-3 pb-3 border-1 border-dark">
            <SignUp></SignUp>
          </Card>  : <Details></Details>}
          
        </Col>
      </div>
    </UserContext.Provider>
  );
}

export default App;
