# Pure Air California Website

A premium, high-end website for Pure Air California, a professional air duct and dryer vent cleaning service in Los Angeles, CA.

## Features

- Modern, responsive design with premium animations
- Interactive Google Maps integration for service areas
- Framer Motion animations for a high-end user experience
- 6-point "Why Choose Us" section highlighting company benefits
- Environmental focus with eco-friendly messaging

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/breathe-pure-california-air.git
cd breathe-pure-california-air
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
Create a `.env` file in the root directory and add your Google Maps API key:
```
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Key Features

### Interactive Map
The service area map uses Google Maps API to display service areas with interactive markers. To ensure it works properly:
- Provide a valid Google Maps API key in the `.env` file
- The map will automatically center on Los Angeles with service area markers
- Clicking on a service area in the list highlights it on the map

### Premium Animations
The site uses Framer Motion for smooth, high-end animations:
- Scroll-triggered animations for content sections
- Hover effects on interactive elements
- Page transitions between routes

### Responsive Design
The site is fully responsive and optimized for:
- Mobile devices
- Tablets
- Desktop computers

## Troubleshooting

### Google Maps Not Loading
If the Google Maps integration isn't loading:
1. Check that your API key is valid and has the correct permissions
2. Ensure JavaScript is enabled in your browser
3. Check browser console for errors

### Animation Performance
If animations seem sluggish on mobile:
1. The site automatically reduces animation complexity on lower-end devices
2. Consider setting `enableAuto` to `true` in the motion provider for better performance

## Contact

For any issues or questions, please contact:
- Email: info@pureaircalifornia.com
- Phone: (213) 792-4145
