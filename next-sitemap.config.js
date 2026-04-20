/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://jhumkara.com",
  generateRobotsTxt: true,

  exclude: ["/admin/*", "/api/*"],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
}