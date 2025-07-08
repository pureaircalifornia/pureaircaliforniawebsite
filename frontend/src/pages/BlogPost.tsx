
import { useParams, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CalendarIcon, UserIcon, ArrowLeftIcon, FacebookIcon, TwitterIcon, LinkedinIcon } from 'lucide-react';
import { Helmet } from 'react-helmet';
import QuoteForm from '@/components/QuoteForm';

// Mock blog post data - in a real app, this would come from an API or CMS
const blogPosts = {
  "signs-air-ducts-need-cleaning": {
    title: "5 Signs Your Air Ducts Need Cleaning",
    content: `<p class="mb-4">Your home's air ducts play a crucial role in maintaining indoor air quality and comfort. Over time, these ducts can accumulate dust, debris, allergens, and even mold, compromising your indoor air quality and potentially causing health issues. But how do you know when it's time to schedule a professional air duct cleaning?</p>
      <h2 class="text-2xl font-heading font-semibold mb-4 mt-8">1. Visible Dust Around Vents</h2>
      <p class="mb-4">One of the most obvious signs that your air ducts need cleaning is visible dust accumulation around your air vents. If you notice dust building up shortly after cleaning, it could indicate that your ductwork is releasing dust into your home.</p>
      <p class="mb-4">This is especially concerning because what you see around the vents is just a fraction of what may be inside your entire duct system. Professional cleaning can remove this built-up debris and prevent it from circulating throughout your home.</p>
      <h2 class="text-2xl font-heading font-semibold mb-4 mt-8">2. Increased Allergy Symptoms</h2>
      <p class="mb-4">If you or your family members are experiencing increased allergy symptoms while indoors, your air ducts could be the culprit. Dirty air ducts can harbor allergens like pollen, pet dander, and dust mites, which are then circulated throughout your home whenever your HVAC system runs.</p>
      <p class="mb-4">Common symptoms include:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Sneezing</li>
        <li>Coughing</li>
        <li>Itchy eyes</li>
        <li>Congestion</li>
        <li>Respiratory issues</li>
      </ul>
      <h2 class="text-2xl font-heading font-semibold mb-4 mt-8">3. Mold or Mildew Odors</h2>
      <p class="mb-4">If you notice a musty or mildew-like smell when your air conditioning or heating system turns on, this could indicate mold growth within your ductwork. Moisture can accumulate in air ducts, creating an ideal environment for mold to thrive.</p>
      <p class="mb-4">Mold in air ducts is particularly concerning because your HVAC system can spread mold spores throughout your entire home, potentially causing health issues, especially for those with respiratory conditions or compromised immune systems.</p>
      <h2 class="text-2xl font-heading font-semibold mb-4 mt-8">4. Reduced Airflow or Efficiency</h2>
      <p class="mb-4">If you've noticed decreased airflow from your vents or that some rooms in your home aren't heating or cooling as effectively as they used to, clogged air ducts might be the issue. Significant dust and debris buildup can restrict airflow, forcing your HVAC system to work harder to maintain your desired temperature.</p>
      <p class="mb-4">This not only leads to discomfort but can also increase your energy bills and shorten the lifespan of your HVAC equipment due to the additional strain.</p>
      <h2 class="text-2xl font-heading font-semibold mb-4 mt-8">5. Recent Renovation or Construction</h2>
      <p class="mb-4">Home renovation or construction projects generate significant amounts of dust and debris that can infiltrate your duct system. If you've recently completed a remodeling project, it's advisable to have your air ducts inspected and cleaned to remove any construction particles that may have accumulated.</p>
      <p class="mb-4">Even with precautions like sealing vents during construction, fine dust particles can still find their way into your ductwork.</p>
      <h2 class="text-2xl font-heading font-semibold mb-4 mt-8">When to Schedule Professional Air Duct Cleaning</h2>
      <p class="mb-4">The National Air Duct Cleaners Association (NADCA) recommends having your air ducts cleaned every 3 to 5 years. However, you might need more frequent cleaning if:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>You have pets that shed fur and dander</li>
        <li>Someone in your home suffers from allergies or asthma</li>
        <li>You've had a mold problem or water damage</li>
        <li>You live in an area with high pollution or construction</li>
        <li>You notice any of the signs mentioned above</li>
      </ul>
      <p class="mb-4">Professional air duct cleaning by Pure Air California involves a thorough cleaning of all components of your forced air system, including supply and return air ducts, registers, grilles, diffusers, heat exchangers, heating and cooling coils, condensate drain pans, and the air handling unit housing.</p>
      <h2 class="text-2xl font-heading font-semibold mb-4 mt-8">Benefits of Regular Air Duct Cleaning</h2>
      <p class="mb-4">Investing in regular air duct cleaning offers numerous benefits:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Improved indoor air quality</li>
        <li>Reduced allergens and irritants</li>
        <li>Elimination of musty odors</li>
        <li>Enhanced HVAC efficiency</li>
        <li>Lower energy bills</li>
        <li>Extended HVAC system lifespan</li>
      </ul>
      <p class="mb-4">By addressing these signs early and scheduling professional air duct cleaning, you can ensure your home maintains optimal air quality and your HVAC system operates at peak efficiency. Contact Pure Air California today for a thorough inspection and cleaning of your air duct system.</p>`,
    author: "Michael Rodriguez",
    date: "May 8, 2023",
    image: "https://images.unsplash.com/photo-1551639325-8f2e71afa1fc",
    category: "Residential"
  },
  "clean-air-ducts-allergy-relief": {
    title: "How Clean Air Ducts Improve Indoor Air Quality for Allergy Sufferers",
    content: `<p class="mb-4">For the millions of Americans who suffer from allergies, finding relief can be a constant struggle. While many focus on visible dust and dander, one often overlooked contributor to indoor allergens is your air duct system. In this article, we'll explore how professional air duct cleaning can significantly reduce allergy symptoms and create a healthier home environment.</p>
      <h2 class="text-2xl font-heading font-semibold mb-4 mt-8">The Allergy-Air Duct Connection</h2>
      <p class="mb-4">Your home's air ducts serve as the respiratory system of your living space, circulating air throughout every room. Unfortunately, they can also become collection points for common allergens:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Dust mites and their waste products</li>
        <li>Pet dander</li>
        <li>Pollen from trees, grasses, and flowers</li>
        <li>Mold spores and bacteria</li>
        <li>Insect remains</li>
      </ul>
      <p class="mb-4">When your HVAC system runs, these allergens can be distributed throughout your home, triggering symptoms in sensitive individuals. For those with asthma or severe allergies, this continuous exposure can lead to chronic discomfort and health issues.</p>
      <h2 class="text-2xl font-heading font-semibold mb-4 mt-8">Common Allergy Symptoms Related to Poor Indoor Air Quality</h2>
      <p class="mb-4">Many allergy sufferers experience worse symptoms indoors than outdoors, which often points to air quality issues within the home. Common symptoms include:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Sneezing and runny nose</li>
        <li>Itchy, watery eyes</li>
        <li>Coughing and throat irritation</li>
        <li>Skin rashes or hives</li>
        <li>Headaches</li>
        <li>Fatigue</li>
        <li>Difficulty breathing or wheezing</li>
      </ul>
      <p class="mb-4">If you notice these symptoms worsening when you're at home or when your heating or cooling system is running, contaminated air ducts could be contributing to your discomfort.</p>
      <h2 class="text-2xl font-heading font-semibold mb-4 mt-8">How Professional Air Duct Cleaning Helps</h2>
      <p class="mb-4">Professional air duct cleaning removes accumulated allergens from your entire HVAC system. Here's how this process benefits allergy sufferers:</p>
      <h3 class="text-xl font-heading font-medium mb-2 mt-4">1. Removal of Allergen Reservoirs</h3>
      <p class="mb-4">Over time, your air ducts can collect pounds of dust and allergens. Professional cleaning removes these reservoirs, preventing them from being circulated throughout your home. This is especially important in older homes or properties that haven't had duct cleaning services in many years.</p>
      <h3 class="text-xl font-heading font-medium mb-2 mt-4">2. Elimination of Mold and Bacteria</h3>
      <p class="mb-4">Moisture in air ducts can lead to mold growth, which releases spores that trigger allergic reactions and respiratory issues. Professional cleaning not only removes existing mold but can also include antimicrobial treatments to prevent future growth.</p>
      <h3 class="text-xl font-heading font-medium mb-2 mt-4">3. Reduced Dust Circulation</h3>
      <p class="mb-4">Clean air ducts mean less dust being circulated and settling on surfaces throughout your home. This reduces the overall allergen load and means less frequent dusting and cleaning are needed to maintain good air quality.</p>
      <h3 class="text-xl font-heading font-medium mb-2 mt-4">4. Improved HVAC Efficiency</h3>
      <p class="mb-4">Clean ducts allow your HVAC system to work more efficiently, providing better air filtration and temperature control. This creates a more comfortable environment and can extend the life of your air filters, further improving air quality.</p>
      <h2 class="text-2xl font-heading font-semibold mb-4 mt-8">Real Results for Allergy Sufferers</h2>
      <p class="mb-4">Many of our clients report significant improvement in their allergy symptoms after professional air duct cleaning. For example, Jennifer from Beverly Hills shared: "After years of struggling with indoor allergies, I was amazed at how much better I felt just days after Pure Air California cleaned our air ducts. The constant sneezing and itchy eyes I experienced at home have virtually disappeared."</p>
      <p class="mb-4">Research supports these experiences. Studies have shown that proper HVAC system maintenance, including regular air duct cleaning, can significantly reduce airborne allergens in indoor environments.</p>
      <h2 class="text-2xl font-heading font-semibold mb-4 mt-8">Additional Steps for Allergy Relief</h2>
      <p class="mb-4">While air duct cleaning is a powerful tool for improving indoor air quality, combining it with other strategies can provide even greater relief:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Use high-efficiency air filters (MERV 11 or higher) and change them regularly</li>
        <li>Consider installing a whole-home air purification system</li>
        <li>Maintain indoor humidity between 30-50% to discourage dust mite and mold growth</li>
        <li>Vacuum frequently using a HEPA-filtered vacuum cleaner</li>
        <li>Remove shoes at the door to prevent tracking in outdoor allergens</li>
        <li>Wash bedding weekly in hot water</li>
      </ul>
      <h2 class="text-2xl font-heading font-semibold mb-4 mt-8">When to Schedule Air Duct Cleaning for Allergies</h2>
      <p class="mb-4">For allergy sufferers, we recommend scheduling air duct cleaning:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Before allergy season begins (typically early spring in Los Angeles)</li>
        <li>After home renovations or construction projects</li>
        <li>When moving into a new home</li>
        <li>Every 2-3 years for maintenance (more frequently for severe allergy sufferers)</li>
      </ul>
      <p class="mb-4">By prioritizing clean air ducts, you're making a significant investment in your health and comfort. If you're ready to breathe easier and experience relief from indoor allergies, contact Pure Air California today for a professional air duct inspection and cleaning service tailored to your needs.</p>`,
    author: "Dr. Sarah Johnson",
    date: "April 22, 2023",
    image: "https://images.unsplash.com/photo-1597345637412-9fd611e758e4",
    category: "Health Benefits"
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="mb-8">The article you're looking for doesn't exist or has been moved.</p>
            <Button asChild>
              <Link to="/blog">Return to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{post.title} | Pure Air California Blog</title>
        <meta name="description" content={post.content.substring(0, 160).replace(/<[^>]*>/g, '')} />
        <meta name="keywords" content={`air duct cleaning, ${post.category.toLowerCase()}, indoor air quality, pure air california, los angeles, ${post.title.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').split(' ').join(', ')}`} />
      </Helmet>
      
      <NavBar />
      
      {/* Featured Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <span className="bg-[#5BBDE4] text-white text-sm font-medium px-3 py-1 rounded">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4 mb-2 font-heading">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <UserIcon size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon size={16} />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <Link to="/blog" className="flex items-center gap-2 text-[#0A3D7C] font-medium hover:underline mb-6">
                  <ArrowLeftIcon size={16} />
                  Back to Blog
                </Link>
                
                <div 
                  className="prose max-w-none lg:prose-lg prose-headings:font-heading prose-headings:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                <div className="border-t border-gray-200 mt-8 pt-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <span className="text-gray-600">Share this article:</span>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="icon" className="rounded-full w-8 h-8 p-0">
                          <FacebookIcon size={16} />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full w-8 h-8 p-0">
                          <TwitterIcon size={16} />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full w-8 h-8 p-0">
                          <LinkedinIcon size={16} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <span className="text-gray-500 text-lg font-semibold">{post.author.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium">{post.author}</div>
                        <div className="text-sm text-gray-500">Author</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <QuoteForm />
                
                <div className="bg-[#0A3D7C] bg-opacity-5 rounded-xl p-6">
                  <h3 className="font-heading font-semibold text-xl mb-4">Related Articles</h3>
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
                          src="https://images.unsplash.com/photo-1631392561719-acb5c75c3ad5" 
                          alt="HVAC efficiency" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm hover:text-[#0A3D7C] transition">
                          <Link to="/blog/hvac-efficiency-clean-air-ducts-save-money">
                            HVAC Efficiency: How Clean Air Ducts Save You Money
                          </Link>
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <CalendarIcon size={12} />
                          <span>March 3, 2023</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12" 
                          alt="Air duct cleaning process" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm hover:text-[#0A3D7C] transition">
                          <Link to="/blog/air-duct-cleaning-process-what-to-expect">
                            The Air Duct Cleaning Process: What to Expect
                          </Link>
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <CalendarIcon size={12} />
                          <span>February 18, 2023</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/blog">View All Articles</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#0A3D7C] to-[#5BBDE4] rounded-xl p-6 text-white">
                  <h3 className="font-heading font-semibold text-xl mb-4">Breathe Cleaner Air Today</h3>
                  <p className="mb-6">Schedule your professional air duct cleaning service and experience the difference in your indoor air quality.</p>
                  <Button asChild size="lg" className="w-full bg-white text-[#0A3D7C] hover:bg-gray-100">
                    <Link to="/quote">Get a Free Quote</Link>
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

export default BlogPost;
