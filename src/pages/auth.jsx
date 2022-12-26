import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, UserDispatchContext } from "../context/userContext";
import { login, register } from "../lib/auth";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const navigate = useNavigate();

  useEffect(() => {
    userDetails ? navigate("/") : null;
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let response;
      if (isRegister) {
        response = await register({ username: email, password });
      } else {
        response = await login({ username: email, password });
      }
      if (!response.user) return;
      setUserDetails(response.user);
      navigate("/bookmarks", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* Page Container */}
      <div
        id="page-container"
        className="flex text-left flex-col mx-auto w-full min-h-screen bg-gray-100"
      >
        {/* Page Content */}
        <main id="page-content" className="flex flex-auto flex-col max-w-full">
          <div className="min-h-screen flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-8 w-full">
            {/* Patterns Background */}
            <div className="pattern-dots-md text-gray-300 absolute top-0 right-0 w-32 h-32 lg:w-48 lg:h-48 transform translate-x-16 translate-y-16" />
            <div className="pattern-dots-md text-gray-300 absolute bottom-0 left-0 w-32 h-32 lg:w-48 lg:h-48 transform -translate-x-16 -translate-y-16" />
            {/* END Patterns Background */}

            {/* Sign In Section */}
            <div className="py-6 lg:py-0 w-full md:w-8/12 lg:w-6/12 relative">
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold inline-flex items-center mb-1 space-x-3">
                  <svg
                    className="hi-solid hi-cube-transparent inline-block w-8 h-8 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>HackerClone</span>
                </h1>
                <p className="text-gray-500">
                  Please sign in to manage bookmarks
                </p>
              </div>
              {/* END Header */}

              {/* Sign In Form */}
              <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
                <div className="p-5 lg:p-6 grow w-full">
                  <div className="sm:p-5 lg:px-10 lg:py-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="space-y-1">
                        <label
                          htmlFor="email"
                          name="email"
                          className="font-medium"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block border border-gray-200 rounded px-5 py-3 leading-6 w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="password"
                          name="email"
                          className="font-medium"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block border border-gray-200 rounded px-5 py-3 leading-6 w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          id="password"
                          name="password"
                          placeholder="Enter your password"
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-6 rounded border-blue-700 bg-blue-700 text-white hover:text-white hover:bg-blue-800 hover:border-blue-800 focus:ring focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700"
                        >
                          {isRegister ? "Register" : "Sign In"}
                        </button>
                        <div className="space-y-2 sm:flex sm:items-center sm:justify-between sm:space-x-2 sm:space-y-0 mt-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              id="remember_me"
                              name="remember_me"
                              className="border border-gray-200 rounded h-4 w-4 text-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                            <span className="ml-2">Remember me</span>
                          </label>
                          <a
                            href="#"
                            className="inline-block text-blue-600 hover:text-blue-400"
                          >
                            Forgot Password?
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {isRegister ? (
                  <div className="py-4 px-5 lg:px-6 w-full text-sm text-center bg-gray-50">
                    Already have an account?
                    <a
                      className="font-medium text-blue-600 hover:text-blue-400 cursor-pointer"
                      onClick={() => setIsRegister(false)}
                    >
                      {" "}
                      Sign in instead
                    </a>
                  </div>
                ) : (
                  <div className="py-4 px-5 lg:px-6 w-full text-sm text-center bg-gray-50">
                    Don’t have an account yet?
                    <a
                      className="font-medium text-blue-600 hover:text-blue-400 cursor-pointer"
                      onClick={() => setIsRegister(true)}
                    >
                      {" "}
                      Join us today
                    </a>
                  </div>
                )}
              </div>
              {/* END Sign In Form */}

              {/* Footer */}
              <div className="text-sm text-gray-500 text-center mt-6">
                <a
                  className="font-medium text-blue-600 hover:text-blue-400"
                  href="https://tailkit.com"
                  target="_blank"
                >
                  Tailkit
                </a>
              </div>
              {/* END Footer */}
            </div>
            {/* END Sign In Section */}
          </div>
        </main>
        {/* END Page Content */}
      </div>
      {/* END Page Container */}
    </>
  );
}

export default AuthPage;
