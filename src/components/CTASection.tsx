const CTASection = () => {
  return (
    <div className="bg-brand-900 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Experience Cleaner Air?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Contact us today for a free consultation and quote.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/quote"
            className="bg-white text-brand-900 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-colors"
          >
            Get a Free Quote
          </Link>
          <a
            href="tel:2137924145"
            className="bg-brand-700 text-white hover:bg-brand-800 px-8 py-4 rounded-full text-lg font-semibold transition-colors"
          >
            Call (213) 792-4145
          </a>
        </div>
      </div>
    </div>
  );
}; 