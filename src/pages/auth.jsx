import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, UserDispatchContext } from "../context/userContext";
import { login, register } from "../lib/auth";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const [authError, setAuthError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
      if (!email || !password) {
        setErrorMsg("All fields are mandatory");
        setAuthError(true);
        return;
      }
      if (isRegister) {
        response = await register({ username: email, password });
      } else {
        response = await login({ username: email, password });
      }
      if (!response.user) {
        setAuthError(true);
        setErrorMsg("Login failed, please check your credentials");
        setEmail("");
        setPassword("");
        return;
      }
      setUserDetails(response.user);
      navigate("/bookmarks", { replace: true });
    } catch (error) {
      console.log(error);
      setEmail("");
      setPassword("");
      setErrorMsg("Something bad happened");
      setAuthError(error);
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
                  <div
                    className="text-4xl text-blue-700"
                    style={{ fontFamily: "Permanent Marker" }}
                  >
                    {"<HN/>"}
                  </div>
                  <a href="/">
                    <span>HackerNews</span>
                  </a>
                </h1>
                <p className="text-gray-500">
                  Please sign in to manage bookmarks
                </p>
              </div>
              {/* END Header */}

              {/* Sign In Form */}
              <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
                <div className="sm:p-5 lg:px-10 lg:py-8 grow w-full">
                  {authError ? (
                    <div className="sm:p-5 lg:px-10 lg:py-8 rounded text-rose-700 bg-rose-100">
                      <div className="flex items-center mb-2">
                        <h3 className="font-semibold">Authentication error!</h3>
                      </div>
                      <p>{errorMsg}</p>
                    </div>
                  ) : null}
                  <div className="sm:p-5 lg:px-10 lg:py-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="space-y-1">
                        <label
                          htmlFor="email"
                          name="email"
                          className="font-medium"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block border border-gray-200 rounded px-5 py-3 leading-6 w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          id="email"
                          name="email"
                          placeholder="Enter your username"
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
