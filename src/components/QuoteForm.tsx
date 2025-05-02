
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const QuoteForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    propertyType: '',
    serviceType: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // In a real app, you'd send this data to your backend
    // For now, we'll just show a success message
    toast({
      title: "Quote request submitted!",
      description: "We'll contact you shortly with your personalized quote.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      propertyType: '',
      serviceType: '',
      message: '',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
      <h3 className="text-2xl font-heading font-semibold mb-6">Get Your Free Quote</h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name*
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address*
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number*
            </label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(310) 555-1234"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Address*
            </label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your address in Los Angeles"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="propertyType" className="text-sm font-medium">
              Property Type*
            </label>
            <Select 
              value={formData.propertyType}
              onValueChange={(value) => handleSelectChange('propertyType', value)}
            >
              <SelectTrigger id="propertyType" name="propertyType">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="apartment">Apartment/Condo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="serviceType" className="text-sm font-medium">
              Service Needed*
            </label>
            <Select 
              value={formData.serviceType}
              onValueChange={(value) => handleSelectChange('serviceType', value)}
            >
              <SelectTrigger id="serviceType" name="serviceType">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="air-duct-cleaning">Air Duct Cleaning</SelectItem>
                <SelectItem value="dryer-vent-cleaning">Dryer Vent Cleaning</SelectItem>
                <SelectItem value="hvac-cleaning">HVAC System Cleaning</SelectItem>
                <SelectItem value="residential-and-commercial">Both Residential & Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Additional Details
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your needs..."
            rows={4}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          Get My Free Quote
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you consent to be contacted about our services.
        </p>
      </form>
    </div>
  );
};

export default QuoteForm;
