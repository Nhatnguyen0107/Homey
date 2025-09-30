import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { TAny } from "../../../types/common";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { createTag, getTagDetail, updateTag } from "../../../redux/tagsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

function TagsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tagDetail = useAppSelector((state) => state.tags.tagDetail);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: TAny) => {
    if (id) {
      dispatch(
        updateTag({
          id,
          data,
          cb: () => {
            console.log("Tag updated successfully");
            navigate("/admin/tag-list");
          },
        })
      );
    } else {
      dispatch(
        createTag({
          data,
          cb: () => {
            console.log("Tag created successfully");
            navigate("/admin/tag-list");
          },
        })
      );
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getTagDetail(id));
    }
  }, [id]);

  useEffect(() => {
    if (tagDetail) {
      reset({ name: tagDetail.name });
    }
  }, [tagDetail]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input
        {...register("name")}
        type="text"
        id="name"
        name="name"
        className="border-1"
      />

      <p>{errors.name?.message}</p>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TagsForm;
