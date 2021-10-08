import "bootstrap/dist/css/bootstrap.min.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  OAuthProvider
} from "firebase/auth";
import { Card, Button, Col, Form } from "react-bootstrap";
import './App.css';
import facebook from './images/facebook-logo.png';
import yahoo from './images/yahoo-logo.png';
import google from './images/google-logo.png';
import github from './images/github-logo.png';
import { useState } from "react";
import initializeAuthentication from "./Firebase/firebase.initialize";

initializeAuthentication();
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const yahooProvider = new OAuthProvider("yahoo.com");

function App() {
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
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
          setUser(result.user);
        }).catch(error => {
      setError(error.message)
    })
  }

  const handleGoogleSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
      }).catch(error => {
        setError(error.message);
    })
  }

  const handleFacebookSignin = () => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
      setUser(result.user);
      }).catch(error => {
      setError(error.message);
    })
  }

  const handleGithubSignin = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        setUser(result.user);
        console.log(result.user);
      })
      .catch(error => {
        setError(error.message);
    })
  }

  const handleYahooSignin = () => {
    signInWithPopup(auth, yahooProvider)
      .then(result => {
        setUser(result.user);
      }).catch(error => {
        setError(error.message);
    })
  }

  return (
    <div className="App">
      <Col md={6} className="mx-auto mt-5">
        <Card className="px-3 pb-3 border-1 border-dark">
          <Card.Header as="h5"> {!check ? "SignUp" : "Login"}</Card.Header>
          <Form onSubmit={handleOnSubmit}>
            {!check && (
              <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  onBlur={handleNameChange}
                  type="email"
                  placeholder="Enter your name here"
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onBlur={handleEmailChange}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onBlur={handlePasswordChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                onClick={handleCheckBox}
                type="checkbox"
                label="Already a User? Please Login"
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <Button variant="primary" type="submit">
              {!check ? "SignUp" : "Login"}
            </Button>
          </Form>
          <div className="mt-5">
            <img
              className="additional-link"
              title="Google"
              height="35"
              src={google}
              alt=""
              onClick={handleGoogleSignin}
            />
            <img
              className="additional-link"
              title="Facebook"
              height="50"
              src={facebook}
              alt=""
              onClick={handleFacebookSignin}
            />
            <img
              className="additional-link"
              title="Yahoo"
              height="35"
              src={yahoo}
              alt=""
              onClick={handleYahooSignin}
            />
            <img
              className="additional-link"
              title="Github"
              height="50"
              src={github}
              alt=""
              onClick={handleGithubSignin}
            />
          </div>
        </Card>
      </Col>
    </div>
  );
}

export default App;
