import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { Layout } from "../Layout/Layout";
import { Myspinner } from "../Myspinner";

export default function PrivateRoute() {
  const [ok, setok] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authcheck = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/v1/auth/user-auth",
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.ok) {
        setok(true);
      } else {
        setok(false);
      }
    };

    if (auth?.token) authcheck();
  }, [auth?.token]);

  return ok ? (
    <Outlet />
  ) : (
    <Layout>
      <Myspinner />
    </Layout>
  );
}
