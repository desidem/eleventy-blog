const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
    // Copy the `css` directory to the output
    eleventyConfig.addPassthroughCopy('src/css');
  
    // Watch the `css` directory for changes
    eleventyConfig.addWatchTarget('src/css');

    eleventyConfig.addPassthroughCopy('src/_redirects');
    eleventyConfig.addPassthroughCopy('src/db')
    eleventyConfig.addPassthroughCopy('src/js')
    eleventyConfig.addPassthroughCopy('src/video')
    eleventyConfig.addPassthroughCopy('src/confmail');

    eleventyConfig.addFilter('readableDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc'}).toFormat(
            'dd LLL yyyy'
        );
    });
    return {
        dir: {
            input: "src",
            output: "_site"
        }
  };
};
