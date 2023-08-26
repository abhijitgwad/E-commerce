import React from "react";
import { ListGroup, ListGroupItem, Nav, NavLink } from "react-bootstrap";

export const Usermenu = () => {
  return (
    <>
      <h4>User Menu</h4>
      <ListGroup>
        <ListGroupItem>
          <NavLink href="/dashboard/user/profile">Profile</NavLink>
        </ListGroupItem>

        <ListGroupItem>
          <NavLink href="/dashboard/user/orders">orders</NavLink>
        </ListGroupItem>
      </ListGroup>
    </>
  );
};
