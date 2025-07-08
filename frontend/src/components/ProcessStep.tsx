
import { cn } from '@/lib/utils';

type ProcessStepProps = {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
  className?: string;
};

const ProcessStep = ({ number, title, description, isLast = false, className }: ProcessStepProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className="flex">
        <div className="flex flex-col items-center mr-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0A3D7C] text-white font-bold">
            {number}
          </div>
          {!isLast && (
            <div className="w-0.5 h-full bg-[#5BBDE4]/30 mt-3"></div>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessStep;
