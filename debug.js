(() => {
        const storageKey = "debug_logs";
        const startedAt = performance.now();
        const state = { domReady: "pending", loaded: "pending", errors: [], resources: new WeakMap(), diagnostics: [] };
        let overlay;
        let tapCount = 0;
        let tapTimer;

        try {
            const savedLogs = JSON.parse(localStorage.getItem(storageKey) || "[]");
            if (Array.isArray(savedLogs)) state.errors = savedLogs.slice(-5);
        } catch (error) {
            console.warn("Debug log storage is unavailable.", error);
        }

        function recordError(type, message) {
            const entry = { timestamp: new Date().toISOString(), type, message: String(message).slice(0, 500) };
            state.errors.push(entry);
            state.errors = state.errors.slice(-5);
            try {
                const savedLogs = JSON.parse(localStorage.getItem(storageKey) || "[]");
                const logs = Array.isArray(savedLogs) ? savedLogs : [];
                logs.push(entry);
                localStorage.setItem(storageKey, JSON.stringify(logs.slice(-50)));
            } catch (error) {
                console.warn("Could not persist a debug log.", error);
            }
            render();
        }

        function resourceName(target) {
            return target && (target.src || target.href || target.tagName) || "unknown resource";
        }

        function isDebugMode() {
            try {
                return localStorage.getItem("debug_mode") === "true";
            } catch (error) {
                console.warn("Debug mode storage is unavailable.", error);
                return false;
            }
        }

        function setDebugMode(enabled) {
            try {
                localStorage.setItem("debug_mode", String(enabled));
            } catch (error) {
                console.warn("Could not update debug mode.", error);
            }
        }

        function render() {
            if (!overlay) return;
            const stylesheets = Array.from(document.querySelectorAll('link[rel~="stylesheet"]'));
            const loadedStyles = stylesheets.filter((link) => link.sheet).length;
            const cssState = stylesheets.length
                ? `${loadedStyles}/${stylesheets.length} loaded${stylesheets.length > loadedStyles ? `; ${stylesheets.length - loadedStyles} pending/failed` : ""}`
                : "none";
            overlay.querySelector("[data-debug-status]").textContent =
                `DOM: ${state.domReady} | Load: ${state.loaded} | Network: ${navigator.onLine ? "online" : "offline"} | CSS: ${cssState}`;
            overlay.querySelector("[data-debug-errors]").textContent = state.errors.length
                ? state.errors.map((entry) => `${entry.timestamp} ${entry.type}: ${entry.message}`).join("\n")
                : "No captured errors.";
            overlay.querySelector("[data-debug-diagnostics]").textContent = state.diagnostics.join("\n");
        }

        function showOverlay() {
            if (!document.body) return;
            if (!overlay) {
                overlay = document.createElement("aside");
                overlay.setAttribute("aria-label", "Network diagnostics");
                overlay.innerHTML = '<div style="display:flex;justify-content:space-between;gap:12px"><strong>Page diagnostics</strong><button type="button" data-debug-close style="background:none;border:0;color:inherit;cursor:pointer">Hide</button></div><pre data-debug-status style="white-space:pre-wrap"></pre><pre data-debug-errors style="max-height:120px;overflow:auto;white-space:pre-wrap"></pre><pre data-debug-diagnostics style="max-height:120px;overflow:auto;white-space:pre-wrap"></pre>';
                Object.assign(overlay.style, {
                    position: "fixed", right: "12px", bottom: "12px", zIndex: "2147483647",
                    width: "min(440px, calc(100vw - 24px))", maxHeight: "45vh", overflow: "auto",
                    padding: "12px", borderRadius: "8px", background: "rgba(17, 24, 39, .94)",
                    color: "#f9fafb", font: "12px/1.45 system-ui, sans-serif", boxShadow: "0 4px 18px #0005"
                });
                overlay.addEventListener("click", (event) => {
                    if (event.target.closest("[data-debug-close]")) {
                        setDebugMode(false);
                        overlay.remove();
                        overlay = null;
                    }
                });
                document.body.appendChild(overlay);
            }
            render();
        }

        window.onerror = (message, source, line, column, error) => {
            recordError("error", `${message} (${source || "inline"}:${line || 0}:${column || 0})${error && error.stack ? ` ${error.stack}` : ""}`);
            return false;
        };
        window.onunhandledrejection = (event) => {
            const reason = event.reason;
            recordError("unhandledrejection", reason && (reason.stack || reason.message) || reason);
        };
        window.addEventListener("error", (event) => {
            if (event.target && event.target !== window) {
                state.resources.set(event.target, "failed");
                recordError("resource", `Failed to load ${resourceName(event.target)}`);
            }
        }, true);
        window.addEventListener("load", (event) => {
            if (event.target && event.target !== window) state.resources.set(event.target, "loaded");
        }, true);
        window.addEventListener("online", render);
        window.addEventListener("offline", render);
        document.addEventListener("DOMContentLoaded", () => {
            state.domReady = `${Math.round(performance.now() - startedAt)}ms`;
            render();
            if (isDebugMode()) showOverlay();
        }, { once: true });
        window.addEventListener("load", () => {
            state.loaded = `${Math.round(performance.now() - startedAt)}ms`;
            const loader = document.getElementById("loader");
            if (loader) loader.style.display = "none";
            render();
        }, { once: true });
        document.addEventListener("click", (event) => {
            if (!event.target.closest("#logo")) return;
            tapCount += 1;
            clearTimeout(tapTimer);
            tapTimer = setTimeout(() => { tapCount = 0; }, 2000);
            if (tapCount >= 5) {
                tapCount = 0;
                setDebugMode(true);
                showOverlay();
            }
        });
        window.__updateDebugDiagnostics = (lines) => {
            state.diagnostics = lines;
            render();
        };
        setTimeout(() => {
            if (state.loaded !== "pending") return;
            const stalled = Array.from(document.querySelectorAll("script[src], link[rel~='stylesheet'][href]"))
                .filter((element) => /^https?:/.test(element.src || element.href))
                .filter((element) => state.resources.get(element) !== "loaded")
                .map((element) => `${resourceName(element)}: ${state.resources.get(element) || "pending/failed"}`);
            recordError("timeout", `window.load has not fired after 4000ms${stalled.length ? `; external resources: ${stalled.join(", ")}` : ""}`);
            document.body.style.display = "block";
            const loader = document.getElementById("loader");
            if (loader) loader.style.display = "none";
            if (isDebugMode()) showOverlay();
        }, 4000);
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", render, { once: true });
        } else {
            state.domReady = `${Math.round(performance.now() - startedAt)}ms`;
            render();
        }
    })();
window.addEventListener("load", (event) => {
    const stylesheet = event.target;
    if (stylesheet instanceof HTMLLinkElement && stylesheet.matches('link[rel~="stylesheet"][media="print"]')) {
        stylesheet.media = "all";
    }
}, true);
