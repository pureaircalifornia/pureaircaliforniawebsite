const https = require('https');
const fs = require('fs');

const downloads = [
    { url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80', file: 'public/images/before-after/clean-air-vent.jpg' },
    { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', file: 'public/images/before-after/dirty-air-vent.jpg' },
    { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80', file: 'public/images/hero/about-hero-team-group.jpg' },
    { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80', file: 'public/images/hero/contact-hero-office-exterior.jpg' },
    { url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80', file: 'public/images/hero/homepage-hero-professional-cleaning.jpg' },
    { url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80', file: 'public/images/services/residential-air-duct-cleaning-progress.jpg' }
];

downloads.forEach(({ url, file }) => {
    https.get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
            https.get(res.headers.location, (res2) => {
                const fileStream = fs.createWriteStream(file);
                res2.pipe(fileStream);
            });
        } else {
            const fileStream = fs.createWriteStream(file);
            res.pipe(fileStream);
        }
    });
});
