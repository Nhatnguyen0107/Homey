import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  getCategoryList,
  resetStatus,
  deleteCategory,
} from "../../../redux/categorySlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import styles from "./categories.module.css";

const CategoryList = styled.div`
  /* background: red; */
`;

const Categories = () => {
  const categories = useAppSelector((state) => state.category.categories);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetStatus());
    dispatch(getCategoryList({}));
  }, []);

  function themdanhmuc() {
    navigate("/admin/category-form");
  }

  const editCategory = (id?: string) => {
    if (id) {
      navigate(`/admin/category-form/${id}`);
    }
  };

  const deleteCate = (id?: string) => {
    if (id) {
      dispatch(
        deleteCategory({
          id,
          // cb: () => {
          //   dispatch(getCategoryList({}));
          // },
        })
      );
    }
  };

  return (
    <CategoryList className={styles["category-list"]}>
      <button onClick={themdanhmuc}>Them Danh Muc</button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cate) => (
            <tr key={cate.id}>
              <td>{cate.id}</td>
              <td>{cate.name}</td>
              <td>
                <button type="button" onClick={() => editCategory(cate.id)}>
                  Edit
                </button>
                <button type="button" onClick={() => deleteCate(cate.id)}>
                  Detele
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CategoryList>
  );
};
export default Categories;
