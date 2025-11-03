import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
    createPromotion,
    getPromotionDetail,
    updatePromotion,
} from "../../../redux/promotionSlice";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { TAny } from "../../../types/common";

import "../../../styles/admin/form.css";

const schema = yup
    .object({
        code: yup.string().required("Code is required"),
        discount_type: yup.string().required("Discount type is required"),
        discount_value: yup.number().positive("Must be positive").required("Discount value is required"),
        start_date: yup.string().required("Start date is required"),
        end_date: yup.string().required("End date is required"),
        status: yup.string().required("Status is required"),
    })
    .required();

const PromotionForm = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.promotion.status);
    const promotion = useAppSelector((state) => state.promotion.promotion);
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
            dispatch(updatePromotion({ id, data }));
        } else {
            dispatch(createPromotion(data));
        }
    };

    useEffect(() => {
        if (status) {
            navigate("/admin/promotion-list");
        }
    }, [status, navigate]);

    useEffect(() => {
        if (promotion) {
            reset({
                code: promotion.code,
                discount_type: promotion.discount_type,
                discount_value: promotion.discount_value,
                start_date: promotion.start_date?.slice(0, 10), // Format for input[type="date"]
                end_date: promotion.end_date?.slice(0, 10),
                status: promotion.status,
            });
        }
    }, [promotion, reset]);

    useEffect(() => {
        if (id) {
            dispatch(getPromotionDetail(id));
        }
    }, [id, dispatch]);

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="promotion-form">
                <div className="form-group">
                    <label htmlFor="code">Promotion Code</label>
                    <input {...register("code")} type="text" id="code" />
                    <p className="error-message">{errors.code?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="discount_type">Discount Type</label>
                    <select {...register("discount_type")} id="discount_type">
                        <option value="">Select type</option>
                        <option value="percent">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                    </select>
                    <p className="error-message">{errors.discount_type?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="discount_value">Discount Value</label>
                    <input {...register("discount_value")} type="number" id="discount_value" step="0.01" />
                    <p className="error-message">{errors.discount_value?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="start_date">Start Date</label>
                    <input {...register("start_date")} type="date" id="start_date" />
                    <p className="error-message">{errors.start_date?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="end_date">End Date</label>
                    <input {...register("end_date")} type="date" id="end_date" />
                    <p className="error-message">{errors.end_date?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select {...register("status")} id="status">
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <p className="error-message">{errors.status?.message}</p>
                </div>

                <button type="submit" className="btn-submit">
                    {id ? "Update" : "Create"}
                </button>
            </form>
        </div>
    );
};

export default PromotionForm;