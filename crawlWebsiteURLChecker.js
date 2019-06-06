const axios = require("axios");
const cheerio = require("cheerio");
const isRelativeUrl = require("is-relative-url");

let brokenLinks = [];

async function getAllLinks(url) {
  try {
    let result = await axios.get(url);
    $ = cheerio.load(result.data);
    links = [];
    $("a").each((i, link) => {
      links.push(link);
    });
    return links;
  } catch (err) {
    console.log(err);
  }
}

async function crawlPage(url) {
  let links = await getAllLinks(url);
  for (let link of links) {
    try {
      let resp = {};
      if (isRelativeUrl($(link).attr("href"))) {
        resp = await axios.get(url + $(link).attr("href"));
      } else {
        resp = await axios.get($(link).attr("href"));
      }
      console.log(
        "Valid Url: " +
          $(link).attr("href") +
          " returned status: " +
          resp.status
      );
    } catch (err) {
      console.log("Not a valid URL: " + $(link).attr("href"));
    }
  }
}

crawlPage("https://www.espncricinfo.com");
