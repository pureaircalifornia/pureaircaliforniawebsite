import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail } from 'lucide-react';

const AppointmentScheduling = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const availableTimes = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the email data object for the appointment request
    const emailData = {
      to_email: 'info@pureaircalifornia.com',
      service: formData.serviceType,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
      subject: `Appointment Request: ${formData.service} - ${formData.name}`
    };
    
    // In a real implementation, you would send this data using EmailJS
    // For now, we'll just log it to the console and show the confirmation
    console.log('Appointment scheduled:', emailData);
    
    // Move to confirmation step
    setStep(4);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Schedule Your Service</h2>
            <p className="text-gray-600">
              Book your air duct cleaning appointment online. Choose a convenient time
              and we'll take care of the rest.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12">
            <div className={`flex items-center ${step >= 1 ? 'text-brand-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-brand-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="ml-2">Service</span>
            </div>
            <div className={`flex items-center ${step >= 2 ? 'text-brand-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-brand-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2">Time</span>
            </div>
            <div className={`flex items-center ${step >= 3 ? 'text-brand-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-brand-600 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="ml-2">Details</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Select Service Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`p-4 border rounded-lg text-left ${
                      formData.serviceType === 'residential'
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-gray-200 hover:border-brand-600'
                    }`}
                    onClick={() => setFormData({ ...formData, serviceType: 'residential' })}
                  >
                    <h4 className="font-semibold">Residential Cleaning</h4>
                    <p className="text-sm text-gray-600">For homes and apartments</p>
                  </button>
                  <button
                    type="button"
                    className={`p-4 border rounded-lg text-left ${
                      formData.serviceType === 'commercial'
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-gray-200 hover:border-brand-600'
                    }`}
                    onClick={() => setFormData({ ...formData, serviceType: 'commercial' })}
                  >
                    <h4 className="font-semibold">Commercial Cleaning</h4>
                    <p className="text-sm text-gray-600">For businesses and offices</p>
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-brand-600 text-white px-6 py-2 rounded-full hover:bg-brand-700"
                    onClick={() => setStep(2)}
                    disabled={!formData.serviceType}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Choose Date & Time</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Time</label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="">Select a time</option>
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => setStep(1)}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    className="bg-brand-600 text-white px-6 py-2 rounded-full hover:bg-brand-700"
                    onClick={() => setStep(3)}
                    disabled={!formData.date || !formData.time}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Your Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Additional Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      rows={3}
                      placeholder="Any special instructions or concerns?"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => setStep(2)}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-600 text-white px-6 py-2 rounded-full hover:bg-brand-700"
                  >
                    Schedule Appointment
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Appointment Scheduled!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for booking with us. We'll send you a confirmation email
                  with all the details.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 text-left">
                  <h4 className="font-semibold mb-4">Appointment Details</h4>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span>{formData.date} at {formData.time}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{formData.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-400" />
                      <span>{formData.name}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default AppointmentScheduling;