# 11ty Starter Kit

This is a starter kit to give you a headstart building with [11ty.dev](https://www.11ty.dev/).  This is a fully configured Eleventy environment, with Nunjucks templating. 

✅ Full build system for SCSS, JS, etc.

✅ Image optimisation & generation.

✅ Supports content and blog posts. 

🔲 TODO: CMS integration ([Decap CMS](https://decapcms.org/docs/basic-steps/) or [TinaCMS](https://tina.io/docs/frameworks/11ty/))


## Quick Start Guide

### First set up as a new repo
Clone the new repo locally, and set this up as an upstream repo
```
git clone git@github.com:fergusweb/11ty-starter.git .
git remote remove origin
git remote add upstream git@github.com:fergusweb/11ty-starter.git
git remote set-url --push upstream DISABLE
git pull upstream main
git remote add origin YOUR_NEW_REPO_URL_HERE
git push
```

### Run the build tools
1. Run `npm install` to install all dependencies.
2. Run `npm run dev` to start the development server.
3. Run `npm run build` to build a production 'public' folder.

### Configure the site
* Make any necessary changes to `config/plugins.js`, `config/filters.js`, and `config/shortcodes.js` for your site
* Be sure to edit `src/data/site.js` to customise your specifics  *(Very important to update your Live URL)*


## Using site.data
The `src/data/site.js` file contains site-specific configuration settings, which you can reference in your content & templates.

Eg, you can use `{{ site.domain }}`, `{{ site.name }}`, `{{ site.author.name }}`, `{{ site.socials.facebook.link }}` etc.



## Using Images

I'm making use of the [11ty/eleventy-img plugin](https://www.11ty.dev/docs/plugins/image/) to optimise images.  It should automatically generate image sizes & formats based on your settings during the dev/build process.

You can insert a regular like this:
```html
<img src="/assets/images/space.jpg" alt="Space is cool" />
```
And you can add parameters for `eleventy:widths="400,800"` and `eleventy:formats="webp,png"` if you want to specify sizes & formats per image.

Having a thumbnail image that links to a larger version of itself is difficult, as the image URLs are dynamically generated.  So I've added some shortcodes to help with this:
```njk
{% image {
    src:image_url,
    alt: "Alt text for the image",
    sizes: [300, 600],
    customMetadata: { formats: ["jpeg", "png"] },
    customImageAttributes: { class: "custom-class" },
    customLinkAttributes: { class: "link-custom-class" }
} %}
```
And a very similar shortcode which will link to the largest generated version of itself:
```njk
{% imageLink {
    src:image_url,
    customImageAttributes: { class: "custom-image-class" },
    customLinkAttributes: {
        'class': 'something',
        'data-toggle': 'lightbox',
        'data-gallery': 'something-gallery'
    }
} %}
```


