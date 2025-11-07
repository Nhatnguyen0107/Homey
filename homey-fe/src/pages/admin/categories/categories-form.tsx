import { useEffect, useState } from "react";
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
        images: yup.mixed().optional(),
    })
    .required();

const CategoriesForm = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.category.status);
    const category = useAppSelector((state) => state.category.category);
    const navigate = useNavigate();
    const { id } = useParams();

    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: TAny) => {
        const formData = {
            name: data.name,
            images: selectedFiles,
        };

        if (id) {
            dispatch(updateCategory({ id, data: formData }));
        } else {
            dispatch(createCategory(formData));
        }
    };

    // Xử lý khi chọn file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const fileArray = Array.from(files);
            setSelectedFiles(fileArray);

            // Cleanup previous URLs
            previewImages.forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });

            // Tạo preview URLs
            const urls = fileArray.map(file => URL.createObjectURL(file));
            setPreviewImages(urls);
        }
    };

    // Cleanup URLs when component unmounts
    useEffect(() => {
        return () => {
            previewImages.forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [previewImages]);

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

            // Hiển thị ảnh hiện tại nếu có
            if (category.image_url && Array.isArray(category.image_url)) {
                setPreviewImages(category.image_url.map(url =>
                    url.startsWith('http') ? url : `http://localhost:3000${url}`
                ));
            }
        }
    }, [category, reset]);

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

                <div className="form-group">
                    <label htmlFor="images">Category Images</label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Preview ảnh */}
                {previewImages.length > 0 && (
                    <div className="image-preview">
                        <label>Image Preview:</label>
                        <div className="preview-container">
                            {previewImages.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`preview ${index}`}
                                    className="preview-image"
                                />
                            ))}
                        </div>
                    </div>
                )}

                <button type="submit" className="btn-submit">
                    {id ? "Update" : "Create"}
                </button>
            </form>
        </div>
    );
};
export default CategoriesForm;