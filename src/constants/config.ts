const MEDIUM_USERNAME = "@prasaznat";
const MEDIUM_RSS_URL = `https://medium.com/feed/${MEDIUM_USERNAME}`;
const RSS_TO_JSON_API = "https://api.rss2json.com/v1/api.json?rss_url=";

export const CONFIG = {
    EMAIL: "prasannanadrajan.r@gmail.com",
    LINKEDIN: "https://www.linkedin.com/in/prasannanadrajan/",
    GITHUB: "https://github.com/Prasanna-Nadrajan",
    MEDIUM_USERNAME,
    MEDIUM_RSS_URL,
    RSS_TO_JSON_API,
    MEDIUM_API: `${RSS_TO_JSON_API}${MEDIUM_RSS_URL}`,
    LOCATION: "Chennai, India",
    ASSETS: {
        PROFILE_IMAGE: "/assets/images/portfolio_image.png",
        BLOG_PLACEHOLDER: "/assets/images/blog/Medium-Emblem.png",
        RESUME: "/assets/Prasanna_Nadrajan_Resume.pdf"
    }
};
