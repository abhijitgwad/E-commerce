import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";
// import { IoBagOutline } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { FaRecycle } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import toast, { Toaster } from "react-hot-toast";
import { Searchinput } from "../Form/Searchinput";
import useCateogry from "../Hook/useCategory";
import { useCart } from "../../context/Cart";
import { Select, Badge } from "antd";
const { Option } = Select;

export const Header = () => {
  const [auth, setAuth] = useAuth();
  const [mylink, setlink] = useState("");
  const Category = useCateogry();
  const [Catlink, setCatlink] = useState("category/");
  const [cart] = useCart();
  function handlelogout() {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout successfully!!!");
  }

  useEffect(() => {
    setlink(auth?.user?.role === 1 ? "/dashboard/admin" : "/dashboard/user");
  });

  return (
    <div>
      <Navbar>
        <Container>
          <Link href="/" className="navbrand">
            <FaRecycle />
            CampusBuy
          </Link>
          <Searchinput />
          <Nav className="ms-auto ">
            <NavLink className="mylink" to="/">
              <AiFillHome />
            </NavLink>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item href={`/category`}>
                All Category
              </NavDropdown.Item>
              {Category?.map((c) => (
                <NavDropdown.Item href={`/category/${c.slug}`}>
                  {c.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {!auth.user ? (
              <>
                <NavLink className="mylink" to="/register">
                  Register
                </NavLink>
                <NavLink className="mylink" to="/login">
                  Login
                </NavLink>
              </>
            ) : (
              <>
                <NavDropdown title={auth?.user?.name} id="basic-nav-dropdown">
                  <NavDropdown.Item href={mylink}>Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handlelogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            <NavLink className="mylink" to="/cart">
              <Badge count={cart?.length}>
                <h6 className="m-1">cart </h6>
              </Badge>
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
      <Toaster />
    </div>
  );
};
