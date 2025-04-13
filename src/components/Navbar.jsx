import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/assets/cow purssian blue.svg";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
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

            <Link
              to="/login"
              className="text-2xl  text-[#213C58] font-['Antonio'] px-4 py-2 rounded-md hover:bg-[#FFEBAD] hover:bg-opacity-75 hover:text-[#598BBC] transition-colors duration-200"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className="text-primary" />
            ) : (
              <Menu size={24} className="text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute left-0 right-0 bg-white border-b border-gray-200 shadow-md transition-all duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          style={{
            transform: isOpen ? "translateY(0)" : "translateY(-100%)",
            top: "80px",
          }}
        >
          <div className="flex flex-col p-4 space-y-2">
            <Link
              to="/about"
              className="text-xl py-3 px-4 hover:bg-gray-100 rounded-md transition-colors duration-200 text-primary"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>

            <Link
              to="/events"
              className="text-xl py-3 px-4 hover:bg-gray-100 rounded-md transition-colors duration-200 text-primary"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>

            <Link
              to="/alumni"
              className="text-xl py-3 px-4 hover:bg-gray-100 rounded-md transition-colors duration-200 text-primary"
              onClick={() => setIsOpen(false)}
            >
              Alumni
            </Link>

            <Link
              to="/contact"
              className="text-xl py-3 px-4 hover:bg-gray-100 rounded-md transition-colors duration-200 text-primary"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <Link
              to="/login"
              className="text-xl py-3 px-4 hover:bg-gray-100 rounded-md transition-colors duration-200 text-primary"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
