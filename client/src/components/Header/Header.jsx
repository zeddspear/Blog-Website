import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

function Navbar({ linksbyprop }) {
  // Menu Open or Close state
  const [isMenu, setIsMenu] = useState(false);

  // Window screen dimension state
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  // Navbar links name
  const links = linksbyprop || ["Home", "About", "Contact"];

  //Get dimension function
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    if (isMenu) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("html")[0].style.overflow = "scroll";
    }

    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };

    window.addEventListener("resize", updateDimension);

    // Reset menu open and close
    if (screenSize.width >= 1024) {
      setIsMenu(false);
    }

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize, isMenu]);

  return (
    <div className="w-full navbar text-surface bg-primaryMain relative z-30 drop-shadow-md">
      <div className="max-w-[1240px] mx-auto flex items-center px-5 justify-between">
        {/* Logo */}
        <Link to={linksbyprop ? "/admin" : "/"}>
          <p className="logo text-3xl hover:drop-shadow-xl text-tertiaryMain text-center mb-3 mt-1">
            BlogHub
          </p>
        </Link>

        {/* Nav Links */}
        <div
          className={
            !isMenu
              ? "navbarLinksContainer lg:static bg-primaryMain lg:block xl:w-7/12 fixed top-0 left-[-100%] ease-in-out h-full duration-500"
              : "navbarLinksContainer lg:static lg:bg-primaryMain fixed bg-secondaryMain top-0 left-0 w-[80%] h-screen border-r border-r-interactiveMain border-opacity-10 lg:border-opacity-0 ease-in-out duration-500 p-3 rounded-md"
          }
        >
          {isMenu ? (
            <div className="navbarButtons lg:hidden px-3 pb-5 pt-3 flex items-center mb-10 justify-between border-b border-b-interactiveMain border-opacity-10">
              <div>
                <button
                  className="lg:hidden"
                  onClick={() => setIsMenu(!isMenu)}
                >
                  <AiOutlineClose size={35} />
                </button>
              </div>
            </div>
          ) : undefined}

          <ul className="navbarLinks flex px-5 lg:px-0 flex-col gap-8 lg:gap-8 lg:flex-row lg:items-center lg:justify-evenly">
            {links.map((text, idx) => {
              return (
                <NavbarLinks key={idx} link={text} linksbyprop={linksbyprop} />
              );
            })}
          </ul>
        </div>

        {/* Responsive Button  */}
        {!isMenu && (
          <button className="lg:hidden" onClick={() => setIsMenu(!isMenu)}>
            <FaBars size={25} />
          </button>
        )}
      </div>
    </div>
  );
}

// Navbar Links Component
const NavbarLinks = ({ link, linksbyprop }) => {
  let toGo = null;

  if (linksbyprop) {
    toGo =
      link === "Admin Home"
        ? "/admin"
        : `/admin/${link.split(" ").join("").toLowerCase()}`;
  } else {
    toGo = link === "Home" ? "/" : `/${link.toLowerCase()}`;
  }

  return (
    <li>
      <NavLink
        to={toGo}
        className={({ isActive }) =>
          `lg:font-medium font-extrabold lg:border-0 pb-2 ${
            isActive ? "text-surface" : "text-gray-500"
          } pr-10 border-b border-b-interactiveMain border-opacity-10 hover:drop-shadow-xl lg:py-4 lg:px-2`
        }
      >
        {link}
      </NavLink>
    </li>
  );
};

export default Navbar;
