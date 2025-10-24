import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
    createUser,
    getUserDetail,
    updateUser,
} from "../../../redux/userSlice";
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

const UsersForm = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.user.status);
    const user = useAppSelector((state) => state.user.user);
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
            dispatch(updateUser({ id, data }));
        } else {
            dispatch(createUser(data));
        }
    };

    useEffect(() => {
        if (status) {
            navigate("/admin/user-list");
        }
    }, [status]);

    useEffect(() => {
        if (user) {
            reset({
                name: user.userName,
            });
        }
    }, [user]);

    useEffect(() => {
        if (id) {
            dispatch(getUserDetail(id));
        }
    }, []);

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="category-form">
                <div className="form-group">
                    <label htmlFor="name">Full name</label>
                    <input {...register("name")} type="text" id="userName" />
                    <p className="error-message">{errors.name?.message}</p>
                </div>

                <button type="submit" className="btn-submit">
                    {id ? "Update" : "Create"}
                </button>
            </form>
        </div>

    );
};
export default UsersForm;