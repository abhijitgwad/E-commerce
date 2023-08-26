import React from "react";
import { Form, Button } from "react-bootstrap";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Searchinput = () => {
  const [value, setvalue] = useSearch();
  const naviate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/search/${value.keyword}`
      );
      setvalue({ ...value, results: data });
      naviate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form className="d-flex" onSubmit={handlesubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={value.keyword}
        onChange={(e) => setvalue({ ...value, keyword: e.target.value })}
      />
      <Button variant="warning" type="submit">
        Search
      </Button>
    </Form>
  );
};
