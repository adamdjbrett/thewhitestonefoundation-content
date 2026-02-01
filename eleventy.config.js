import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import { DateTime } from "luxon";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "public": "/" });

  const md = markdownIt({ html: true, linkify: true }).use(markdownItFootnote);
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("content/posts/**/*.md").sort((a, b) => {
      return (a.date || 0) - (b.date || 0);
    });
  });

  eleventyConfig.addCollection("higherEd", (collectionApi) => {
    return collectionApi.getFilteredByGlob("content/posts/**/*.md").filter((post) => {
      const categories = post.data?.categories || [];
      return categories.includes("higher-ed");
    });
  });

  eleventyConfig.addFilter("getPrevPost", (collection, page) => {
    if (!collection || !page) return null;
    const index = collection.findIndex((item) => item.url === page.url);
    return index > 0 ? collection[index - 1] : null;
  });

  eleventyConfig.addFilter("getNextPost", (collection, page) => {
    if (!collection || !page) return null;
    const index = collection.findIndex((item) => item.url === page.url);
    return index >= 0 && index < collection.length - 1 ? collection[index + 1] : null;
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj).toFormat("LLLL d, yyyy");
  });

  eleventyConfig.addFilter("dateFilter", (dateObj, format) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj).toISO();
  });

  eleventyConfig.addFilter("baseUrl", (url) => {
    if (!url || url == "/") return "http://localhost:8080";
    return url.endsWith("/") ? url.slice(0, -1) : url;
  });

  eleventyConfig.addFilter("absUrl", (path, base) => {
    try {
      return new URL(path, base).toString();
    } catch {
      return path;
    }
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site"
    }
  };
}
