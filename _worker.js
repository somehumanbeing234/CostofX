const canonicalHost = "cost-of-x.pages.dev";
const legacyHost = "costofx-n06.pages.dev";

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.hostname === legacyHost || url.hostname.endsWith(`.${legacyHost}`)) {
            url.protocol = "https:";
            url.hostname = canonicalHost;
            url.port = "";
            return Response.redirect(url.toString(), 301);
        }

        return env.ASSETS.fetch(request);
    }
};
