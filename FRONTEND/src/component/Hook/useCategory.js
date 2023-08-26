import { useState, useEffect } from "react";
import axios from "axios";

export default function useCateogry() {
  const [Category, setCategory] = useState([]);

  const getcategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/category/get-category`
      );
      if (data.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcategory();
    console.log(Category);
  }, []);

  return Category;
}
