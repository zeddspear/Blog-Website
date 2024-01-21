import { useEffect, useState } from "react";
import { API } from "../../../service/api";
import BlogBox from "./BlogBox";
import { Link } from "react-router-dom";

function Blogs({ selectedCategory }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogsFromDB();
  }, []);

  const getBlogsFromDB = async () => {
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

  return (
    <>
      {blogs && blogs.length > 0 ? (
        selectedCategory === "All Categories" ? (
          blogs.map((blog) => {
            return (
              <Link key={blog._id} to={`/detail/${blog._id}`}>
                <BlogBox {...blog} />
              </Link>
            );
          })
        ) : blogs.filter((blog) => blog.category === selectedCategory).length >
          0 ? (
          blogs
            .filter((blog) => blog.category === selectedCategory)
            .map((blog) => {
              return (
                <Link key={blog._id} to={`/detail/${blog._id}`}>
                  <BlogBox {...blog} />
                </Link>
              );
            })
        ) : (
          <div className="p-5 m-5 text-xl text-primaryMain">
            <p>No Blog with this category</p>
          </div>
        )
      ) : (
        <div className="p-5 m-5 text-xl text-primaryMain">
          <p>There are no blogs in the Database</p>
        </div>
      )}
    </>
  );
}
export default Blogs;
