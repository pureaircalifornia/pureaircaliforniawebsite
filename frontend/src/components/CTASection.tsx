import { useLocation } from 'react-router-dom';
import { Link } from '@/components/CanonicalLink';
import { Button } from './ui/button';
import { ScrollReveal } from './ui/scroll-reveal';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { business } from '@/config/business';
import { quoteLink } from '@/utils/quoteContext.mjs';

const CTASection = () => {
  const { pathname, search } = useLocation();
  const estimateHref = quoteLink(pathname, search);

  return (
    <section className="py-20 bg-gradient-to-br from-[#0a529b] to-[#0A3D7C] text-white shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5" aria-hidden="true" />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white">
              Your Air, Clearly Cared For.
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Inspection-led air duct and dryer vent care across Greater Los Angeles. Written scope
              and final price confirmed before any work begins.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="xl" variant="white" className="font-semibold shadow-md">
                <Link to={estimateHref} className="flex items-center justify-center gap-2">
                  Get My Free Estimate <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-white text-white hover:bg-white/20 hover:text-white font-semibold shadow-md"
              >
                <a
                  href={business.phoneHref}
                  data-call-location="cta-section"
                  className="flex items-center justify-center gap-2"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Call {business.phone}
                </a>
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-white/85 text-sm">
              <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                Residential air ducts from $299 · Dryer vents from $149 · No hidden upsells
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;
