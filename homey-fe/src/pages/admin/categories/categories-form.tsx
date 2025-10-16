import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
    createCategory,
    getCategoryDetail,
    updateCategory,
} from "../../../redux/categorySlice";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { TAny } from "../../../types/common";

import "../../../styles/admin/form.css";

const schema = yup
    .object({
        name: yup.string().required(),
    })
    .required();

const CategoriesForm = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.category.status);
    const category = useAppSelector((state) => state.category.category);
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data: TAny) => {
        if (id) {
            dispatch(updateCategory({ id, data }));
        } else {
            dispatch(createCategory(data));
        }
    };

    useEffect(() => {
        if (status) {
            navigate("/admin/category-list");
        }
    }, [status]);

    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
            });
        }
    }, [category]);

    useEffect(() => {
        if (id) {
            dispatch(getCategoryDetail(id));
        }
    }, []);

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="category-form">
                <div className="form-group">
                    <label htmlFor="name">Category Name</label>
                    <input {...register("name")} type="text" id="name" />
                    <p className="error-message">{errors.name?.message}</p>
                </div>

                <button type="submit" className="btn-submit">
                    {id ? "Update" : "Create"}
                </button>
            </form>
        </div>

    );
};
export default CategoriesForm;