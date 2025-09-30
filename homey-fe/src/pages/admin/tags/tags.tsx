import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks";
import { deleteTag, getTagsList } from "../../../redux/tagsSlice";
import { useAppSelector } from "../../../hooks";
import type { TAny } from "../../../types/common";
import { useNavigate } from "react-router-dom";

export default function Tags() {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.tagsList);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTagsList({}));
  }, []);

  function handleAddTag() {
    navigate("/admin/tag-form");
  }
  function handleEditTag(id: string) {
    navigate("/admin/tag-form/" + id);
  }
  function handleDeleteTag(id: string) {
    dispatch(deleteTag(id));
  }

  return (
    <div>
      <button onClick={handleAddTag}>Them Tag</button>
      <input type="text" placeholder="Search..." />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {tags.map((tag: TAny) => (
            <tr>
              <td>{tag.id}</td>
              <td>{tag.name}</td>
              <td>
                {" "}
                <button onClick={() => handleEditTag(tag.id)}>Edit</button>
                <button onClick={() => handleDeleteTag(tag.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Prev</button>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
        <button>Next</button>
      </div>
    </div>
  );
}
