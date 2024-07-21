//const configServer = require('./server.js');
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const site = require('../src/data/site.js');

module.exports = {
    eleventyNavigation: {
        plugin: require("@11ty/eleventy-navigation"),
        options: null,
    },
    sitemap: {
        plugin: require("@quasibit/eleventy-plugin-sitemap"),
        options: {
            sitemap: {
                hostname: site.domain
            },
        },
    },
    googleFonts: {
        plugin: require("eleventy-google-fonts"),
        options: null,
    },
    imageTransform: {
        plugin: eleventyImageTransformPlugin,
        options: {
            // which file extensions to process
            extensions: "html",

            // Add any other Image utility options here:
            outputDir: 'public/assets/images',
            urlPath: '/assets/images',

            // optional, output image formats
            formats: ["webp", "jpeg"],
            // formats: ["auto"],

            // optional, output image widths
            widths: [500, 800],

            // optional, attributes assigned on <img> override these values.
            defaultAttributes: {
                loading: "lazy",
                decoding: "async",
                sizes: [500, 800],
                alt: null,
            },
        },
    }
}

//sitemap: require("@quasibit/eleventy-plugin-sitemap"),
//googleFonts: require("eleventy-google-fonts"),
//imageTransform: eleventyImageTransformPlugin,
//imageTransform: function() {
//}

//minifier: require("@sherby/eleventy-plugin-files-minifier"),
/*
maybeMinifier: function () {
    if (configServer.isProduction) {
        return require("@sherby/eleventy-plugin-files-minifier");
    } else {
        return false;
    }
},
*/

