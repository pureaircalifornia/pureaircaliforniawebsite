# Google Tag Manager Setup Guide for Pure Air California

## Overview
This guide explains how to configure Google Tag Manager (GTM-P3JTN355) with the dataLayer events already implemented in your website code.

---

## Prerequisites

Before starting, ensure you have:
1. Google Tag Manager access (GTM-P3JTN355)
2. Google Ads account with conversion tracking enabled
3. Google Analytics 4 property (optional but recommended)

---

## Quick Setup Checklist

- [ ] Create Data Layer Variables
- [ ] Create Custom Event Triggers  
- [ ] Create Google Analytics 4 Tag
- [ ] Create Google Ads Conversion Tag (Lead Form)
- [ ] Create Google Ads Conversion Tag (Phone Call)
- [ ] Create Google Ads Remarketing Tag
- [ ] Publish Container

---

## Step 1: Create Data Layer Variables

In GTM, go to **Variables → User-Defined Variables → New**

### Required Variables:

| Variable Name | Variable Type | Data Layer Variable Name |
|---------------|---------------|--------------------------|
| DLV - Form Type | Data Layer Variable | `form_type` |
| DLV - Service Type | Data Layer Variable | `service_type` |
| DLV - Property Type | Data Layer Variable | `property_type` |
| DLV - Lead Value | Data Layer Variable | `value` |
| DLV - Phone Location | Data Layer Variable | `click_location` |
| DLV - Scroll Percentage | Data Layer Variable | `scroll_percentage` |
| DLV - Page Path | Data Layer Variable | `page_path` |
| DLV - AB Variant | Data Layer Variable | `ab_variant` |

---

## Step 2: Create Custom Event Triggers

In GTM, go to **Triggers → New**

### Lead Form Submission Trigger
- **Name:** CE - Form Submission
- **Type:** Custom Event
- **Event name:** `form_submission`
- **Fire on:** All Custom Events

### Phone Click Trigger
- **Name:** CE - Phone Click
- **Type:** Custom Event
- **Event name:** `phone_click`
- **Fire on:** All Custom Events

### Page View Trigger
- **Name:** CE - Page View
- **Type:** Custom Event
- **Event name:** `page_view`
- **Fire on:** All Custom Events

### Scroll Depth Trigger
- **Name:** CE - Scroll Depth
- **Type:** Custom Event
- **Event name:** `scroll_depth`
- **Fire on:** All Custom Events

### Generate Lead Trigger
- **Name:** CE - Generate Lead
- **Type:** Custom Event
- **Event name:** `generate_lead`
- **Fire on:** All Custom Events

---

## Step 3: Google Analytics 4 Configuration

### GA4 Configuration Tag
1. **Tags → New → Google Analytics: GA4 Configuration**
2. **Measurement ID:** Your GA4 ID (e.g., G-XXXXXXXXXX)
3. **Trigger:** All Pages

### GA4 Event - Form Submission
1. **Tags → New → Google Analytics: GA4 Event**
2. **Event Name:** `generate_lead`
3. **Parameters:**
   - `form_type`: {{DLV - Form Type}}
   - `service_type`: {{DLV - Service Type}}
   - `value`: {{DLV - Lead Value}}
4. **Trigger:** CE - Generate Lead

### GA4 Event - Phone Click
1. **Tags → New → Google Analytics: GA4 Event**
2. **Event Name:** `phone_click`
3. **Parameters:**
   - `click_location`: {{DLV - Phone Location}}
4. **Trigger:** CE - Phone Click

---

## Step 4: Google Ads Conversion Tags

### Primary Conversion: Lead Form Submission

> [!IMPORTANT]
> Replace `AW-XXXXXXXXX` with your actual Google Ads Conversion ID and label from Google Ads → Tools & Settings → Conversions.

1. **Tags → New → Google Ads Conversion Tracking**
2. **Conversion ID:** `AW-XXXXXXXXX` (your ID)
3. **Conversion Label:** `xxxxxx` (your label)
4. **Conversion Value:** {{DLV - Lead Value}}
5. **Transaction ID:** (leave blank)
6. **Currency Code:** USD
7. **Trigger:** CE - Form Submission

### Secondary Conversion: Phone Call Click

1. **Tags → New → Google Ads Conversion Tracking**
2. **Conversion ID:** `AW-XXXXXXXXX` (your ID)
3. **Conversion Label:** `xxxxxx` (create new conversion for phone calls)
4. **Trigger:** CE - Phone Click

---

## Step 5: Google Ads Remarketing Tag

1. **Tags → New → Google Ads Remarketing**
2. **Conversion ID:** `AW-XXXXXXXXX` (your ID)
3. **Trigger:** All Pages

### Enhanced Remarketing Audiences

Create audiences in Google Ads for:
- **All Visitors** - Everyone who visited
- **Quote Page Visitors** - Visited /quote page
- **Form Starters** - Triggered `form_step` event
- **High Engagement** - Scroll depth 75%+

---

## Step 6: Testing & Debugging

### GTM Preview Mode
1. Click **Preview** in GTM
2. Enter your website URL
3. Navigate through your site
4. Verify events fire in the debug panel

### Browser Console Testing
Open browser DevTools (F12) and type:
```javascript
// View all dataLayer events
console.log(dataLayer);

// Monitor new events
dataLayer.push = function(e) { console.log('dataLayer:', e); Array.prototype.push.call(dataLayer, e); };
```

### Google Tag Assistant
1. Install [Google Tag Assistant](https://tagassistant.google.com/)
2. Navigate to your site
3. Verify tags fire correctly

---

## Events Reference

| Event | Purpose | Key Parameters |
|-------|---------|----------------|
| `page_view` | Track page visits | page_path, page_title |
| `generate_lead` | GA4 lead event | form_type, service_type, value |
| `form_submission` | Google Ads conversion | form_name, conversion_type |
| `phone_click` | Phone call tracking | click_location, phone_number |
| `cta_click` | Button click tracking | cta_name, destination_url |
| `scroll_depth` | Engagement tracking | scroll_percentage |
| `form_step` | Funnel tracking | step_number, step_name |

---

## Optimization Tips

### Smart Bidding
- Use **Target CPA** or **Maximize Conversions** bidding
- Include lead values for value-based bidding
- Allow 2-4 weeks learning period

### Audience Strategy
- Exclude converters from prospecting campaigns
- Create lookalike audiences from converters
- Retarget high-engagement visitors (75%+ scroll)

### Conversion Window
- Primary conversions: 30-day click, 7-day view
- Phone calls: 30-day click-through

---

## Support

For questions about:
- **GTM Configuration:** Refer to [GTM Help Center](https://support.google.com/tagmanager)
- **Google Ads Conversions:** [Ads Help Center](https://support.google.com/google-ads/answer/6095821)
- **GA4 Events:** [GA4 Documentation](https://support.google.com/analytics/answer/9322688)
