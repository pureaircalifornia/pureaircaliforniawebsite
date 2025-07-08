# Email Setup Instructions for Pure Air California Website

## Overview

This document provides instructions on how to set up the email functionality for the contact forms on the Pure Air California website. The website uses EmailJS, a service that allows sending emails directly from client-side JavaScript without requiring a backend server.

## Prerequisites

1. An EmailJS account (free tier available at [https://www.emailjs.com/](https://www.emailjs.com/))
2. Access to the website codebase

## Setup Steps

### 1. Create an EmailJS Account

- Go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up for an account
- Verify your email address

### 2. Create an Email Service

- In your EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Follow the instructions to connect your email account
- Give your service a name (e.g., "Pure Air California Contact")
- Save the service

### 3. Create Email Templates

#### Contact Form Template

1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Name it "Contact Form"
4. Design your email template using the following variables:
   - `{{from_name}}` - The name of the person submitting the form
   - `{{from_email}}` - The email address of the person submitting the form
   - `{{phone}}` - The phone number of the person submitting the form
   - `{{message}}` - The message content
   - `{{subject}}` - The email subject
5. Save the template

#### Quote Form Template

1. Create another template named "Quote Request"
2. Design your email template using the following variables:
   - `{{name}}` - The name of the person requesting a quote
   - `{{email}}` - Their email address
   - `{{phone}}` - Their phone number
   - `{{service}}` - The service they're interested in
   - `{{property_type}}` - The type of property
   - `{{square_footage}}` - The square footage of the property
   - `{{address}}` - The service address
   - `{{message}}` - Additional notes
   - `{{preferred_date}}` - Their preferred service date
3. Save the template

### 4. Update the Website Code

The website code has been prepared with EmailJS integration, but you need to uncomment the code and add your specific IDs.

#### For the Contact Form (`src/pages/Contact.tsx`)

1. Open the file `src/pages/Contact.tsx`
2. Find the commented EmailJS code section (around line 40)
3. Uncomment the code by removing the `/*` at the beginning and `*/` at the end
4. Replace the following placeholders:
   - `'YOUR_SERVICE_ID'` - Your EmailJS service ID (e.g., 'service_abc123')
   - `'YOUR_TEMPLATE_ID'` - Your Contact Form template ID (e.g., 'template_xyz789')
   - `'YOUR_USER_ID'` - Your EmailJS public key (e.g., 'user_def456')
5. Remove the setTimeout code block that simulates the API call

#### For the Quote Form (`src/components/QuoteForm.tsx`)

1. Open the file `src/components/QuoteForm.tsx`
2. Find the handleSubmit function (around line 54)
3. Replace the console.log and alert with EmailJS code similar to the Contact form:

```javascript
import emailjs from '@emailjs/browser';

// In the handleSubmit function, replace the console.log and alert with:
emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  emailData,
  'YOUR_USER_ID'
)
.then((response) => {
  console.log('Email sent successfully:', response);
  // Show success message
  alert('Thank you for your quote request! We will contact you shortly.');
  
  // Reset form
  setStep(1);
  setFormData({
    service: '',
    propertyType: '',
    squareFootage: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    preferredDate: '',
  });
})
.catch((error) => {
  console.error('Error sending email:', error);
  alert('There was a problem sending your request. Please try again later.');
});
```

#### For the Appointment Scheduling Form (`src/components/AppointmentScheduling.tsx`)

1. Open the file `src/components/AppointmentScheduling.tsx`
2. Find the handleSubmit function
3. Replace the console.log with EmailJS code similar to the other forms

### 5. Install Dependencies and Test

1. Run `npm install` to ensure the EmailJS dependency is installed
2. Start the development server with `npm run dev`
3. Test each form to ensure emails are being sent correctly

## Troubleshooting

- If emails are not being sent, check the browser console for errors
- Verify that your EmailJS service is active and properly configured
- Ensure you've entered the correct service ID, template ID, and user ID
- Check that your email template variables match the data being sent

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Integration Guide](https://www.emailjs.com/docs/examples/reactjs/)