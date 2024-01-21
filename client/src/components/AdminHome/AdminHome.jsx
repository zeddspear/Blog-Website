import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/GlobalData";
import { useNavigate } from "react-router-dom";
import BlogBox from "./BlogBox";
import { API } from "../../service/api";

function AdminHome() {
  const { gdata, setGdata } = useContext(DataContext);
  const Navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  //If user is not logged in navigate it to /admin/auth
  useEffect(() => {
    if (gdata.fullname === "") {
      Navigate("/admin/auth");
    }

    getAvailableCategories();
    getAllBlogs();
  }, [gdata]);

  const getAvailableCategories = async () => {
    try {
      const response = await API.getCategories();

      if (response.isSuccess) {
        let availableCat = response.data.filter(
          (cat) => cat.name !== "All Categories"
        );
        setAvailableCategories(availableCat);
      }
    } catch (error) {
      if (error.isError) {
        console.log(error.data);
      }
    }
  };

  const getAllBlogs = async () => {
    try {
      const response = await API.getBlogs();

      if (response.isSuccess) {
        setBlogs(response.data);
      }
    } catch (err) {
      if (err.isError) {
        console.log(err.data);
      }
    }
  };

  const LogOut = async () => {
    try {
      const response = await API.logOut();
      if (response.data.msg === "Logged Out") {
        setGdata({
          fullname: "",
          email: "",
          adminID: "",
          categories: [],
        });
        sessionStorage.removeItem("AccessToken");
        sessionStorage.removeItem("RefreshToken");
        Navigate("/admin");
      }
    } catch (error) {}
  };

  return (
    <div className="bg-surface w-full flex flex-col items-center min-h-screen">
      <p className="text-3xl text-secondaryMain font-bold mt-10 mb-5">Blogs</p>
      <button
        onClick={LogOut}
        className="btn bg-primaryMain font-bold right-10 mt-12 absolute"
      >
        Log Out
      </button>
      <div className="my-3 w-screen p-10 relative">
        {blogs.map((blog) => {
          return (
            <BlogBox
              key={blog._id}
              blog={blog}
              availableCategories={availableCategories}
              setBlogs={setBlogs}
              blogs={blogs}
            />
          );
        })}
      </div>
    </div>
  );
}
export default AdminHome;
