import React, { useContext } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import facebook from "../../images/facebook-logo.png";
import yahoo from "../../images/yahoo-logo.png";
import google from "../../images/google-logo.png";
import github from "../../images/github-logo.png";
import { UserContext } from '../../App';
import Details from '../Details/Details';

const SignUp = () => {
    const { user, check, error, handleOnSubmit, handleEmailChange, handlePasswordChange, handleCheckBox, handleGoogleSignin, handleFacebookSignin, handleYahooSignin, handleGithubSignin} = useContext(UserContext);

    return (
        <div>
            {!user.email ?
                <>
        <Card.Header as="h5"> {!check ? "SignUp" : "Login"}</Card.Header>
        <Form onSubmit={handleOnSubmit}>
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
          {
              !check &&  error && <p className="text-danger">{error.slice(22,-2)}</p>
          }

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
        </>
                :
                <Details></Details>
            }
      </div>
    );
};

export default SignUp;