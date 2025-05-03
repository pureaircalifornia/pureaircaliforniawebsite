import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Image } from 'lucide-react';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('before-after');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const beforeAfterPhotos = [
    {
      before: '/gallery/Before and after of an air duct cleaning service.jpg',
      after: '/gallery/whats lurking inside baby.jpg',
      description: 'Residential Air Duct Cleaning - Beverly Hills'
    },
    {
      before: '/gallery/65.png',
      after: '/gallery/66.png',
      description: 'Commercial Air Duct Cleaning - Century City'
    },
    {
      before: '/gallery/67.png',
      after: '/gallery/68.png',
      description: 'Dryer Vent Cleaning - Malibu'
    }
  ];

  const processPhotos = [
    {
      image: '/gallery/Companies-that-have-worked-with-pure-air-california.webp',
      title: 'Initial Inspection',
      description: 'Our certified technicians perform a thorough inspection of your HVAC system'
    },
    {
      image: '/gallery/Pure-air-california-ratings.webp',
      title: 'Negative Air Setup',
      description: 'Setting up HEPA negative air machines to contain contaminants'
    },
    {
      image: '/gallery/trusted reviews.jpg',
      title: 'Cleaning Process',
      description: 'Using specialized brushes and air care products for deep cleaning'
    },
    {
      image: '/gallery/trusted review for pure air califonria.png',
      title: 'Final Inspection',
      description: 'Quality check to ensure complete cleaning and system integrity'
    }
  ];

  const videos = [
    {
      thumbnail: '/gallery/Companies that have worked with pure air california.png',
      title: 'Our Cleaning Process',
      description: 'See how we clean your air ducts using HEPA negative air systems'
    },
    {
      thumbnail: '/gallery/Pure air california ratings.png',
      title: 'Before & After Results',
      description: 'Watch the transformation of a commercial air duct system'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Work in Action</h2>
        
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full ${
              activeTab === 'before-after'
                ? 'bg-brand-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('before-after')}
          >
            Before & After
          </button>
          <button
            className={`px-6 py-2 rounded-full ${
              activeTab === 'process'
                ? 'bg-brand-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('process')}
          >
            Our Process
          </button>
          <button
            className={`px-6 py-2 rounded-full ${
              activeTab === 'videos'
                ? 'bg-brand-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
        </div>

        {/* Content */}
        <div className="relative">
          {activeTab === 'before-after' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beforeAfterPhotos.map((photo, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-64">
                    <img
                      src={photo.before}
                      alt="Before cleaning"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <img
                      src={photo.after}
                      alt="After cleaning"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600">{photo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'process' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processPhotos.map((photo, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{photo.title}</h3>
                    <p className="text-gray-600 text-sm">{photo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((video, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-64">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{video.title}</h3>
                    <p className="text-gray-600 text-sm">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery; 