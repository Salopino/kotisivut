import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const routerSource = fs.readFileSync(path.join(root, "seo-router.js"), "utf8");
const routeMatch = routerSource.match(/var routes = (\{[\s\S]*?\n  \});/);
if (!routeMatch) throw new Error("SEO route data not found");
const routes = Function('"use strict"; return (' + routeMatch[1] + ");")();

function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function pageFor(route) {
  const [routePath, title, description] = route;
  const canonical = "https://www.kuvauspalvelusalopino.fi" + routePath;
  return sourceHtml
    .replace(/<title>[^<]*<\/title>/, "<title>" + title + "</title>")
    .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + escapeAttribute(description) + '">')
    .replace(/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="' + canonical + '">')
    .replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="' + escapeAttribute(title) + '">')
    .replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="' + escapeAttribute(description) + '">')
    .replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="' + canonical + '">')
    .replace(/<meta name="twitter:title" content="[^"]*">/, '<meta name="twitter:title" content="' + escapeAttribute(title) + '">')
    .replace(/<meta name="twitter:description" content="[^"]*">/, '<meta name="twitter:description" content="' + escapeAttribute(description) + '">');
}

for (const route of Object.values(routes)) {
  if (route[0] === "/") continue;
  const destination = path.join(root, route[0].slice(1), "index.html");
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  fs.writeFileSync(destination, pageFor(route));
}

console.log(`Generated ${Object.keys(routes).length - 1} SEO route pages.`);
