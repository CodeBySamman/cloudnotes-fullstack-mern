import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState(false);

  // Logout
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenu(false);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <nav className="bg-[#212529] text-white shadow-sm border-b w-full">
      <div className="max-w-6xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="text-xl sm:text-2xl text-cyan-400 font-black"
            style={{
              textShadow: "0 0 15px rgba(34,211,238,0.6)",
            }}
          >
            CloudNotes
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-6 font-medium">
            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }
            >
              Home
            </Link>

            <Link
              to="/about"
              className={
                location.pathname === "/about"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }
            >
              About
            </Link>
          </div>

          {/* Desktop Buttons */}
          {!localStorage.getItem("token") ? (
            <div className="hidden sm:flex space-x-3">
              <Link
                to="/login"
                className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Signup
              </Link>
            </div>
          ) : (
            <button
              className="hidden sm:block px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={handlelogout}
            >
              Logout
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-3xl"
            onClick={() => setMenu(!menu)}
          >
            <IoMenu />
          </button>
        </div>

        {/* Mobile Menu */}
        {menu && (
          <div className="sm:hidden flex flex-col gap-3 pb-4">

            <Link
              to="/"
              onClick={closeMenu}
              className={
                location.pathname === "/"
                  ? "text-white"
                  : "text-gray-400"
              }
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className={
                location.pathname === "/about"
                  ? "text-white"
                  : "text-gray-400"
              }
            >
              About
            </Link>

            {!localStorage.getItem("token") ? (
              <div className="flex flex-col gap-2 pt-2">

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="border border-gray-500 py-2 text-center rounded-lg"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="bg-blue-600 text-white py-2 text-center rounded-lg"
                >
                  Signup
                </Link>

              </div>
            ) : (
              <button
                className="bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
                onClick={handlelogout}
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}