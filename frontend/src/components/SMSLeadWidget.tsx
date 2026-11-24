import { MessageSquareText } from 'lucide-react';
import { business } from '@/config/business';

/**
 * Lightweight native SMS link button (no framer-motion, no floating overlap).
 */
const SMSLeadWidget = () => {
  const defaultMessage =
    "Hi Pure Air California, I'd like to ask about an air duct or dryer vent cleaning estimate in Los Angeles.";

  return (
    <a
      href={`sms:${business.phoneE164}?&body=${encodeURIComponent(defaultMessage)}`}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a3d7c] text-white font-semibold text-sm hover:bg-[#12486a] transition-colors"
      aria-label={`Text Pure Air California at ${business.phone}`}
    >
      <MessageSquareText className="w-4 h-4" aria-hidden="true" />
      <span>Text {business.phone}</span>
    </a>
  );
};

export default SMSLeadWidget;
