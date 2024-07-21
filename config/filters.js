const { DateTime } = require('luxon')
const markdownIt = require("markdown-it");
const Image = require("@11ty/eleventy-img");
const site = require('../src/data/site.js');




module.exports = {

    /**
     * Convert a URL to an Absolute URL
     */
    absoluteUrl: function (url) {
        return new URL(url, site.domain).href;
    },

    /** Given a local or remote image source, returns the absolute URL
     * to the image that will eventually get generated once the site is built.
     * @param {string} src The full path to the source image.
     * @param {null|number} width The width of the image whose URL we want to return.
     */
    imgAbsoluteUrl: async function (src, width = null) {
        const imageOptions = {
            // We only need the original width and format
            widths: [width],
            formats: [null],
            // Where the generated image files get saved
            outputDir: 'public/assets/images',
            // Public URL path that's referenced in the img tag's src attribute
            urlPath: '/assets/images',
        };
        const stats = await Image(src, imageOptions);
        const imageUrl = Object.values(stats)[0][0].url;
        return new URL(imageUrl, site.domain).href;
    },

    /**
     * Helpful for formatting a DateTime object
     */
    dateToFormatxx: function (date, format = 'DDD') {
        return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(
            String(format)
        )
    },

    // This one accepts SQL fromt: YYYY-MM-DD HH:ii:ss
    dateFormat: function (date, format = 'DDD') {
        return DateTime.fromSQL(date, { zone: 'utc' }).toFormat(
            String(format)
        )
    },

    dateToFormat: function (date, format = 'DDD') {
        return DateTime.fromISO(date, { zone: 'utc' }).toFormat(
            String(format)
        )
    },
    dateToISO: function (date) {
        return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
            includeOffset: false,
            suppressMilliseconds: true
        })
    },


    blogDateForUrl: function (date, format = 'yyyy-LL') {
        return DateTime.fromISO(date, { zone: 'utc' }).toFormat(
            String(format)
        )
    },

    obfuscate: function (str) {
        const chars = []
        for (var i = str.length - 1; i >= 0; i--) {
            chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''))
        }
        return chars.join('')
    },

    /**
     * Working with JSON
     */
    toJson: JSON.stringify,
    fromJson: JSON.parse,


    /**
     * Blog filters
     */
    getAllTags: function (collection) {
        let tagSet = new Set();
        for (let item of collection) {
            (item.data.tags || []).forEach(tag => tagSet.add(tag));
        }
        return Array.from(tagSet);
    },
    filterTagList: function (tags) {
        return (tags || []).filter(tag => ["sitemap", "all", "nav", "post", "posts"].indexOf(tag) === -1);
    },

    /**
     * Get a random value from an arrow
     */
    randomFromArray: function (array) {
        if (array.length === 0) {
            throw new Error("Array cannot be empty");
        }
        // Generate a random index within the array's bounds
        const randomIndex = Math.floor(Math.random() * array.length);
        // Return the element at the random index
        return array[randomIndex];
    },

    /**
     * Convert some content into markdown
     */
    markdown: function (content) {
        const md = new markdownIt({
            html: true,
        });
        return md.render(content);
    }
}
