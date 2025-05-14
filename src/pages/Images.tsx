
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";

const imageData = [
  { id: 1, src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800", alt: "Woman using laptop", category: "business" },
  { id: 2, src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800", alt: "Computer screen with code", category: "technology" },
  { id: 3, src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", alt: "Circuit board close-up", category: "technology" },
  { id: 4, src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800", alt: "Java programming", category: "technology" },
  { id: 5, src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800", alt: "Person using MacBook", category: "business" },
  { id: 6, src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800", alt: "Woman using laptop", category: "business" },
  { id: 7, src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", alt: "Robot figurine", category: "technology" },
  { id: 8, src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800", alt: "Digital matrix pattern", category: "technology" },
  { id: 9, src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800", alt: "Laptop computer", category: "technology" },
  { id: 10, src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800", alt: "Colorful code on monitor", category: "technology" },
  { id: 11, src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800", alt: "Woman at home office", category: "business" },
  { id: 12, src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800", alt: "Programming code", category: "technology" },
];

const categoryFilters = [
  { name: "All", value: "" },
  { name: "Business", value: "business" },
  { name: "Technology", value: "technology" },
  { name: "Nature", value: "nature" },
  { name: "People", value: "people" },
];

const sortOptions = [
  { name: "Popular", value: "popular" },
  { name: "Newest", value: "newest" },
  { name: "Relevant", value: "relevant" },
];

const Images: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState("popular");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const filteredImages = categoryParam 
    ? imageData.filter(img => img.category === categoryParam) 
    : imageData;

  return (
    <Layout>
      {/* Hero Search Section */}
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Explore Stock Images</h1>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center h-14 bg-white rounded-full px-5 border border-gray-200 shadow-sm">
              <Search size={20} className="text-brand-gray" />
              <input
                type="text"
                placeholder="Search high-quality stock images..."
                className="ml-2 w-full bg-transparent border-none outline-none text-brand-black"
              />
              <Button className="rounded-full min-w-24 bg-brand-blue hover:bg-blue-700">
                Search
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categoryFilters.map((filter) => (
              <Link 
                key={filter.value} 
                to={filter.value ? `/images?category=${filter.value}` : "/images"}
                className={`px-4 py-2 rounded-full text-sm ${
                  (filter.value === activeCategory || (!filter.value && !activeCategory)) 
                    ? "bg-brand-blue text-white"
                    : "bg-white text-brand-gray border border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setActiveCategory(filter.value)}
              >
                {filter.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Images Grid Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {/* Filter and Sort Controls */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-xl font-bold">
              {categoryParam 
                ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Images` 
                : "All Images"} 
              <span className="text-brand-gray font-normal ml-2">({filteredImages.length})</span>
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
          
          {/* Images Grid */}
          <div className="image-grid">
            {filteredImages.map((image) => (
              <Link key={image.id} to={`/photos/${image.id}`} className="image-card">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="rounded-lg shadow-sm object-cover w-full aspect-[3/2]"
                />
              </Link>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" className="rounded-l-md rounded-r-none">Previous</Button>
              <Button variant="outline" size="sm" className="rounded-none bg-brand-blue text-white">1</Button>
              <Button variant="outline" size="sm" className="rounded-none">2</Button>
              <Button variant="outline" size="sm" className="rounded-none">3</Button>
              <Button variant="outline" size="sm" className="rounded-none">...</Button>
              <Button variant="outline" size="sm" className="rounded-none">10</Button>
              <Button variant="outline" size="sm" className="rounded-l-none rounded-r-md">Next</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Images;
