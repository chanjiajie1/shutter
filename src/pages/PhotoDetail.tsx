
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart, Download, Share, Plus, Info } from "lucide-react";

const photoData = [
  { 
    id: "1", 
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200", 
    alt: "Woman using laptop", 
    title: "Woman Using Laptop at Home Office",
    contributor: "Alex Johnson",
    contributorAvatar: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=64&h=64&fit=crop",
    downloads: "12.5k",
    likes: "3.2k",
    tags: ["business", "office", "remote work", "laptop", "woman", "technology"],
    description: "Professional woman working from home on laptop in comfortable home office setting. Perfect for remote work, business, technology and lifestyle concepts.",
    similarImages: [
      { id: "2", src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300", alt: "Computer code on screen" },
      { id: "5", src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300", alt: "Person using MacBook" },
      { id: "6", src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300", alt: "Woman with laptop" },
      { id: "9", src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300", alt: "Laptop" },
    ]
  },
  { 
    id: "2", 
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200", 
    alt: "Computer screen with code", 
    title: "Programming Code on Computer Screen",
    contributor: "Michael Chen",
    contributorAvatar: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=64&h=64&fit=crop",
    downloads: "18.7k",
    likes: "5.4k",
    tags: ["programming", "code", "technology", "computer", "development", "software"],
    description: "Close up of computer screen showing programming code. This image is perfect for software development, coding, programming, and technology related content.",
    similarImages: [
      { id: "3", src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300", alt: "Circuit board" },
      { id: "4", src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300", alt: "Java code" },
      { id: "7", src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300", alt: "Robot" },
      { id: "10", src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300", alt: "Code on screen" },
    ]
  }
];

const PhotoDetail: React.FC = () => {
  const { id } = useParams();
  const photo = photoData.find(p => p.id === id);
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  
  if (!photo) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold">Photo not found</h2>
          <p className="mt-4">The photo you're looking for doesn't exist or has been removed.</p>
          <Link to="/photos" className="mt-6 inline-block text-brand-blue hover:underline">
            Browse all photos
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {/* Navigation Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="py-3 flex items-center justify-between">
            <Link to="/photos" className="flex items-center text-sm text-brand-gray hover:text-brand-blue">
              <ChevronLeft size={16} className="mr-1" />
              Back to Photos
            </Link>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center text-sm text-brand-gray hover:text-brand-blue px-2 py-1">
                <Heart size={16} className="mr-1" />
                <span className="hidden sm:inline">Save</span>
              </button>
              <button className="flex items-center text-sm text-brand-gray hover:text-brand-blue px-2 py-1">
                <Share size={16} className="mr-1" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <Button size="sm" className="rounded-full bg-brand-blue hover:bg-blue-700">
                <Download size={16} className="mr-1" />
                <span>Download</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Photo Display */}
      <section className="py-8 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src={photo.src} 
                alt={photo.alt}
                className="w-full h-auto object-contain max-h-[70vh]"
              />
            </div>
            
            {/* Photo Info */}
            <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-bold">{photo.title}</h1>
                  <div className="mt-1 flex items-center">
                    <img 
                      src={photo.contributorAvatar} 
                      alt={photo.contributor}
                      className="w-7 h-7 rounded-full mr-2" 
                    />
                    <span className="text-sm">{photo.contributor}</span>
                  </div>
                </div>
                <div className="flex items-center text-brand-gray text-sm space-x-4">
                  <div className="flex items-center">
                    <Download size={15} className="mr-1" />
                    <span>{photo.downloads}</span>
                  </div>
                  <div className="flex items-center">
                    <Heart size={15} className="mr-1" />
                    <span>{photo.likes}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  className="flex items-center text-sm font-medium text-brand-blue mb-2"
                  onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                >
                  <Info size={16} className="mr-1" />
                  <span>{isInfoExpanded ? "Hide details" : "Show details"}</span>
                </button>
                
                {isInfoExpanded && (
                  <div className="mt-2 text-sm text-brand-gray">
                    <p className="mb-3">{photo.description}</p>
                    <div className="mt-4">
                      <h3 className="text-brand-black font-medium mb-2">Tags:</h3>
                      <div className="flex flex-wrap gap-2">
                        {photo.tags.map((tag, index) => (
                          <Link 
                            key={index} 
                            to={`/search?q=${tag}`}
                            className="px-3 py-1 bg-brand-light rounded-full text-xs text-brand-gray hover:bg-gray-200"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Similar Photos Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Similar Photos</h2>
          
          <div className="image-grid">
            {photo.similarImages.map((similar) => (
              <Link key={similar.id} to={`/photos/${similar.id}`} className="image-card">
                <img 
                  src={similar.src} 
                  alt={similar.alt}
                  className="rounded-lg shadow-sm object-cover w-full aspect-[3/2]"
                />
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" className="rounded-full px-8">
              <Plus size={16} className="mr-2" />
              View More Similar Photos
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-brand-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Find More Amazing Photos?</h2>
          <p className="max-w-xl mx-auto mb-8 text-blue-100">
            Browse our collection of millions of high-quality stock photos for your next creative project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default" size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
              Browse Photos
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">
              Sign Up Free
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PhotoDetail;
