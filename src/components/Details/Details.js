import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { UserContext } from "../../App";

const Details = () => {
    const { user, handleLogOut } = useContext(UserContext);
    const { img, name, email } = user;
    console.log(img, name, email);

  return (
    <Card style={{ width: "22rem" }} className="mx-auto mt-3">
      <Card.Header as="h5">User Information</Card.Header>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Email : {email}</Card.Text>
        <Button variant="danger" onClick={handleLogOut}>Logout</Button>
      </Card.Body>
    </Card>
  );
};

export default Details;
