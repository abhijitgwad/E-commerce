import React from "react";
import { Layout } from "../../component/Layout/Layout";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Adminmenu } from "../../component/Layout/Adminmenu";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { CreateCategoryForm } from "../../component/Form/CreateCategoryForm";
import { Modal } from "antd";
import { useAuth } from "../../context/auth";

export const CreateCategory = () => {
  const [category, setcategory] = useState([]);
  const [name, setname] = useState();
  const [visible, setvisible] = useState(false);
  const [selected, setselected] = useState(null);
  const [updatedname, setupdatedname] = useState("");
  const [auth, setAuth] = useAuth();

  const config = {
    headers: {
      Authorization: auth?.token,
    },
  };

  const handleUpdatename = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/category/update-category/${selected._id}`,
        {
          name: updatedname,
        },
        config
      );

      if (data.success) {
        toast.success(data.message);
        setselected(null);
        setupdatedname("");
        setvisible(false);
        getAllCategory();
      }
    } catch (error) {
      console.log("error while updating the name");
      // toast.error(res.message);
    }
  };

  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/category/delete-category/${pid}`,
        config
      );

      if (data.success) {
        toast.success(data.message);
        getAllCategory();
      }
    } catch (error) {
      console.log("error while deleting the name");
      // toast.error(res.message);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/get-category"
      );

      if (data.success) {
        setcategory(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category!!!");
    }
  };

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/category/create-category",
        { name }
      );

      if (data?.success) {
        toast.success(data.message);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in form!!!");
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row>
          <Col xs={4} md={3}>
            <br />
            <Adminmenu />
          </Col>
          <Col xs={6} md={4}>
            <>
              <br />
              <CreateCategoryForm
                handlesubmit={handlesubmit}
                value={name}
                setvalue={setname}
              />
              <br />
              <br />
              <Table stripe bordered hover variant="light">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((c) => (
                    <tr>
                      <td key={c._id}>{c.name}</td>
                      <td>
                        <Button
                          variant="primary ms-2"
                          onClick={() => {
                            setvisible(true);
                            setupdatedname(c.name);
                            setselected(c);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger ms-2"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          </Col>
          <Modal
            title="Basic Modal"
            onCancel={() => {
              setvisible(false);
            }}
            visible={visible}
            footer={null}
          >
            <CreateCategoryForm
              handlesubmit={handleUpdatename}
              value={updatedname}
              setvalue={setupdatedname}
            />
          </Modal>
        </Row>
      </Container>
    </Layout>
  );
};
