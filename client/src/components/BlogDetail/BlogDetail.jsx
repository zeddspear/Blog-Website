import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../service/api";
import Comment from "./Comment";

function BlogDetail() {
  const { id } = useParams();

  const [blog, setBlog] = useState({});

  const [comment, setComment] = useState("");

  useEffect(() => {
    getBlogDetailFromDB();
  }, []);

  const inputToComment = async (e) => {
    try {
      const response = await API.postComment({
        description: comment,
        date_posted: new Date(),
        blog: blog?._id,
      });

      if (response.isSuccess) {
        location.reload();
      }
    } catch (error) {
      if (error.isError) {
        console.log(error.msg);
      }
    }
  };

  const getBlogDetailFromDB = async () => {
    try {
      const response = await API.getSingleBlog({ id: id });
      if (response.isSuccess) {
        setBlog(response.data);
      }
    } catch (err) {
      if (err.isError) {
        console.log(err.data);
      }
    }
  };

  return (
    <div className="bg-surface flex flex-col items-center min-h-screen">
      <div className="w-full mt-10 mb-5 p-5 text-center border-b-2 border-b-primaryMain flex flex-col items-center justify-center">
        <img
          className="max-w-[100%] aspect-auto bg-cover shadow-2xl m-3 "
          src={blog.picture}
          alt={blog.title}
        />
        <p className="text-[12px] text-gray-400">{blog.category}</p>
        <p className="text-3xl text-tertiaryMain my-3 font-bold">
          {blog.title}
        </p>
        <p className="text-[12px] text-gray-400">
          by <br /> {`${blog.admin?.firstname} ${blog.admin?.lastname}`} <br />
          {new Date(blog.date_posted).toDateString()}
        </p>
      </div>
      <div className="text-center sm:w-[80%] lg:w-[60%] p-3 mb-10">
        <p className="text-xl text-tertiaryMain font-bold mb-1">Description</p>
        <p className="text-secondaryMain description text-md">
          {blog.description}
        </p>
      </div>
      <div className="commentSection w-full border-t-2 border-primaryMain my-3 flex flex-col items-center ">
        <p className="text-3xl text-tertiaryMain my-2">Comments</p>
        <textarea
          className="border-b w-[300px] bg-gray-400 rounded-md  md:w-[600px] outline-none px-2 py-1"
          id="blogComment"
          name="comment"
          placeholder="Comment Here"
          onChange={(e) => setComment(e.target.value)}
          rows={8}
        ></textarea>
        <button
          className="btn bg-secondaryMain my-2 font-bold"
          onClick={inputToComment}
        >
          Post
        </button>
        <div className="comments mt-3 mb-10">
          {blog.comments?.length > 0 ? (
            blog.comments?.map((com) => {
              return <Comment key={com} commentID={com} />;
            })
          ) : (
            <p className="text-gray-400 text-xl mt-3">No Comments</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default BlogDetail;
