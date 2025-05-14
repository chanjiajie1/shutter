
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";

const photoData = [
  { id: 1, src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800", alt: "Woman using laptop", category: "people" },
  { id: 2, src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800", alt: "Computer screen with code", category: "technology" },
  { id: 3, src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", alt: "Circuit board close-up", category: "technology" },
  { id: 4, src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800", alt: "Java programming", category: "technology" },
  { id: 5, src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800", alt: "Person using MacBook", category: "people" },
  { id: 6, src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800", alt: "Woman using laptop", category: "people" },
  { id: 7, src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", alt: "Robot figurine", category: "technology" },
  { id: 8, src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800", alt: "Digital matrix pattern", category: "technology" },
  { id: 9, src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800", alt: "Laptop computer", category: "technology" },
  { id: 10, src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800", alt: "Colorful code on monitor", category: "technology" },
  { id: 11, src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800", alt: "Woman at home office", category: "people" },
  { id: 12, src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800", alt: "Programming code", category: "technology" },
  { id: 13, src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", alt: "Circuit board close-up", category: "technology" },
  { id: 14, src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800", alt: "Java programming", category: "technology" },
  { id: 15, src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800", alt: "Person using MacBook", category: "people" },
];

const styleFilters = [
  { name: "All Styles", value: "" },
  { name: "Minimalist", value: "minimalist" },
  { name: "Vintage", value: "vintage" },
  { name: "Modern", value: "modern" },
  { name: "Colorful", value: "colorful" },
];

const orientationFilters = [
  { name: "Any Orientation", value: "" },
  { name: "Horizontal", value: "horizontal" },
  { name: "Vertical", value: "vertical" },
  { name: "Square", value: "square" },
];

const sortOptions = [
  { name: "Popular", value: "popular" },
  { name: "Newest", value: "newest" },
  { name: "Relevant", value: "relevant" },
];

const Photos: React.FC = () => {
  const [activeStyle, setActiveStyle] = useState("");
  const [activeOrientation, setActiveOrientation] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  return (
    <Layout>
      {/* Hero Banner */}
      <section 
        className="relative py-16 bg-cover bg-center text-white"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920')",
          height: "300px",
        }}
      >
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-shadow-lg">
            Professional Stock Photos
          </h1>
          <p className="max-w-xl text-lg opacity-90 text-shadow">
            Browse our collection of stunning professional photography for your creative projects.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center h-12 bg-white rounded-full px-4 border border-gray-200 shadow-sm">
              <Search size={18} className="text-brand-gray" />
              <input
                type="text"
                placeholder="Search photos..."
                className="ml-2 w-full bg-transparent border-none outline-none text-brand-black text-sm"
              />
              <Button size="sm" className="rounded-full h-8 text-sm bg-brand-blue hover:bg-blue-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-brand-light border-b">
        <div className="container mx-auto px-4">
          <div className="py-4 flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-brand-black">Style:</span>
              <div className="flex flex-wrap gap-2">
                {styleFilters.map((filter) => (
                  <button
                    key={filter.value}
                    className={`px-3 py-1 rounded-full text-xs ${
                      filter.value === activeStyle || (!filter.value && !activeStyle)
                        ? "bg-brand-blue text-white"
                        : "bg-white text-brand-gray border border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveStyle(filter.value)}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-brand-black">Orientation:</span>
              <div className="flex flex-wrap gap-2">
                {orientationFilters.map((filter) => (
                  <button
                    key={filter.value}
                    className={`px-3 py-1 rounded-full text-xs ${
                      filter.value === activeOrientation || (!filter.value && !activeOrientation)
                        ? "bg-brand-blue text-white"
                        : "bg-white text-brand-gray border border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveOrientation(filter.value)}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filters Toggle */}
          <div className="md:hidden py-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full flex justify-between items-center"
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            >
              <span>Filters</span>
              <ChevronDown size={16} className={showFiltersMobile ? "transform rotate-180" : ""} />
            </Button>
            
            {showFiltersMobile && (
              <div className="pt-4 pb-2 space-y-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-brand-black">Style:</span>
                  <div className="flex flex-wrap gap-2">
                    {styleFilters.map((filter) => (
                      <button
                        key={filter.value}
                        className={`px-3 py-1 rounded-full text-xs ${
                          filter.value === activeStyle || (!filter.value && !activeStyle)
                            ? "bg-brand-blue text-white"
                            : "bg-white text-brand-gray border border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setActiveStyle(filter.value)}
                      >
                        {filter.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <span className="text-sm font-medium text-brand-black">Orientation:</span>
                  <div className="flex flex-wrap gap-2">
                    {orientationFilters.map((filter) => (
                      <button
                        key={filter.value}
                        className={`px-3 py-1 rounded-full text-xs ${
                          filter.value === activeOrientation || (!filter.value && !activeOrientation)
                            ? "bg-brand-blue text-white"
                            : "bg-white text-brand-gray border border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setActiveOrientation(filter.value)}
                      >
                        {filter.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Photos Grid Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-xl font-bold">
              Stock Photos <span className="text-brand-gray font-normal ml-2">({photoData.length})</span>
            </h2>
            
            <div className="relative">
              <button 
                className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-md bg-white"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                <span>Sort by: <span className="font-medium">{sortOptions.find(o => o.value === sortBy)?.name}</span></span>
                <ChevronDown size={16} />
              </button>
              
              {showSortDropdown && (
                <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`px-4 py-2 text-left block w-full hover:bg-gray-50 ${
                        sortBy === option.value ? "text-brand-blue font-medium" : "text-brand-gray"
                      }`}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Photos Grid */}
          <div className="image-grid">
            {photoData.map((photo) => (
              <Link key={photo.id} to={`/photos/${photo.id}`} className="image-card">
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  className="rounded-lg shadow-sm object-cover w-full aspect-[3/2]"
                />
              </Link>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="px-8">
              Load More
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-brand-light border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need something more specific?</h2>
          <p className="max-w-xl mx-auto mb-6 text-brand-gray">
            We have millions of high-quality photos for every project. Try a more specific search.
          </p>
          <Button className="bg-brand-blue hover:bg-blue-700 px-6">
            Explore All Categories
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Photos;
