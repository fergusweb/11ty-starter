// Import some configs to use below
const filters = require('./config/filters.js');
const plugins = require('./config/plugins.js');
const shortcodes = require('./config/shortcodes.js');



module.exports = function (eleventyConfig) {

    /**
     * Watch targets
     * https://www.11ty.dev/docs/watch-serve/
     */
    eleventyConfig.addWatchTarget("./src/scss/site.scss");
    eleventyConfig.addWatchTarget("./src/js/site.js");


    /**
     * Passthroughs - copy files from source with no 11ty processing
     * https://www.11ty.dev/docs/copy/
     */
    //eleventyConfig.addPassthroughCopy("./src/assets/fonts");


    /**
     * Add our plugins to Eleventy
     * https://www.11ty.dev/docs/plugins/
     */
    Object.keys(plugins).forEach((key) => {
        if (plugins.hasOwnProperty(key)) {
            const { plugin, options } = plugins[key];
            eleventyConfig.addPlugin(plugin, options);
        }
    })

    /**
     * Add our filters to Eleventy
     * https://www.11ty.dev/docs/filters/
     */
    Object.keys(filters).forEach((filterName) => {
        eleventyConfig.addFilter(filterName, filters[filterName])
    })


    /**
     * Shortcodes - output data using JS at build time
     * https://www.11ty.dev/docs/shortcodes/
     * I'm loading by addShortcode and addNunjucksAsyncShortcode types
     */
    Object.keys(shortcodes).forEach((key) => {
        if (shortcodes.hasOwnProperty(key)) {
            const { shortcode, type, callback } = shortcodes[key];
            eleventyConfig[type](shortcode, callback);
        }
    })


    /**
     * Server Settings
     */
    eleventyConfig.setServerOptions(require('./config/server.js'));

    // Return your Object options:
    return {
        dir: {
            input: "src",
            data: "data",
            includes: "./includes", // relative to input directory
            layouts: './layouts', // relative to input directory
            output: "public"
        },
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        templateFormats: ["html", "njk", "md"],
    }
};