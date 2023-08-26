import React from "react";
import { Form, Button } from "react-bootstrap";

export const CreateCategoryForm = ({ handlesubmit, value, setvalue }) => {
  return (
    <>
      <form onSubmit={handlesubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>CreateCategory</Form.Label>
          <input
            type="Text"
            value={value}
            onChange={(e) => {
              setvalue(e.target.value);
            }}
            placeholder="Enter Category Name"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};
