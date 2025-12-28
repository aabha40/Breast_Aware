
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

const NavBar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-pink-600 font-bold text-xl">BreastAware</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={cn(
                  "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                  isActive("/")
                    ? "border-pink-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                Home
              </Link>
              <Link
                to="/prediction"
                className={cn(
                  "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                  isActive("/prediction")
                    ? "border-pink-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                Prediction
              </Link>
              <Link
                to="/models"
                className={cn(
                  "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                  isActive("/models")
                    ? "border-pink-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                Models
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={cn(
              "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
              isActive("/")
                ? "bg-pink-50 border-pink-500 text-pink-700"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            )}
          >
            Home
          </Link>
          <Link
            to="/prediction"
            className={cn(
              "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
              isActive("/prediction")
                ? "bg-pink-50 border-pink-500 text-pink-700"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            )}
          >
            Prediction
          </Link>
          <Link
            to="/models"
            className={cn(
              "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
              isActive("/models")
                ? "bg-pink-50 border-pink-500 text-pink-700"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            )}
          >
            Models
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
