const canonicalHost = "cost-of-x.pages.dev";
const legacyHost = "costofx-n06.pages.dev";

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname === "/index.html") {
            url.pathname = "/";
        } else if (url.pathname.endsWith(".html")) {
            url.pathname = url.pathname.slice(0, -5);
        }
        const isLegacyHost = url.hostname === legacyHost || url.hostname.endsWith(`.${legacyHost}`);
        const isPreviewHost = url.hostname.endsWith(`.${canonicalHost}`);
        if (isLegacyHost || isPreviewHost) {
            url.protocol = "https:";
            url.hostname = canonicalHost;
            url.port = "";
            return Response.redirect(url.toString(), 301);
        }

        return env.ASSETS.fetch(request);
    }
};
