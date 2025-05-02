
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CalendarIcon } from 'lucide-react';
import { Helmet } from 'react-helmet';
import BlogCard from '@/components/BlogCard';

const blogPosts = [
  {
    title: "5 Signs Your Air Ducts Need Cleaning",
    slug: "signs-air-ducts-need-cleaning",
    excerpt: "Learn the telltale signs that indicate your home's air ducts are due for a professional cleaning.",
    date: "May 8, 2023",
    image: "https://images.unsplash.com/photo-1551639325-8f2e71afa1fc",
    category: "Residential"
  },
  {
    title: "How Clean Air Ducts Improve Indoor Air Quality for Allergy Sufferers",
    slug: "clean-air-ducts-allergy-relief",
    excerpt: "Discover how professional air duct cleaning can significantly reduce allergy symptoms and improve breathing.",
    date: "April 22, 2023",
    image: "https://images.unsplash.com/photo-1597345637412-9fd611e758e4",
    category: "Health Benefits"
  },
  {
    title: "Commercial Air Duct Cleaning: Boosting Employee Productivity",
    slug: "commercial-air-duct-cleaning-productivity",
    excerpt: "Research shows that clean air in the workplace leads to better focus, fewer sick days, and increased productivity.",
    date: "April 10, 2023",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
    category: "Commercial"
  },
  {
    title: "Dryer Vent Cleaning: A Critical Fire Prevention Measure",
    slug: "dryer-vent-cleaning-fire-prevention",
    excerpt: "Understand how regular dryer vent cleaning can prevent one of the most common causes of residential fires.",
    date: "March 15, 2023",
    image: "https://images.unsplash.com/photo-1635274605638-d44babc08a4f",
    category: "Safety"
  },
  {
    title: "HVAC Efficiency: How Clean Air Ducts Save You Money",
    slug: "hvac-efficiency-clean-air-ducts-save-money",
    excerpt: "Clean air ducts allow your HVAC system to work more efficiently, reducing energy costs and extending equipment life.",
    date: "March 3, 2023",
    image: "https://images.unsplash.com/photo-1631392561719-acb5c75c3ad5",
    category: "Cost Savings"
  },
  {
    title: "The Air Duct Cleaning Process: What to Expect",
    slug: "air-duct-cleaning-process-what-to-expect",
    excerpt: "A step-by-step guide to the professional air duct cleaning process and how to prepare your home or business.",
    date: "February 18, 2023",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
    category: "Services"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning Blog | Pure Air California</title>
        <meta name="description" content="Learn about indoor air quality, HVAC maintenance, allergen reduction, and fire prevention through professional air duct and dryer vent cleaning." />
        <meta name="keywords" content="air duct cleaning blog, dryer vent maintenance, indoor air quality, HVAC efficiency, allergen reduction, fire prevention, Los Angeles air quality" />
      </Helmet>
      
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-[#0A3D7C] to-[#5BBDE4]">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Pure Air California Blog
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Expert insights on air quality, HVAC maintenance, allergen reduction, 
              and creating healthier environments for your home or business.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <BlogCard 
                    key={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    image={post.image}
                    category={post.category}
                    slug={post.slug}
                  />
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-heading font-semibold text-xl mb-4">Categories</h3>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-[#0A3D7C] hover:bg-gray-100">
                      Residential (8)
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-[#0A3D7C] hover:bg-gray-100">
                      Commercial (6)
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-[#0A3D7C] hover:bg-gray-100">
                      Health Benefits (7)
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-[#0A3D7C] hover:bg-gray-100">
                      Safety (5)
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-[#0A3D7C] hover:bg-gray-100">
                      Cost Savings (4)
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-[#0A3D7C] hover:bg-gray-100">
                      Services (9)
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-heading font-semibold text-xl mb-4">Popular Posts</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1635274605638-d44babc08a4f" 
                          alt="Dryer vent cleaning" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm hover:text-[#0A3D7C] transition">
                          <Link to="/blog/dryer-vent-cleaning-fire-prevention">
                            Dryer Vent Cleaning: A Critical Fire Prevention Measure
                          </Link>
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <CalendarIcon size={12} />
                          <span>March 15, 2023</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1597345637412-9fd611e758e4" 
                          alt="Allergy relief" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm hover:text-[#0A3D7C] transition">
                          <Link to="/blog/clean-air-ducts-allergy-relief">
                            How Clean Air Ducts Improve Indoor Air Quality for Allergy Sufferers
                          </Link>
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <CalendarIcon size={12} />
                          <span>April 22, 2023</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1551639325-8f2e71afa1fc" 
                          alt="Air duct signs" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm hover:text-[#0A3D7C] transition">
                          <Link to="/blog/signs-air-ducts-need-cleaning">
                            5 Signs Your Air Ducts Need Cleaning
                          </Link>
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <CalendarIcon size={12} />
                          <span>May 8, 2023</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#0A3D7C] to-[#5BBDE4] rounded-xl p-6 text-white">
                  <h3 className="font-heading font-semibold text-xl mb-4">Get a Free Quote</h3>
                  <p className="mb-6">Ready to improve your indoor air quality? Request a free quote for our air duct cleaning services.</p>
                  <Button asChild size="lg" className="w-full bg-white text-[#0A3D7C] hover:bg-gray-100">
                    <Link to="/quote">Request Quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;
