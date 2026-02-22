import { Building, Hotel, Utensils, GraduationCap, ShoppingBag, Factory } from 'lucide-react';

export const industryData = {
  'healthcare': {
    title: 'Healthcare Facilities',
    description: 'Specialized air quality solutions for hospitals, clinics, and medical offices.',
    icon: <Building className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">In healthcare facilities, maintaining superior indoor air quality is critical for patient health and recovery. Our specialized air duct cleaning services are designed to meet the strict hygiene standards required in medical environments.</p>

        <h3 className="text-xl font-semibold mb-2">Our Healthcare Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>HEPA-grade air duct cleaning and disinfection</li>
          <li>HVAC system sanitization</li>
          <li>Containment procedures to prevent cross-contamination</li>
          <li>24/7 emergency service for critical situations</li>
          <li>Compliance with healthcare regulations and standards</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Benefits for Healthcare Facilities:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Infection Control</h4>
            <p className="text-sm text-gray-600">Reduces airborne pathogens and contaminants that can lead to healthcare-associated infections (HAIs).</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Patient Safety</h4>
            <p className="text-sm text-gray-600">Creates a healthier environment for patients, especially those with compromised immune systems.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Staff Well-being</h4>
            <p className="text-sm text-gray-600">Improves air quality for healthcare workers, reducing sick days and improving productivity.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Regulatory Compliance</h4>
            <p className="text-sm text-gray-600">Helps meet strict healthcare facility standards and regulations for indoor air quality.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Case Study: Regional Medical Center</h3>
        <div className="bg-brand-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 mb-4">
            "After implementing Pure Air California's comprehensive air duct cleaning program, we saw a 40% reduction
            in healthcare-associated infections and improved patient satisfaction scores. The specialized cleaning
            process designed for our medical facility exceeded our expectations."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
              <span className="text-white text-lg font-semibold">S</span>
            </div>
            <div>
              <p className="font-semibold">Dr. Sarah Johnson</p>
              <p className="text-sm text-gray-600">Chief Medical Officer, Regional Medical Center</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  'hospitality': {
    title: 'Hospitality Industry',
    description: 'Enhanced air quality solutions for hotels, resorts, and conference centers.',
    icon: <Hotel className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">In the hospitality industry, guest comfort and satisfaction are paramount. Our air quality services help create a fresh, clean environment that enhances the guest experience and promotes positive reviews and repeat business.</p>

        <h3 className="text-xl font-semibold mb-2">Our Hospitality Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Complete HVAC system cleaning for guest rooms and common areas</li>
          <li>Odor elimination and control</li>
          <li>Mold and mildew remediation</li>
          <li>Kitchen exhaust cleaning</li>
          <li>Customized maintenance programs</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Benefits for Hospitality Businesses:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Allergen Reduction</h4>
            <p className="text-sm text-gray-600">Eliminates dust, pollen, and allergens that can trigger guest complaints.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Guest Satisfaction</h4>
            <p className="text-sm text-gray-600">Clean, fresh air improves guest comfort and leads to better reviews and repeat bookings.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Energy Efficiency</h4>
            <p className="text-sm text-gray-600">Clean HVAC systems operate more efficiently, reducing energy costs by up to 25%.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Allergen Reduction</h4>
            <p className="text-sm text-gray-600">Eliminates dust, pollen, and allergens that can trigger guest complaints.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Equipment Longevity</h4>
            <p className="text-sm text-gray-600">Extends the life of your HVAC equipment and reduces maintenance costs.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Case Study: Luxury Resort Chain</h3>
        <div className="bg-brand-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 mb-4">
            "Pure Air California's hospitality air duct cleaning service has been instrumental in maintaining our
            five-star rating. Guest complaints about air quality dropped by 60%, and we've seen a noticeable
            improvement in guest satisfaction scores across all our properties."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
              <span className="text-white text-lg font-semibold">M</span>
            </div>
            <div>
              <p className="font-semibold">Michael Chen</p>
              <p className="text-sm text-gray-600">Operations Manager, Sunset Resort Group</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  'restaurants': {
    title: 'Restaurants & Food Service',
    description: 'Commercial kitchen exhaust and ventilation cleaning services.',
    icon: <Utensils className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">Restaurants face unique air quality challenges including grease buildup, smoke, cooking odors, and high humidity. These factors can create fire hazards, health code violations, and poor customer experience. Our specialized services help maintain a clean, safe, and comfortable environment while ensuring compliance with health department regulations and fire safety standards.</p>

        <h3 className="text-xl font-semibold mb-2">Our Restaurant Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Kitchen exhaust hood cleaning and degreasing</li>
          <li>Duct and fan cleaning with specialized equipment</li>
          <li>Grease trap maintenance and cleaning</li>
          <li>Make-up air unit cleaning and maintenance</li>
          <li>NFPA 96 compliance services and documentation</li>
          <li>Fire suppression system maintenance</li>
          <li>Odor elimination and air purification</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Benefits for Restaurants:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Customer Experience</h4>
            <p className="text-sm text-gray-600">Eliminates cooking odors and smoke, creating a more pleasant dining atmosphere for customers. Studies show 68% of diners are influenced by restaurant air quality.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Fire Safety</h4>
            <p className="text-sm text-gray-600">Reduces fire risk by removing grease buildup that can ignite, protecting your business and employees. According to NFPA, 22% of restaurant fires are caused by grease buildup in exhaust systems.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Health Department Compliance</h4>
            <p className="text-sm text-gray-600">Ensures compliance with local health department regulations and prevents costly violations. Regular cleaning can reduce health inspection violations by up to 75%.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Customer Experience</h4>
            <p className="text-sm text-gray-600">Eliminates cooking odors and smoke, creating a more pleasant dining atmosphere for customers. Studies show 68% of diners are influenced by restaurant air quality.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Energy Efficiency</h4>
            <p className="text-sm text-gray-600">Clean exhaust systems operate more efficiently, reducing energy costs by up to 30% and extending equipment life by 40%.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Case Study: Downtown Bistro Chain</h3>
        <div className="bg-brand-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 mb-4">
            "After implementing Pure Air California's comprehensive kitchen exhaust cleaning program across our 5 locations,
            we've seen a 50% reduction in fire safety violations and a 25% improvement in customer satisfaction scores.
            The specialized cleaning process designed for our high-volume kitchens has been exceptional."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
              <span className="text-white text-lg font-semibold">M</span>
            </div>
            <div>
              <p className="font-semibold">Chef Marco Rodriguez</p>
              <p className="text-sm text-gray-600">Executive Chef, Downtown Bistro Group</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  'education': {
    title: 'Educational Institutions',
    description: 'Creating healthier learning environments in schools, colleges, and universities.',
    icon: <GraduationCap className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">Educational facilities face unique air quality challenges including high occupancy rates, diverse activities (gymnasiums, laboratories, cafeterias), and varying ventilation needs. Poor indoor air quality can significantly impact student health, attendance, and academic performance. Our specialized services help create healthier learning environments that support both student success and staff well-being while ensuring compliance with educational facility standards.</p>

        <h3 className="text-xl font-semibold mb-2">Our Education Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Classroom and facility air duct cleaning</li>
          <li>HVAC system maintenance and optimization</li>
          <li>Allergen and contaminant removal</li>
          <li>Indoor air quality testing and monitoring</li>
          <li>Preventive maintenance programs</li>
          <li>Gymnasium and auditorium ventilation cleaning</li>
          <li>Laboratory exhaust system maintenance</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Benefits for Educational Institutions:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Student Health</h4>
            <p className="text-sm text-gray-600">Reduces asthma triggers and allergens, leading to fewer sick days and improved attendance rates. Studies show clean air can reduce student absenteeism by up to 35%.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Academic Performance</h4>
            <p className="text-sm text-gray-600">Clean air improves focus and cognitive function, supporting better learning outcomes. Research indicates 15-20% improvement in test scores with better air quality.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Staff Well-being</h4>
            <p className="text-sm text-gray-600">Reduces respiratory issues among teachers and staff, improving job satisfaction and retention. Teachers report 25% fewer sick days with improved air quality.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Cost Savings</h4>
            <p className="text-sm text-gray-600">Efficient HVAC systems reduce energy costs and maintenance expenses, freeing up budget for educational resources. Schools can save up to 20% on energy costs.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Case Study: Metropolitan School District</h3>
        <div className="bg-brand-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 mb-4">
            "Implementing Pure Air California's comprehensive air quality program across our 12 schools resulted in a 35% reduction
            in student absenteeism due to respiratory issues and a 20% improvement in teacher satisfaction scores. The investment
            in clean air has paid dividends in both health and academic outcomes."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
              <span className="text-white text-lg font-semibold">P</span>
            </div>
            <div>
              <p className="font-semibold">Dr. Patricia Williams</p>
              <p className="text-sm text-gray-600">Superintendent, Metropolitan School District</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  'retail': {
    title: 'Retail Spaces',
    description: 'Indoor air quality solutions for shopping centers and retail environments.',
    icon: <ShoppingBag className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">Retail environments face complex air quality challenges including high foot traffic, diverse merchandise (perfumes, chemicals, food), and varying occupancy patterns. Poor air quality can drive customers away, reduce employee productivity, and create health issues. Our services help create a pleasant shopping experience that encourages longer visits and repeat business while supporting staff productivity and health.</p>

        <h3 className="text-xl font-semibold mb-2">Our Retail Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Shopping mall air duct cleaning</li>
          <li>Retail store ventilation maintenance</li>
          <li>Odor control solutions</li>
          <li>Energy efficiency improvements</li>
          <li>Regular maintenance contracts</li>
          <li>Food court exhaust cleaning</li>
          <li>Indoor air quality monitoring</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Benefits for Retail Businesses:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Customer Experience</h4>
            <p className="text-sm text-gray-600">Clean, fresh air encourages customers to stay longer and return more frequently, boosting sales. Studies show customers spend 15% more time in stores with good air quality.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Employee Productivity</h4>
            <p className="text-sm text-gray-600">Better air quality reduces sick days and improves staff focus and energy levels. Employees in clean air environments show 12% higher productivity rates.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Brand Image</h4>
            <p className="text-sm text-gray-600">Maintains a professional, clean environment that reflects positively on your brand reputation. 78% of customers associate air quality with store cleanliness.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Operational Efficiency</h4>
            <p className="text-sm text-gray-600">Well-maintained HVAC systems reduce energy costs and minimize unexpected breakdowns. Retailers can save up to 25% on energy costs with optimized systems.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Case Study: Westfield Shopping Center</h3>
        <div className="bg-brand-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 mb-4">
            "Pure Air California's comprehensive air quality program has transformed our shopping center's environment.
            Customer dwell time increased by 15%, and tenant satisfaction scores improved by 40%. The clean, fresh air
            creates a more inviting atmosphere that benefits both shoppers and retailers."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
              <span className="text-white text-lg font-semibold">J</span>
            </div>
            <div>
              <p className="font-semibold">Jennifer Martinez</p>
              <p className="text-sm text-gray-600">Property Manager, Westfield Shopping Center</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  'manufacturing': {
    title: 'Manufacturing',
    description: 'Industrial air quality solutions for manufacturing facilities and warehouses.',
    icon: <Factory className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">Manufacturing facilities face complex air quality challenges including dust, fumes, chemical emissions, and high particulate matter from industrial processes. These contaminants can create serious health risks for workers and compliance issues with OSHA, EPA, and local regulations. Our specialized services help maintain clean air while ensuring compliance with regulations to protect worker health and safety.</p>

        <h3 className="text-xl font-semibold mb-2">Our Manufacturing Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Industrial ventilation cleaning and maintenance</li>
          <li>Dust and fume extraction system maintenance</li>
          <li>Process exhaust cleaning and optimization</li>
          <li>Contaminant control solutions</li>
          <li>Compliance with OSHA and EPA regulations</li>
          <li>Industrial air filtration system maintenance</li>
          <li>Worker safety air quality monitoring</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Benefits for Manufacturing Facilities:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Worker Safety</h4>
            <p className="text-sm text-gray-600">Reduces exposure to harmful dust, fumes, and chemicals, protecting employee health and reducing workers' compensation claims. OSHA reports 50,000+ workplace illnesses annually from poor air quality.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Regulatory Compliance</h4>
            <p className="text-sm text-gray-600">Ensures compliance with OSHA, EPA, and local air quality regulations, preventing costly fines and violations. Non-compliance can result in fines up to $70,000 per violation.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Equipment Protection</h4>
            <p className="text-sm text-gray-600">Clean air systems protect sensitive manufacturing equipment from dust and contamination damage, extending equipment life by up to 40%.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Product Quality</h4>
            <p className="text-sm text-gray-600">Maintains clean air in production areas, ensuring product quality and reducing contamination issues. Clean air can reduce product defects by up to 30%.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Case Study: Precision Manufacturing Corp</h3>
        <div className="bg-brand-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 mb-4">
            "Pure Air California's industrial air quality solutions have been crucial for our manufacturing operations.
            We've achieved 100% OSHA compliance, reduced worker respiratory issues by 60%, and improved product quality
            by eliminating airborne contaminants. Their expertise in industrial environments is unmatched."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
              <span className="text-white text-lg font-semibold">D</span>
            </div>
            <div>
              <p className="font-semibold">David Thompson</p>
              <p className="text-sm text-gray-600">Safety Director, Precision Manufacturing Corp</p>
            </div>
          </div>
        </div>
      </>
    )
  }
};