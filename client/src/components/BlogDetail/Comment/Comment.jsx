import { useEffect, useState } from "react";
import { API } from "../../../service/api";

function Comment({ commentID }) {
  const [comment, setComment] = useState({});

  useEffect(() => {
    getComment();
  }, []);

  const getComment = async () => {
    try {
      const response = await API.getComment({ id: commentID });
      if (response.isSuccess) {
        setComment(response.data);
      }
    } catch (error) {
      if (error.isError) {
        console.log(error.data);
      }
    }
  };

  return (
    <div className="text-gray-400 text-sm w-[300px] md:w-[600px] border border-secondaryMain p-5 flex justify-between gap-2 my-3">
      <p className="break-all w-[200px]">{comment.description}</p>
      <p className="break-all w-[200px] text-right">
        {new Date(comment.date_posted).toDateString()}
      </p>
    </div>
  );
}
export default Comment;
