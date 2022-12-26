import { Fragment, useContext, useState } from "react";
import { HiHome, HiBookmark, HiLogout, HiLogin } from "react-icons/hi";

// Headless UI, for more info and examples you can check out https://github.com/tailwindlabs/headlessui
import { Menu, Transition } from "@headlessui/react";
import PostList from "../../components/postList";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { logout } from "../../lib/auth";

export default function HomePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const userDetails = useContext(UserContext);
  console.log("userdetails", userDetails);

  async function fireSignout() {
    await logout();
    navigate("/login");
  }
  return (
    <>
      {/* Page Container */}
      <div
        id="page-container"
        className="flex flex-col mx-auto w-full min-h-screen bg-gray-100"
      >
        {/* Page Header */}
        <header
          id="page-header"
          className="flex flex-none items-center bg-white shadow-sm z-1"
        >
          <div className="container xl:max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex justify-between py-4">
              {/* Left Section */}
              <div className="flex items-center">
                {/* Logo */}
                <a
                  href="#"
                  className="group inline-flex items-center space-x-2 font-bold text-lg tracking-wide text-gray-700 hover:text-blue-600 active:text-gray-700"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-90 text-blue-600 transform transition group-hover:scale-110 hi-solid hi-cube-transparent inline-block w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>HackerClone</span>
                </a>
                {/* END Logo */}
              </div>
              {/* END Left Section */}

              {/* Right Section */}
              <div className="flex items-center space-x-1 lg:space-x-5">
                {/* Desktop Navigation */}
                <nav className="hidden lg:flex lg:items-center lg:space-x-2">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded border ${
                        isActive
                          ? "border-blue-50 bg-blue-50 text-blue-500"
                          : "text-gray-600 border-transparent"
                      } hover:text-blue-500 hover:bg-blue-50 hover:border-blue-50`
                    }
                  >
                    <HiHome className="opacity-50 hi-solid hi-cog inline-block w-5 h-5" />
                    <span>Home</span>
                  </NavLink>

                  <NavLink
                    to="bookmarks"
                    className={({ isActive }) =>
                      `text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded border ${
                        isActive
                          ? "border-blue-50 bg-blue-50 text-blue-500"
                          : "text-gray-600 border-transparent"
                      }  hover:text-blue-500 hover:bg-blue-50 hover:border-blue-50`
                    }
                  >
                    <HiBookmark className="opacity-50 hi-solid hi-cog inline-block w-5 h-5" />
                    <span>Bookmarks</span>
                  </NavLink>
                  {userDetails ? (
                    <button
                      onClick={fireSignout}
                      className="text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded border text-gray-600 border-transparent hover:text-red-500 hover:bg-red-50 hover:border-red-50"
                    >
                      <HiLogout className="opacity-50 hi-solid hi-cog inline-block w-5 h-5" />
                      <span>Sign out</span>
                    </button>
                  ) : (
                    <NavLink
                      to="login"
                      className={({ isActive }) =>
                        `text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded border ${
                          isActive
                            ? "border-green-50 bg-green-50 text-green-500"
                            : "text-gray-600 border-transparent"
                        }  hover:text-green-500 hover:bg-green-50 hover:border-green-50`
                      }
                    >
                      <HiLogin className="opacity-50 hi-solid hi-cog inline-block w-5 h-5" />
                      <span>Sign in</span>
                    </NavLink>
                  )}
                </nav>
                {/* END Desktop Navigation */}

                {/* Toggle Mobile Navigation */}
                <div className="lg:hidden">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
                    onClick={() => setMobileNavOpen(!mobileNavOpen)}
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      className="hi-solid hi-menu inline-block w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {/* END Toggle Mobile Navigation */}
              </div>
              {/* END Right Section */}
            </div>

            {/* Mobile Navigation */}
            <div className={`lg:hidden ${mobileNavOpen ? "" : "hidden"}`}>
              <nav className="flex flex-col space-y-2 py-4 border-t">
                <NavLink
                  to="/"
                  className="text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded border border-blue-50 bg-blue-50 text-blue-500"
                >
                  <HiHome className="opacity-50 hi-solid hi-home inline-block w-5 h-5" />
                  <span>Home</span>
                </NavLink>
                <NavLink
                  to="bookmarks"
                  className="text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded text-gray-600 border border-transparent hover:text-blue-500 hover:bg-blue-50 hover:border-blue-50 active:bg-blue-100 active:border-blue-100"
                >
                  <HiBookmark className="opacity-50 hi-solid hi-home inline-block w-5 h-5" />
                  <span>Bookmarks</span>
                </NavLink>
              </nav>
            </div>
            {/* END Mobile Navigation */}
          </div>
        </header>
        {/* END Page Header */}

        {/* Page Content */}
        <main id="page-content" className="flex flex-auto flex-col max-w-full">
          {/* Page Section */}
          <div className="container xl:max-w-7xl mx-auto p-4 lg:p-8">
            {/*

              ADD YOUR MAIN CONTENT BELOW

            */}

            {/* Placeholder */}
            {/* <div className="flex items-center justify-center rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 text-gray-400 py-64">Content (max width 1280px)</div> */}
            <Outlet />
            {/*

              ADD YOUR MAIN CONTENT ABOVE

            */}
          </div>
          {/* END Page Section */}
        </main>
        {/* END Page Content */}

        {/* Page Footer */}
        <footer
          id="page-footer"
          className="flex flex-none items-center bg-white"
        >
          <div className="text-center flex flex-col md:text-left md:flex-row md:justify-between text-sm container xl:max-w-7xl mx-auto px-4 lg:px-8">
            <div className="pt-4 pb-1 md:pb-4">
              <a
                href="https://tailkit.com"
                className="font-medium text-blue-600 hover:text-blue-400"
                target="_blank"
              >
                Tailkit
              </a>{" "}
              ©
            </div>
          </div>
        </footer>
        {/* END Page Footer */}
      </div>
      {/* END Page Container */}
    </>
  );
}
