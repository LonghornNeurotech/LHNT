import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/assets/cow purssian blue.svg";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Role details that get displayed in modal when user needs to know more about their assigned role.
const ROLE_DETAILS = {
  Admin: {
    can: [
      "Approve, create, remove, or edit user accounts",
      "Assign, change, or revoke user roles",
      "View and manage audit logs",
      "Override or rollback content or design changes",
      "Access all admin/system settings",
      "Approve production deployments",
      "View onboarding walkthroughs and technical resources"
    ],
    cannot: [
      "Directly edit website content (unless also Content Editor)",
      "Directly change design/theme (unless also Developer)",
      "Participate in regular content workflows unless needed"
    ]
  },
  Developer: {
    can: [
      "Access and edit design system (colors, fonts, spacing)",
      "Modify UI component styling and layout",
      "Adjust responsive breakpoints and animation logic",
      "Access and update Tailwind, CSS, or theme configuration",
      "Test design changes in staging/previews",
      "View onboarding walkthroughs and technical resources"
    ],
    cannot: [
      "Edit or approve page content",
      "Manage user accounts or roles",
      "Deploy to production without Admin approval"
    ]
  },
  "Content Editor": {
    can: [
      "Edit all page content (Home, About, Events, Alumni)",
      "Add, edit, or remove images and files",
      "Add, edit, or remove event cards and alumni profiles",
      "Reassign event types",
      "Edit leadership profiles",
      "Manage image carousels/roulettes",
      "Preview and submit content changes for review",
      "View onboarding walkthroughs and technical resources"
    ],
    cannot: [
      "Change design system settings",
      "Access or modify codebase or component styling",
      "Manage user accounts or roles",
      "Deploy to production without Admin approval"
    ]
  },
  Member: {
    can: [
      "View onboarding walkthroughs and technical resources",
      "View protected member-only content",
      "Submit content suggestions or feedback"
    ],
    cannot: [
      "Edit any website content",
      "Access design system or codebase",
      "Manage user accounts or roles",
      "Approve or deploy changes"
    ]
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Implementing controlled display for when user is logged in or not
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  // New state for mobile profile dropdown
  const [mobileProfileDropdown, setMobileProfileDropdown] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Hamburger menu toggler also closes mobile profile dropdown
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setMobileProfileDropdown(false);
  };

  // Toggle mobile profile dropdown and close hamburger menu
  const toggleMobileProfile = () => {
    setMobileProfileDropdown(!mobileProfileDropdown);
    setIsOpen(false);
  }

  // Handle logout and close menu
  const handleLogout = () => {
    logout();
    setProfileDropdown(false);
    setMobileProfileDropdown(false);
    setIsOpen(false);
    navigate("/");
  }

  return (
    <>
      <nav className="w-full h-20 border-b-2 bg-white border-gray-200 text-[#598BBC] font-['Antonio'] shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo/Home Link */}
            <Link
              to="/"
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
            >
              <img
                src={Logo}
                className="w-24 h-auto p-2"
                alt="Longhorn Neurotech Logo"
              />
            </Link>

            {/* Desktop Navigation */}
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
                to="/alumni"
                className="text-2xl text-[#213C58] font-['Antonio'] px-4 py-2 rounded-md hover:bg-[#FFEBAD] hover:bg-opacity-75 hover:text-[#598BBC]  transition-colors duration-200"
              >
                Alumni
              </Link>

              <Link
                to="/contact"
                className="text-2xl  text-[#213C58] font-['Antonio'] px-4 py-2 rounded-md hover:bg-[#FFEBAD] hover:bg-opacity-75 hover:text-[#598BBC] transition-colors duration-200"
              >
                Contact
              </Link>

              {/* Authenticated: Show Profile Icon with Dropdown */}
              {isAuthenticated ? (
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
                      {/* User info section */}
                      <div className="px-4 pt-3 pb-1">
                        <p className="font-semibold text-[#213C58] mb-0">
                          {user?.name || "User"}
                        </p>
                        <span className="text-sm text-[#598BBC]">{user?.role || "Member"}</span>
                      </div>
                      {/* Button user can click on to view more details about their assigned role */}
                      <div className="px-0 pb-2 mt-2">
                        <button
                          className="block w-full text-left px-4 py-2 text-[#213C58] hover:bg-[#FFEBAD] rounded-md text-base font-normal"
                          onClick={() => setShowRoleModal(true)}
                        >
                          What can I do?
                        </button>
                      </div>
                      {/* Logout button */}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-[#213C58] hover:bg-[#FFEBAD] rounded-md"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-2xl text-[#213C58] font-['Antonio'] px-4 py-2 rounded-md hover:bg-[#FFEBAD] hover:bg-opacity-75 hover:text-[#598BBC] transition-colors duration-200"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Header Icons */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Profile Icon (only when authenticated) */}
              {isAuthenticated && (
                <button
                  className="p-2 rounded-md hover:bg-[#FEEBAD] transition-colors duration-200"
                  onClick={toggleMobileProfile}
                  aria-label="Profile"
                >
                  <User size={24} className="text-[#213C58]" />
                </button>
              )}

              {/* Mobile Menu Button */}
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
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div
            className={`md:hidden absolute left-0 right-0 bg-white border-b border-gray-200 shadow-md transition-all duration-300 ${
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
                to="/alumni"
                className="text-xl font-['Antonio'] text-[#213C58] py-3 px-4 hover:bg-[#FFEBAD] rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Alumni
              </Link>

              <Link
                to="/contact"
                className="text-xl font-['Antonio'] text-[#213C58] py-3 px-4 hover:bg-[#FFEBAD] rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {/* When not Authenticated, only display Login button */}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="text-xl font-['Antonio'] text-[#213C58] py-3 px-4 hover:bg-[#FFEBAD] rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Profile Dropdown */}
          {isAuthenticated && (
            <div
              className={`md:hidden absolute left-0 right-0 bg-white border-b border-gray-200 shadow-md transition-all duration-300 ${
                mobileProfileDropdown ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
              style={{
                transform: mobileProfileDropdown ? "translateY(0)" : "translateY(-100%)",
                top: "80px",
                zIndex: 70
              }}
            >
              <div className="flex flex-col">
                {/* User info section */}
                <div className="px-4 pt-4">
                  <p className="font-semibold text-[#213C58] text-2xl mb-1">
                    {user?.name || "User"}
                  </p>
                  <span className="text-lg text-[#598BBC]">{user?.role || "Member"}</span>
                  <hr className="mt-2 border-t-2 border-[#5D89BA]" />
                </div>
                {/* What can I do button */}
                <button
                  className="w-full text-left text-xl text-[#213C58] font-['Antonio'] py-3 px-4 hover:bg-[#FEEBAD] rounded-md transition-colors duration-200"
                  onClick={() => {
                    setShowRoleModal(true);
                    setMobileProfileDropdown(false);
                  }}
                >
                  What can I do?
                </button>
                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-xl text-[#213C58] font-['Antonio'] py-3 px-4 hover:bg-[#FEEBAD] rounded-md transition-colors duration-200 flex items-center"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Role Modal - placed at the root level so it is never clipped or hidden */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg p-8 relative max-w-lg w-full mx-4">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-4xl"
              onClick={() => setShowRoleModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#213C58]">{user?.role} Permissions</h2>
            <div>
              <h3 className="font-semibold text-[#213C58]">You can:</h3>
              <ul className="list-disc ml-6 mb-4 text-green-700">
                {ROLE_DETAILS[user?.role]?.can.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <h3 className="font-semibold text-[#213C58]">You cannot:</h3>
              <ul className="list-disc ml-6 text-red-700">
                {ROLE_DETAILS[user?.role]?.cannot.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
