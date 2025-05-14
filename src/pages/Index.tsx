
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";

const categoryData = [
  { title: "Nature", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", href: "/images?category=nature" },
  { title: "Business", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800", href: "/images?category=business" },
  { title: "Technology", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800", href: "/images?category=technology" },
  { title: "People", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800", href: "/images?category=people" }
];

const collectionData = [
  { title: "Trending AI Images", count: "2.3k images", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", href: "/collections/ai-images" },
  { title: "Work From Home", count: "1.8k images", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800", href: "/collections/work-from-home" },
  { title: "Digital Landscapes", count: "3.5k images", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800", href: "/collections/digital-landscapes" }
];

const popularImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800", alt: "Woman using laptop" },
  { id: 2, src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800", alt: "Computer screen with code" },
  { id: 3, src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", alt: "Circuit board close-up" },
  { id: 4, src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800", alt: "Java programming" },
  { id: 5, src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", alt: "Robot figurine" },
  { id: 6, src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800", alt: "Digital landscape" },
];

const Index: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-32 bg-cover bg-center text-white"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920')",
        }}
      >
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-shadow-lg animate-fade-in">
            Stunning royalty-free images & photos
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 text-shadow animate-fade-up">
            Over 200 million high-quality stock images, videos, and music shared by our talented community.
          </p>
          
          {/* Search Bar */}
          <div className="mx-auto max-w-2xl relative">
            <div className="flex items-center h-14 bg-white rounded-full px-5 shadow-lg">
              <Search size={20} className="text-brand-gray" />
              <input
                type="text"
                placeholder="Search for high-quality images..."
                className="ml-2 w-full bg-transparent border-none outline-none text-brand-black"
              />
              <Button className="rounded-full min-w-24 bg-brand-blue hover:bg-blue-700">
                Search
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2 text-white/90 text-sm">
              <span>Trending:</span>
              <Link to="/search?q=business" className="hover:text-white hover:underline">business</Link>
              <Link to="/search?q=nature" className="hover:text-white hover:underline">nature</Link>
              <Link to="/search?q=travel" className="hover:text-white hover:underline">travel</Link>
              <Link to="/search?q=technology" className="hover:text-white hover:underline">technology</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Popular Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryData.map((category, index) => (
              <Link 
                key={index} 
                to={category.href} 
                className="group rounded-lg overflow-hidden shadow-md transition-all hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <h3 className="text-xl text-white font-semibold p-5 w-full text-shadow">{category.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Images */}
      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Images</h2>
            <Link to="/images" className="text-brand-blue hover:underline">View all</Link>
          </div>
          
          <div className="image-grid">
            {popularImages.map((image) => (
              <Link key={image.id} to={`/photos/${image.id}`} className="image-card">
                <img src={image.src} alt={image.alt} className="rounded-lg shadow-sm" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Featured Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collectionData.map((collection, index) => (
              <Link 
                key={index}
                to={collection.href}
                className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg">{collection.title}</h3>
                  <p className="text-brand-gray text-sm">{collection.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="max-w-xl mx-auto mb-8 text-blue-100">
            Join thousands of creators and businesses who trust PhotoStock for high-quality images.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="default" className="bg-white text-brand-blue hover:bg-gray-100 px-6">
              Sign Up Free
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-blue-700 px-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
