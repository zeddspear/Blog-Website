function BlogBox({ ...blog }) {
  return (
    <div className="rounded-xl min-w-[200px] bg-tertiaryMain bg-transparent border-2 border-primaryMain">
      <img
        className="max-w-[300px] min-h-[300px] min-w-[260px] aspect-auto rounded-t-xl mb-2 border border-primaryMain"
        src={blog.picture}
        alt={blog.title}
      />
      <div className="p-2">
        <p className="text-[12px] text-gray-400">{blog.category}</p>
        <p className="text-xl text-primaryMain font-bold">{blog.title}</p>
        <p className="text-[12px] text-gray-400">
          by {`${blog.admin.firstname} ${blog.admin.lastname}`}
        </p>
      </div>
    </div>
  );
}
export default BlogBox;
