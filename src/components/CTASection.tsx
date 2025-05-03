const CTASection = () => {
  return (
    <div className="bg-black py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Experience Cleaner, Healthier Air?</h2>
        <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
          Schedule your professional air duct or dryer vent cleaning today and breathe easier tomorrow.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
          <Link
            to="/quote"
            className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-colors"
          >
            Get a Free Quote
          </Link>
          <a
            href="tel:2137924145"
            className="bg-yellow-400 text-black hover:bg-yellow-300 px-8 py-4 rounded-full text-lg font-semibold transition-colors"
          >
            Call (213) 792-4145
          </a>
        </div>
        <div className="mt-2">
          <span className="text-white font-bold text-lg">100% Satisfaction Guaranteed</span>
        </div>
      </div>
    </div>
  );
}; 