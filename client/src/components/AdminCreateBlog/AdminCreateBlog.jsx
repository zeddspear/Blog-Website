import { DataContext } from "../../context/GlobalData";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import axios from "axios";
import { API } from "../../service/api";

const initialBlog = {
  title: "",
  description: "",
  picture: "",
  date_posted: new Date(),
  comments: [],
  admin: "",
  category: "",
};

function AdminCreateBlog() {
  const { gdata } = useContext(DataContext);
  const Navigate = useNavigate();

  const [availableCategories, setAvailableCategories] = useState([]);

  const [blog, setBlog] = useState(initialBlog);
  const [file, setFile] = useState("");

  //If user is not logged in navigate it to /admin/auth
  useEffect(() => {
    if (gdata.fullname === "") {
      Navigate("/admin/auth");
    }

    getAvailableCategories();
    getImage();
  }, [file]);

  const getAvailableCategories = async () => {
    try {
      const response = await API.getCategories();

      if (response.isSuccess) {
        let availableCat = response.data.filter(
          (cat) => cat.name !== "All Categories"
        );
        setAvailableCategories(availableCat);
        setBlog({
          ...blog,
          admin: gdata.adminID,
          category: availableCat[0].name,
        });
      }
    } catch (error) {
      if (error.isError) {
        console.log(error.data);
      }
    }
  };

  const sendBlogToDB = async (e) => {
    e.preventDefault();

    try {
      const response = await API.createBlog(blog);

      if (response.isSuccess) {
        Navigate("/admin");
      }
    } catch (err) {
      if (err.isError) {
        console.log(err);
      }
    }
  };

  const inputToBlog = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const getImage = async () => {
    if (file) {
      const formdata = new FormData();
      formdata.append("name", file.name);
      formdata.append("file", file);

      //API CAll for making a url using multer in express and whenever we change a picture it will display
      const response = await axios({
        method: "post",
        url: "http://localhost:3000/upload/file",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBlog({ ...blog, picture: response.data });
    }
  };

  return (
    <div className="bg-surface h-screen">
      <div
        className={
          blog.picture !== ""
            ? "bg-primaryMain bg-cover w-full h-60 flex justify-center items-center overflow-hidden"
            : "bg-primaryMain w-full h-40 flex justify-center items-center overflow-hidden"
        }
      >
        {blog.picture !== "" ? (
          <img src={blog.picture} alt={"blog-picture"} />
        ) : (
          <h1 className="text-3xl text-secondaryMain logo">Create Blog</h1>
        )}
      </div>
      <div className="createBlogContainer min-h-screen bg-surface w-full flex justify-center items-center">
        <form className=" bg-primaryMain rounded-lg shadow-lg max-w-[400px] w-full gap-5 p-5 flex flex-col justify-center">
          <label
            htmlFor="fileInput"
            className="flex text-secondaryMain justify-center items-center gap-2 cursor-pointer"
          >
            Add Image <FaImage size={20} />
          </label>
          <input
            className="hidden"
            type="file"
            id="fileInput"
            name="blogPicture"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="border-b w-full outline-none px-1"
            type="text"
            id="blogTitle"
            name="title"
            placeholder="Title"
            onChange={inputToBlog}
          />
          <textarea
            className="border-b w-full outline-none px-1"
            id="blogDescription"
            name="description"
            placeholder="Tell your story......"
            onChange={inputToBlog}
            rows={8}
          ></textarea>
          <select
            className="px-3"
            onChange={(e) => setBlog({ ...blog, category: e.target.value })}
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
            className="btn bg-tertiaryMain font-bold"
            type="submit"
            onClick={sendBlogToDB}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
export default AdminCreateBlog;
