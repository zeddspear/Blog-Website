import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function LayoutForAdminBody() {
  return (
    <>
      <Header linksbyprop={["Admin Home", "Create Blog"]} />
      <Outlet />
      <Footer />
    </>
  );
}
export default LayoutForAdminBody;
