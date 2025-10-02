npom# Website Issues Checklist

## 🚨 Critical Issues (Must Fix)

### 1. **Email Configuration**
- [ ] **EmailJS Setup**: All forms are using placeholder EmailJS credentials
  - Contact form: `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, `YOUR_USER_ID`
  - Quote form: Missing EmailJS implementation
  - Appointment scheduling: Missing EmailJS implementation
- [ ] **Email Address Inconsistency**: 
  - Some files use `info@pureairca.com`
  - Others use `info@pureaircalifornia.com`
  - Need to standardize on one domain

### 2. **Google Maps API**
- [ ] **Missing API Key**: ServiceAreaMap component requires `VITE_GOOGLE_MAPS_API_KEY` environment variable
- [ ] **API Key Configuration**: Need to add to `.env` file
- [ ] **Error Handling**: Multiple console.error statements for Google Maps failures

### 3. **Domain Configuration**
- [ ] **Inconsistent Domain References**:
  - Schema markup uses `https://www.pureaircalifornia.com`
  - Service pages use `https://pureairca.com`
  - Need to standardize domain across all files

### 4. **Business Information**
- [ ] **Placeholder Address**: `123 Main Street, Los Angeles, CA 90001` needs real address
- [ ] **Phone Number Format**: Inconsistent formatting (some with +1, some without)
- [ ] **Business Hours**: Verify if 8AM-8PM weekdays, 9AM-5PM weekends are correct

## ⚠️ Important Issues (Should Fix)

### 5. **Console Logging**
- [ ] **Remove Debug Logs**: Multiple console.log statements in production code
  - Quote.tsx: `console.log('Form submitted:', formData)`
  - Contact.tsx: `console.log('Email sent successfully:', response)`
  - ServiceAreaMap.tsx: Multiple console.error statements
  - QuoteForm.tsx: `console.log('Quote form submitted:', emailData)`

### 6. **Missing Service Pages**
- [ ] **Residential Air Duct Cleaning**: Only has basic page, needs full SEO content like other services
- [ ] **Commercial Dryer Vent Cleaning**: Only has basic page, needs full SEO content
- [ ] **Duplicate Files**: 
  - `commercial-dryer-vent-cleaning.tsx` (basic)
  - `CommercialDryerVentCleaning.tsx` (full)
  - `residential-dryer-vent-cleaning.tsx` (basic)
  - `ResidentialDryerVentCleaning.tsx` (full)

### 7. **Image Issues**
- [ ] **Missing Logo**: Schema markup references `https://www.pureaircalifornia.com/logo.png`
- [ ] **Placeholder Images**: TrustedBy component uses `/placeholder.svg`
- [ ] **Image Optimization**: Some images may need optimization for web

### 8. **SEO Issues**
- [ ] **Duplicate SEO Files**: `serviceSchema.ts` and `serviceSchemaNew.ts` - need to consolidate
- [ ] **Missing Meta Tags**: Some pages may be missing important meta tags
- [ ] **Canonical URLs**: Need to verify all canonical URLs are correct

## 🔧 Technical Issues (Nice to Fix)

### 9. **Code Quality**
- [ ] **React Hook Dependencies**: ServiceAreaMap useEffect missing dependency
- [ ] **Fast Refresh Warnings**: Multiple UI components have fast refresh warnings
- [ ] **TypeScript Types**: Some components could benefit from better type definitions

### 10. **Performance**
- [ ] **Bundle Size**: Large JavaScript bundle (626.74 kB) - consider code splitting
- [ ] **Image Loading**: Some images may benefit from lazy loading
- [ ] **Component Optimization**: Some components could be optimized for better performance

### 11. **Accessibility**
- [ ] **Alt Text**: Verify all images have proper alt text
- [ ] **ARIA Labels**: Check for missing ARIA labels on interactive elements
- [ ] **Keyboard Navigation**: Test keyboard navigation throughout the site

## 📝 Content Issues

### 12. **Content Consistency**
- [ ] **Service Descriptions**: Ensure all service descriptions are consistent and accurate
- [ ] **Pricing Information**: Verify all pricing information is current
- [ ] **Contact Information**: Ensure all contact information is consistent across pages

### 13. **Legal Pages**
- [ ] **Privacy Policy**: Missing privacy policy page
- [ ] **Terms of Service**: Missing terms of service page
- [ ] **Cookie Policy**: Missing cookie policy page (if using cookies)

### 14. **Blog Content**
- [ ] **Blog Post Images**: Some blog posts may need featured images
- [ ] **Blog SEO**: Verify all blog posts have proper SEO meta tags
- [ ] **Related Posts**: Ensure related posts functionality works correctly

## 🚀 Deployment Issues

### 15. **Environment Variables**
- [ ] **EmailJS Credentials**: Need to add to production environment
- [ ] **Google Maps API Key**: Need to add to production environment
- [ ] **Domain Configuration**: Need to configure for production domain

### 16. **404 Page**
- [ ] **Custom 404**: Current 404 page is basic, consider enhancing
- [ ] **Error Handling**: Need proper error boundaries for React components

## 📊 Analytics & Tracking

### 17. **Analytics Setup**
- [ ] **Google Analytics**: Missing Google Analytics setup
- [ ] **Conversion Tracking**: Missing conversion tracking for forms
- [ ] **Heatmap Tracking**: Consider adding heatmap tracking for UX insights

## 🔒 Security Issues

### 18. **Form Security**
- [ ] **CSRF Protection**: Forms may need CSRF protection
- [ ] **Input Validation**: Ensure all form inputs are properly validated
- [ ] **Rate Limiting**: Consider rate limiting for contact forms

## 📱 Mobile & Responsive

### 19. **Mobile Optimization**
- [ ] **Mobile Testing**: Test all pages on mobile devices
- [ ] **Touch Targets**: Ensure all clickable elements are properly sized for mobile
- [ ] **Mobile Forms**: Verify forms work well on mobile devices

## 🧪 Testing

### 20. **Testing Coverage**
- [ ] **Unit Tests**: Missing unit tests for components
- [ ] **Integration Tests**: Missing integration tests for forms
- [ ] **E2E Tests**: Missing end-to-end tests for critical user flows

---

## Priority Order:
1. **Critical Issues** (1-4): Must fix before launch
2. **Important Issues** (5-8): Should fix for better user experience
3. **Technical Issues** (9-11): Nice to fix for code quality
4. **Content Issues** (12-14): Important for SEO and user experience
5. **Deployment Issues** (15-16): Must fix for production
6. **Analytics & Security** (17-18): Important for business
7. **Mobile & Testing** (19-20): Important for user experience

## Estimated Time to Fix:
- **Critical Issues**: 2-3 days
- **Important Issues**: 3-4 days
- **Technical Issues**: 2-3 days
- **Content Issues**: 1-2 days
- **Deployment Issues**: 1 day
- **Analytics & Security**: 1-2 days
- **Mobile & Testing**: 2-3 days

**Total Estimated Time**: 12-18 days