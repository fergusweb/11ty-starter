module.exports = {
    // Fixes an issue where the dev website isn't reloading on CSS/JS changes
    watch: ["public/assets/*.js", "public/assets/*.css"],

    // An accessible variable to determine if the server is in production mode or not
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
