
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-brand-blue">
            PhotoStock
          </Link>
          <nav className="hidden md:flex ml-8 space-x-6">
            <Link to="/images" className="text-brand-black hover:text-brand-blue transition-colors">
              Images
            </Link>
            <div className="relative group">
              <button className="flex items-center text-brand-black hover:text-brand-blue transition-colors">
                Photos <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute bg-white shadow-lg rounded-md p-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                <Link to="/photos" className="block py-2 text-brand-black hover:text-brand-blue">
                  Browse Photos
                </Link>
                <Link to="/photos/popular" className="block py-2 text-brand-black hover:text-brand-blue">
                  Popular Photos
                </Link>
                <Link to="/photos/new" className="block py-2 text-brand-black hover:text-brand-blue">
                  New Photos
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center text-brand-black hover:text-brand-blue transition-colors">
                Explore <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute bg-white shadow-lg rounded-md p-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                <Link to="/collections" className="block py-2 text-brand-black hover:text-brand-blue">
                  Collections
                </Link>
                <Link to="/contributors" className="block py-2 text-brand-black hover:text-brand-blue">
                  Contributors
                </Link>
              </div>
            </div>
          </nav>
        </div>
        <div className="flex items-center">
          <div className="hidden sm:block">
            <div className="flex items-center h-10 bg-brand-light rounded-full px-4 mr-4 focus-within:ring-2 focus-within:ring-brand-blue">
              <Search size={18} className="text-brand-gray" />
              <input
                type="text"
                placeholder="Search images..."
                className="bg-transparent border-none outline-none px-2 w-full"
              />
            </div>
          </div>
          <div className="hidden sm:flex space-x-2">
            <Button variant="outline" size="sm" className="rounded-full px-4">
              Log In
            </Button>
            <Button size="sm" className="rounded-full px-4 bg-brand-blue hover:bg-blue-700">
              Sign Up
            </Button>
          </div>
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-brand-light"
            onClick={toggleMobileMenu}
          >
            <Menu size={20} className="text-brand-gray" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <div className="flex mx-auto w-full max-w-md bg-brand-light rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-brand-blue">
              <Search size={18} className="text-brand-gray" />
              <input
                type="text"
                placeholder="Search images..."
                className="bg-transparent border-none outline-none px-2 w-full"
              />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link to="/images" className="py-2 text-brand-black hover:text-brand-blue transition-colors">
                Images
              </Link>
              <Link to="/photos" className="py-2 text-brand-black hover:text-brand-blue transition-colors">
                Photos
              </Link>
              <Link to="/collections" className="py-2 text-brand-black hover:text-brand-blue transition-colors">
                Collections
              </Link>
              <Link to="/contributors" className="py-2 text-brand-black hover:text-brand-blue transition-colors">
                Contributors
              </Link>
            </nav>
            <div className="flex space-x-2 justify-center pt-2">
              <Button variant="outline" size="sm" className="rounded-full px-4 w-full">
                Log In
              </Button>
              <Button size="sm" className="rounded-full px-4 bg-brand-blue hover:bg-blue-700 w-full">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
