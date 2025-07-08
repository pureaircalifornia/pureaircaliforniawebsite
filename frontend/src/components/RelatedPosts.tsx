import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const relatedPosts = [
  {
    title: "The Importance of Regular Air Duct Cleaning",
    slug: "importance-of-regular-air-duct-cleaning",
    excerpt: "Learn why regular air duct cleaning is essential for maintaining indoor air quality and HVAC efficiency...",
    category: "Maintenance"
  },
  {
    title: "Health Benefits of Air Duct Cleaning",
    slug: "health-benefits-air-duct-cleaning",
    excerpt: "Discover how clean air ducts can improve your family's health and well-being...",
    category: "Health Benefits"
  },
  {
    title: "Commercial Air Duct Cleaning Guide",
    slug: "commercial-air-duct-cleaning-guide",
    excerpt: "Best practices for maintaining commercial air duct systems and improving indoor air quality...",
    category: "Commercial"
  }
];

const RelatedPosts = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Card key={post.slug}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{post.excerpt}</p>
              <Link 
                to={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
              >
                Read More
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
