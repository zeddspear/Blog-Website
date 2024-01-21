import Home from "./components/Home";
import LayoutForAuth from "./layouts/layoutforauth";
import LayoutForBody from "./layouts/layoutforbody/LayoutForBody";
import AdminHome from "./components/AdminHome";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminCreateBlog from "./components/AdminCreateBlog";
import LayoutForAdminBody from "./layouts/layoutforadminbody";
import BlogDetail from "./components/BlogDetail";
import About from "./components/About";
import Contact from "./components/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutForBody />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "detail/:id",
        element: <BlogDetail />,
      },
    ],
  },
  {
    path: "/admin",
    element: <LayoutForAdminBody />,
    children: [
      {
        path: "",
        element: <AdminHome />,
      },
      {
        path: "createblog",
        element: <AdminCreateBlog />,
      },
    ],
  },
  {
    path: "/admin/auth",
    children: [
      {
        path: "",
        element: <LayoutForAuth />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
