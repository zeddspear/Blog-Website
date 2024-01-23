import { API } from "../../../service/api";
import { useContext, useEffect, useState } from "react";
import { memo } from "react";
import { DataContext } from "../../../context/GlobalData";

const BlogBox = memo(({ blog, availableCategories, setBlogs, blogs }) => {
  const initialEditedBlog = {
    id: blog._id,
    title: blog.title,
    description: blog.description,
    category: blog.category,
  };
  const [editedBlog, setEditedBlog] = useState(initialEditedBlog);
  const { gdata } = useContext(DataContext);

  const [isEdit, setIsEdit] = useState(false);

  const inputToBlog = (e) => {
    setEditedBlog({ ...editedBlog, [e.target.name]: e.target.value });
  };

  const postEditedBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await API.editBlog(editedBlog);
      if (response) {
        setIsEdit(false);
        console.log(response.data);
        setBlogs(response.data);
      }
    } catch (error) {
      if (error.isError) {
        console.log(error.data);
      }
    }
  };

  const deleteBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await API.deleteBlog({ id: blog._id });
      if (response) {
        console.log(response.data);
        setBlogs(response.data);
      }
    } catch (err) {
      if (err.isError) {
        console.log(err.data);
      }
    }
  };

  return (
    <>
      <div
        id={blog._id}
        className=" border-2 border-primaryMain my-5 flex items-center justify-between pr-5"
      >
        <div className="flex gap-10 items-center">
          <img
            src={blog.picture}
            alt={blog.title}
            className="w-[260px] h-[200px]"
          />
          <div>
            <p className="text-xl text-secondaryMain font-bold">{blog.title}</p>
            <p className="text-[12px] text-gray-500 mb-5 border-b border-primaryMain">
              {blog.category}
            </p>
            <p className="text-[12px] text-gray-500">
              by {`${blog.admin?.firstname} ${blog.admin.lastname}`}
            </p>
          </div>
        </div>
        {gdata?.adminID === blog.admin?._id ? (
          <div className="flex gap-2">
            <button
              className="btn bg-secondaryMain font-bold"
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit
            </button>
            <button
              className="btn bg-tertiaryMain font-bold"
              onClick={deleteBlog}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
      {isEdit ? (
        <>
          <div
            className="transparentDiv top-0 bottom-0 left-0 right-0 w-full h-full absolute"
            onClick={() => setIsEdit(!isEdit)}
          ></div>

          <form className="bg-primaryMain rounded-lg shadow-lg max-w-[400px] w-full gap-5 p-5 flex flex-col justify-center absolute top-[20%] right-[40%]">
            <input
              className="border-b w-full outline-none px-1"
              type="text"
              id="blogTitle"
              name="title"
              placeholder="Title"
              value={editedBlog.title}
              onChange={inputToBlog}
            />
            <textarea
              className="border-b w-full outline-none px-1"
              id="blogDescription"
              name="description"
              placeholder="Tell your story......"
              onChange={inputToBlog}
              rows={8}
              value={editedBlog.description}
            ></textarea>
            <select
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, category: e.target.value })
              }
              value={editedBlog.category}
            >
              {availableCategories.map((cat, idx) => {
                return (
                  <option key={idx} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            <button
              className="btn text-white bg-secondaryMain font-bold"
              type="submit"
              onClick={postEditedBlog}
            >
              Update
            </button>
          </form>
        </>
      ) : null}
    </>
  );
});
export default BlogBox;
