const Image = require("@11ty/eleventy-img")


module.exports = {

    // Get the current year with {% year %}
    year: {
        shortcode: 'year',
        type: 'addShortcode',
        callback: function (name) {
            return `${new Date().getFullYear()}`
        }
    },

    // Font Awesome icon, usage::
    //  {% fa 'fa-house fa-solid' %}
    //  {% fa 'fa-house', 'fa-solid' %}
    fa: {
        shortcode: 'fa',
        type: 'addShortcode',
        callback: function (icon, style) {
            return `<i class="${style} ${icon}"></i>`
        }
    },

    // Try doing SVG icons for Font Awesome
    faSvg: {
        shortcode: 'faSvg',
        type: 'addShortcode',
        callback: function (name) {
            return `<svg class="icon icon--${name}" role="img" aria-hidden="true" width="24" height="24">
                        <use xlink:href="#svg-${name}"></use>
                    </svg>`
        }
    },

    // To insert an SVG icon as an image
    svgIcon: {
        shortcode: 'svgIcon',
        type: 'addShortcode',
        callback: async (src, alt, sizes) => {
            let metadata = await Image(src, {
                formats: ['svg'],
                dryRun: true,
            })
            return metadata.svg[0].buffer.toString()
        }
    },

    /**
     * Draw an image as a responsive <picture> element.
     * Usage:
        {% image {
            src:image_url,
            alt: "Alt text for the image",
            sizes: [300, 600],
            customMetadata: { formats: ["jpeg", "png"] },
            customImageAttributes: { class: "custom-class" },
            customLinkAttributes: { class: "link-custom-class" }
        } %}
     */
    image: {
        shortcode: 'image',
        type: 'addNunjucksAsyncShortcode',
        callback: async function (options) {
            // Destructure the options object with default values
            const {
                src,
                alt = "",
                sizes = [400, 800],
                customMetadata = {},
                customImageAttributes = {}
            } = options;

            // Merge the custom metadata with the default metadata
            let metadata = await Image(src, {
                widths: sizes,
                formats: ["avif", "webp", "jpeg"],
                outputDir: 'public/assets/images',
                urlPath: '/assets/images',
                ...customMetadata
            });

            // Merge the custom image attributes with the default image attributes
            let imageAttributes = {
                alt,
                //sizes: sizes.map(size => `${size}px`).join(", "),
                sizes: sizes,
                loading: "lazy",
                decoding: "async",
                "eleventy:ignore": "",
                ...customImageAttributes
            };

            // Return the image tag
            return Image.generateHTML(metadata, imageAttributes);
        }
    },

    /**
     * Draw an image as a responsive <picture> element, linking to the largest size version.
     * Usage:
    {% imageLink {
        src:image_url,
        customImageAttributes: { class: "custom-image-class" },
        customLinkAttributes: {
            'class': 'something',
            'data-toggle': 'lightbox',
            'data-gallery': 'something-gallery'
        }
    } %}
     */
    imageLink: {
        shortcode: 'imageLink',
        type: 'addNunjucksAsyncShortcode',
        callback: async function (options) {
            // Destructure the options object with default values
            const {
                src,
                alt = "",
                sizes = [400, 800],
                customMetadata = {},
                customImageAttributes = {},
                customLinkAttributes = {}
            } = options;

            // Merge the custom metadata with the default metadata
            let metadata = await Image(src, {
                widths: sizes,
                formats: ["avif", "webp", "jpeg"],
                outputDir: 'public/assets/images',
                urlPath: '/assets/images',
                ...customMetadata
            });

            // Merge the custom image attributes with the default image attributes
            let imageAttributes = {
                alt,
                //sizes: sizes.map(size => `${size}px`).join(", "),
                sizes: sizes,
                loading: "lazy",
                decoding: "async",
                "eleventy:ignore": "",
                ...customImageAttributes
            };

            // Convert customLinkAttributes to a string
            linkAttributes = Object.keys(customLinkAttributes).map(
                key => `${key}="${customLinkAttributes[key]}"`
            ).join(" ");

            // Wrap the image tag with a link
            let html = Image.generateHTML(metadata, imageAttributes);
            let imageUrl = metadata.jpeg[metadata.jpeg.length - 1].url;
            return `<a ${linkAttributes} href="${imageUrl}">${html}</a>`;
        }
    }
}