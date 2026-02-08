// Navbar that shows public nav when logged out and just logo/profile when logged in
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/assets/cow purssian blue.svg";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Controlling whether profile dropdown menu shows up or not
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileProfileDropdown, setMobileProfileDropdown] = useState(false);
  // Authentication state and navigation 
  const { isAuthenticated, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setMobileProfileDropdown(false);
  };

  const toggleMobileProfile = () => {
    setMobileProfileDropdown(!mobileProfileDropdown);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setProfileDropdown(false);
    setMobileProfileDropdown(false);
    setIsOpen(false);
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Delete your account and all onboarding progress? This cannot be undone."
    );
    if (!confirmed) return;
    await deleteAccount();
    setProfileDropdown(false);
    setMobileProfileDropdown(false);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="w-full h-20 border-b-2 bg-white border-gray-200 text-[#598BBC] font-['Antonio'] shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">

            {/* Logo link — goes to /member if logged in, else / */}
            <Link
              to={isAuthenticated ? "/member" : "/"}
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
            >
              <img
                src={Logo}
                className="w-24 h-auto p-2"
                alt="Longhorn Neurotech Logo"
              />
            </Link>

            {/* Desktop Navigation Icons */}
            {isAuthenticated ? (
              // If logged in: Only show Profile icon/Logout with dropdown or link
              <div className="hidden md:flex space-x-4">
                <div className="relative">
                  <button
                    className="flex items-center px-4 py-2 rounded-md hover:bg-[#FFEBAD] hover:bg-opacity-75 transition-colors duration-200"
                    onClick={() => setProfileDropdown((prev) => !prev)}
                    aria-label="Profile"
                  >
                    <User className="text-[#213C58]" size={28} />
                  </button>
                  {profileDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left font-['Antonio'] leading-snug hover:bg-[#FFEBAD] transition-colors"
                        style={{ 
                          color: "#003153", 
                          fontSize: "1.35rem",
                          padding: "0.95rem 1.3rem",
                        }}
                      >
                        Logout
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        className="w-full text-left font-['Antonio'] leading-snug hover:bg-[#FFD6D6] transition-colors"
                        style={{
                          color: "#7A1D1D",
                          fontSize: "1.35rem",
                          padding: "0.95rem 1.3rem",
                        }}
                      >
                        Delete Account
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // If logged out: Show public navigation and Members links
              <div className="hidden md:flex space-x-4">
                <Link
                  to="/about"
                  className="text-2xl text-[#213C58] font-['Antonio'] px-4 py-2 rounded-md hover:bg-[#FFEBAD] hover:bg-opacity-75 hover:text-[#598BBC] transition-colors duration-200"
                >
                  About Us
                </Link>
                <Link
                  to="/events"
                  className="text-2xl text-[#213C58] font-['Antonio'] px-4 py-2 rounded-md hover:bg-[#FFEBAD] hover:bg-opacity-75 hover:text-[#598BBC]  transition-colors duration-200"
                >
                  Events
                </Link>
                <Link
                  to="/contact"
                  className="text-2xl  text-[#213C58] font-['Antonio'] px-4 py-2 rounded-md hover:bg-[#FFEBAD] hover:bg-opacity-75 hover:text-[#598BBC] transition-colors duration-200"
                >
                  Contact
                </Link>
                <Link
                  to="/login"
                  className="text-2xl text-[#213C58] font-['Antonio'] px-4 py-2 rounded-md hover:bg-[#FFEBAD] hover:bg-opacity-75 hover:text-[#598BBC] transition-colors duration-200"
                >
                  Members
                </Link>
              </div>
            )}

            {/* Mobile Navigation Icons */}
            {/* Only show mobile menu when not authenticated */}
            <div className="md:hidden flex items-center space-x-2">
              {isAuthenticated ? (
                <button
                  className="p-2 rounded-md hover:bg-[#FEEBAD] transition-colors duration-200"
                  onClick={toggleMobileProfile}
                  aria-label="Profile"
                >
                  <User size={24} className="text-[#213C58]" />
                </button>
              ) : (
                <>
                  {/* Hamburger menu for mobile when not logged in */}
                  <button
                    className="p-2 rounded-md hover:bg-[#FEEBAD] transition-colors duration-200"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                  >
                    {isOpen ? (
                      <X size={24} className="text-[#213C58]" />
                    ) : (
                      <Menu size={24} className="text-[#213C58]" />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Public Navigation Menu */}
          {!isAuthenticated && (
            <div
              className={`md:hidden absolute left-0 right-0 bg-white border-b border-gray-200 rounded-b-lg shadow-md transition-all duration-300 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
              style={{
                transform: isOpen ? "translateY(0)" : "translateY(-100%)",
                top: "80px",
                zIndex: 60
              }}
            >
              <div className="flex flex-col">
                <div className="px-4 pt-4">
                  <span className="font-semibold text-[#213C58] text-2xl">
                    Ready to discover more?
                  </span>
                  <hr className="mt-2 border-t-2 border-[#5D89BA]" />
                </div>
                <Link
                  to="/about"
                  className="text-xl font-['Antonio'] text-[#213C58] py-3 px-4 hover:bg-[#FFEBAD] rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/events"
                  className="text-xl font-['Antonio'] text-[#213C58] py-3 px-4 hover:bg-[#FFEBAD] rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Events
                </Link>
                <Link
                  to="/contact"
                  className="text-xl font-['Antonio'] text-[#213C58] py-3 px-4 hover:bg-[#FFEBAD] rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/login"
                  className="text-xl font-['Antonio'] text-[#213C58] py-3 px-4 hover:bg-[#FFEBAD] rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Members
                </Link>
              </div>
            </div>
          )}

          {/* Mobile Profile Dropdown*/}
          {isAuthenticated && (
            <div
              className={`md:hidden absolute left-0 right-0 bg-white border-b border-gray-200 rounded-b-lg shadow-md transition-all duration-300 ${
                mobileProfileDropdown ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
              style={{
                top: "70px",
                zIndex: 70
              }}
            >
              <div className="flex flex-col">
                <button
                  onClick={handleLogout}
                  className="w-full text-left font-['Antonio'] flex items-center hover:bg-[#FFEBAD] transition-colors"
                  style={{
                    color: "#003153",
                    fontSize: "1.35rem",
                    padding: "0.95rem 1.3rem",
                  }}
                >
                  Logout
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full text-left font-['Antonio'] flex items-center hover:bg-[#FFD6D6] transition-colors"
                  style={{
                    color: "#7A1D1D",
                    fontSize: "1.35rem",
                    padding: "0.95rem 1.3rem",
                  }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
