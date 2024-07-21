/**
 * These values can be referenced via {{ site.name }}
 */

// Figure our the baseURL (website address) depending on DEV/PROD status. No trailing slash.
const isDev = process.env.ELEVENTY_ENV === 'DEV';
const baseUrl = isDev ? `http://localhost:8080` : `https://www.example.com`;

// Export as {{ site.name }}
module.exports = {
    name: "11ty Starter Site",
    email: "",
    domain: baseUrl,
    language: "en",
    author: {
        name: "Anthony Ferguson",
        email: "anthony@ferguson.codes"
    },
    socials: {
        facebook: {
            'name': 'Facebook',
            'icon': 'fa-facebook',
            'link': 'https://www.facebook.com/',
        },
        instagram: {
            'name': 'Instagram',
            'icon': 'fa-instagram',
            'link': 'https://www.instagram.com/',
        },
        linkedin: {
            'name': 'LinkedIn',
            'icon': 'fa-linkedin',
            'link': 'https://www.linkedin.com/',
        },
        github: {
            'name': 'Github',
            'icon': 'fa-github',
            'link': 'https://www.github.com/',
        },
    }
};
