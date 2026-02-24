const fs = require('fs');

const campaigns = [
    {
        name: "Search - Residential Duct Cleaning",
        budget: 12.00,
        adGroup: "Air Duct Cleaning Los Angeles",
        keywords: ["air duct cleaning los angeles", "residential air duct cleaning", "air duct cleaning near me"],
        ad: {
            h1: "Top Air Duct Cleaning LA", h2: "Pure Air California", h3: "Breathe Cleaner Air Today", h4: "NADCA Certified Experts", h5: "Improve Indoor Air Quality",
            d1: "Professional air duct cleaning in Los Angeles. Free estimates!", d2: "Remove dust and allergens from your home HVAC system.", d3: "Licensed and insured technicians ready to help you.", d4: "Schedule your air duct cleaning service today.",
            p1: "Air-Duct", p2: "Cleaning", url: "https://www.pureaircalifornia.com/services/residential-air-duct-cleaning"
        },
        negatives: ["cheap", "diy", "jobs", "hiring", "how to", "equipment", "machine"]
    },
    {
        name: "Search - Commercial Duct Cleaning",
        budget: 5.00,
        adGroup: "Commercial Air Duct Cleaning",
        keywords: ["commercial air duct cleaning", "office air duct cleaning"],
        ad: {
            h1: "Commercial Air Duct Cleaning", h2: "Pure Air California LA", h3: "Expert Office Duct Cleaning", h4: "Improve Indoor Air Quality", h5: "NADCA Certified Professionals",
            d1: "Professional air duct cleaning for LA businesses and offices.", d2: "Reduce allergens and improve energy efficiency in your building.", d3: "Licensed and insured commercial duct cleaning experts.", d4: "Get a free estimate for your commercial property today.",
            p1: "Commercial", p2: "Duct-Cleaning", url: "https://www.pureaircalifornia.com/services/commercial-air-duct-cleaning"
        },
        negatives: ["cheap", "diy", "jobs", "how to"]
    },
    {
        name: "Search - Residential Dryer Vent",
        budget: 2.00,
        adGroup: "Dryer Vent Cleaning LA",
        keywords: ["dryer vent cleaning los angeles"],
        ad: {
            h1: "Prevent Dryer Fires Today", h2: "Dryer Vent Cleaning LA", h3: "Pure Air California", h4: "Expert Dryer Vent Cleaners", h5: "Improve Dryer Efficiency",
            d1: "Professional dryer vent cleaning to prevent fire hazards.", d2: "Speed up drying times and save on energy bills today.", d3: "Certified technicians serving all of Los Angeles.", d4: "Schedule your residential dryer vent cleaning securely online.",
            p1: "Dryer-Vent", p2: "Cleaning", url: "https://www.pureaircalifornia.com/services/residential-dryer-vent-cleaning"
        },
        negatives: ["cheap", "diy", "do it yourself"]
    },
    {
        name: "Search - Commercial Dryer Vent",
        budget: 2.00,
        adGroup: "Commercial Dryer Vent Cleaning",
        keywords: ["commercial dryer vent cleaning"],
        ad: {
            h1: "Commercial Dryer Vent Cleaning", h2: "Pure Air California", h3: "Prevent Fire Hazards Today", h4: "Laundromat Vent Cleaners", h5: "Expert Vent Maintenance",
            d1: "Protect your commercial property with expert dryer vent cleaning.", d2: "Serving laundromats and multi-family housing in Los Angeles.", d3: "Licensed and insured technicians for commercial properties.", d4: "Contact us today for a free commercial vent cleaning quote.",
            p1: "Commercial", p2: "Dryer-Vent", url: "https://www.pureaircalifornia.com/services/commercial-dryer-vent-cleaning"
        },
        negatives: ["cheap", "jobs"]
    },
    {
        name: "Search - Electrostatic Filters",
        budget: 2.00,
        adGroup: "Electrostatic Filter Install",
        keywords: ["electrostatic air filter installation", "electrostatic air filters"],
        ad: {
            h1: "Install Electrostatic Filters", h2: "Pure Air California", h3: "Superior Indoor Air Quality", h4: "Advanced Air Filtration", h5: "Breathe Easier At Home",
            d1: "Upgrade your home with a permanent electrostatic air filter.", d2: "Washable filters that capture up to 95% of airborne particles.", d3: "Stop buying disposable filters and save money long-term.", d4: "Request your professional electrostatic filter installation.",
            p1: "Air-Filters", p2: "Electrostatic", url: "https://www.pureaircalifornia.com/services/residential-electrostatic-filter"
        },
        negatives: []
    },
    {
        name: "Search - HVAC Cleaning",
        budget: 10.00,
        adGroup: "HVAC System Cleaning",
        keywords: ["hvac cleaning los angeles", "hvac system cleaning"],
        ad: {
            h1: "HVAC System Cleaning LA", h2: "Pure Air California", h3: "Complete HVAC Maintenance", h4: "Improve Energy Efficiency", h5: "Certified HVAC Cleaners",
            d1: "Comprehensive heating and cooling system cleaning in LA.", d2: "Restore peak performance and lower your energy bills.", d3: "Expert cleaning of coils blowers and ductwork systems.", d4: "Schedule your full HVAC system cleaning service today.",
            p1: "HVAC", p2: "Cleaning", url: "https://www.pureaircalifornia.com/services/hvac-system-cleaning"
        },
        negatives: ["repair", "installation", "parts", "diy"]
    }
];

const sitelinks = [
    { text: "Air Duct Cleaning", url: "https://www.pureaircalifornia.com/services/residential-air-duct-cleaning" },
    { text: "Commercial Air Ducts", url: "https://www.pureaircalifornia.com/services/commercial-air-duct-cleaning" },
    { text: "Dryer Vent Cleaning", url: "https://www.pureaircalifornia.com/services/residential-dryer-vent-cleaning" },
    { text: "Commercial Dryer Vent", url: "https://www.pureaircalifornia.com/services/commercial-dryer-vent-cleaning" },
    { text: "HVAC System Cleaning", url: "https://www.pureaircalifornia.com/services/hvac-system-cleaning" },
    { text: "Electrostatic Filters", url: "https://www.pureaircalifornia.com/services/residential-electrostatic-filter" },
    { text: "Service Areas", url: "https://www.pureaircalifornia.com/locations" }
];

const callouts = ["Free Estimates", "NADCA Certified", "Fully Insured", "5-Star Reviews"];

// Using an array-based builder to mathematically guarantee flawless comma placement and prevent ANY syntax errors.
const headers = [
    "Campaign", "Ad Group", "Keyword", "Budget", "Political ads policy", "Location", "Headline 1", "Headline 2", "Headline 3", "Headline 4", "Headline 5",
    "Description 1", "Description 2", "Description 3", "Description 4", "Path 1", "Path 2", "Final URL",
    "Sitelink text", "Sitelink final URL", "Callout text", "Phone number", "Country code",
    "Structured snippet header", "Structured snippet value 1", "Structured snippet value 2", "Structured snippet value 3",
    "Promotion item", "Promotion discount"
];

let csv = headers.join(",") + "\n";

const createRow = (dataMap) => {
    const row = new Array(headers.length).fill("");
    for (const [key, value] of Object.entries(dataMap)) {
        const idx = headers.indexOf(key);
        if (idx !== -1 && value) {
            row[idx] = `"${value}"`;
        }
    }
    return row.join(",") + "\n";
};

campaigns.forEach(c => {
    // Campaign Settings Row
    csv += createRow({
        "Campaign": c.name,
        "Budget": c.budget.toString(),
        "Political ads policy": "Not applicable"
    });

    // Explicit Location Targeting
    const locations = [
        "Los Angeles", "Beverly Hills", "Glendale", "Malibu", "Century City", "Hollywood", "Downtown LA",
        "Ventura", "Pasadena", "Burbank", "Studio City", "Encino", "Tarzana", "Reseda", "Canoga Park",
        "Woodland Hills", "Calabasas", "Valley Village", "Van Nuys", "Panorama City", "Northridge",
        "Sun Valley", "Central LA", "Pacific Palisades", "Brentwood", "Los Feliz", "Culver City",
        "West Hollywood", "Chatsworth", "Laurel Canyon", "Fairfax", "Larchmont", "Koreatown",
        "West LA", "Westwood", "North of Montana", "Sawtelle", "Beverly Glen", "Mid-Wilshire",
        "Sherman Oaks", "Encino Village", "Lake Balboa", "Valley Glen", "Magnolia Park", "Toluca Lake",
        "Sherwood Forest", "Winnetka", "Granada Hills", "Mission Hills", "Porter Ranch", "North Hollywood",
        "Sepulveda Basin", "Hidden Hills", "Deer Lake Highlands"
    ];

    locations.forEach(loc => {
        csv += createRow({ "Campaign": c.name, "Location": loc });
    });

    // Ads
    csv += createRow({
        "Campaign": c.name, "Ad Group": c.adGroup,
        "Headline 1": c.ad.h1, "Headline 2": c.ad.h2, "Headline 3": c.ad.h3, "Headline 4": c.ad.h4, "Headline 5": c.ad.h5,
        "Description 1": c.ad.d1, "Description 2": c.ad.d2, "Description 3": c.ad.d3, "Description 4": c.ad.d4,
        "Path 1": c.ad.p1, "Path 2": c.ad.p2, "Final URL": c.ad.url
    });

    // Keywords (Using pure Power-Posting Native formatting: [] for Exact, """""" for Phrase)
    c.keywords.forEach(kw => {
        csv += createRow({ "Campaign": c.name, "Ad Group": c.adGroup, "Keyword": `[${kw}]` });
        csv += createRow({ "Campaign": c.name, "Ad Group": c.adGroup, "Keyword": `"""${kw}"""` });
    });

    // Negative Keywords (Pure power-posting prefix without Ad Group maps it as Campaign Negative)
    c.negatives.forEach(neg => {
        csv += createRow({ "Campaign": c.name, "Keyword": `-${neg}` });
    });

    // Sitelinks
    sitelinks.forEach(sl => {
        csv += createRow({ "Campaign": c.name, "Sitelink text": sl.text, "Sitelink final URL": sl.url });
    });

    // Callouts
    callouts.forEach(co => {
        csv += createRow({ "Campaign": c.name, "Callout text": co });
    });

    // Phone Call Extension
    csv += createRow({ "Campaign": c.name, "Phone number": "(213) 792-4145", "Country code": "US" });

    // Snippets
    csv += createRow({ "Campaign": c.name, "Structured snippet header": "Service catalog", "Structured snippet value 1": "Air Duct Cleaning", "Structured snippet value 2": "Dryer Vent Cleaning", "Structured snippet value 3": "HVAC System Cleaning" });
    csv += createRow({ "Campaign": c.name, "Structured snippet header": "Amenities", "Structured snippet value 1": "Free Quotes", "Structured snippet value 2": "Fast Service", "Structured snippet value 3": "Award Winning" });

    // Promotion
    csv += createRow({ "Campaign": c.name, "Promotion item": "Air Duct Cleaning", "Promotion discount": "15% Off" });
});

fs.writeFileSync('C:\\\\Users\\\\IMAGINE360\\\\Documents\\\\PAC\\\\Website\\\\pureaircaliforniawebsite\\\\google_ads_editor_plan.csv', csv);
console.log('CSV regenerated successfully!');
