import React from "react";
import { ListGroup, ListGroupItem, Nav, NavLink } from "react-bootstrap";

export const Adminmenu = () => {
  return (
    <>
      <h4>Admin Menu</h4>
      <ListGroup>
        <ListGroupItem>
          <NavLink href="/dashboard/admin/create-category">
            Create category
          </NavLink>
        </ListGroupItem>

        <ListGroupItem>
          <NavLink href="/dashboard/admin/create-product">
            Create Product
          </NavLink>
        </ListGroupItem>

        <ListGroupItem>
          <NavLink href="/dashboard/admin/product-list">Product List</NavLink>
        </ListGroupItem>

        <ListGroupItem>
          <NavLink href="/dashboard/admin/users">Users</NavLink>
        </ListGroupItem>
      </ListGroup>
    </>
  );
};
