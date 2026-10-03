const menu_drop = document.getElementById("menu-nav")
const mobile_menu = document.getElementById("mobile-nav")
const closeDrop = document.getElementById("close")
const card1 = document.getElementById("card1")
const rarr = document.getElementById("rarr")
const card1Cover = document.getElementById("card1-cover")
const darkMode = document.getElementById("darkMode")
const articles = document.getElementById("articlestxt")
const logo = document.getElementById("logo")
const heroLogo = document.getElementById("hero-logo")
const darkMob = document.getElementById("dark-mob")
const language = document.getElementById("language")
const langMob = document.getElementById("lang-mob")
const footerRarr = document.getElementById("footerrarr")
let isArabic = false

function getPreference(key) {
    try {
        return localStorage.getItem(key)
    } catch (error) {
        console.warn(`Could not read the ${key} preference.`, error)
        return null
    }
}

function savePreference(key, value) {
    try {
        localStorage.setItem(key, value)
    } catch (error) {
        console.warn(`Could not save the ${key} preference.`, error)
    }
}

function updateLogo() {
    const image = document.body.classList.contains("dark")
        ? (isArabic ? "imgs/Copilot_20260208_163007.png" : "imgs/Copilot_20260207_204226-removebg-preview.png")
        : (isArabic ? "imgs/Copilot_20260208_162311.png" : "imgs/Copilot_20260205_203738-removebg-preview.png")

    if (logo) {
        logo.src = image
        logo.alt = isArabic ? "شعار تكلفة X" : "Cost of X"
    }
    if (heroLogo) heroLogo.src = image

    if (rarr && footerRarr) {
        if (isArabic) {
            rarr.classList.remove("fa-arrow-right")
            rarr.classList.add("fa-arrow-left")
            footerRarr.classList.remove("fa-arrow-right")
            footerRarr.classList.add("fa-arrow-left")
        } else {
            rarr.classList.add("fa-arrow-right")
            rarr.classList.remove("fa-arrow-left")
            footerRarr.classList.add("fa-arrow-right")
            footerRarr.classList.remove("fa-arrow-left")
        }
    }
}

function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark)
    savePreference("theme", isDark ? "dark" : "light")

    if (darkMode) {
        darkMode.innerHTML = isDark
            ? `<i class="fa-solid fa-sun fa-xl" id="sun"></i>`
            : `<i class="fa-regular fa-moon fa-xl"></i>`
    }

    const themeLabel = isDark
        ? (isArabic ? "التبديل إلى الوضع الفاتح" : "Switch to light mode")
        : (isArabic ? "التبديل إلى الوضع الداكن" : "Switch to dark mode")
    if (darkMode) {
        darkMode.setAttribute("aria-label", themeLabel)
        darkMode.title = themeLabel
    }
    if (darkMob) {
        darkMob.textContent = isDark
            ? (isArabic ? "الوضع الفاتح" : "Light")
            : (isArabic ? "الوضع الداكن" : "Dark")
    }

    updateLogo()
}

function applyLanguage(arabic) {
    isArabic = arabic
    document.documentElement.lang = arabic ? "ar" : "en"
    document.documentElement.dir = arabic ? "rtl" : "ltr"
    document.body.style.fontFamily = arabic ? '"Cairo", sans-serif' : '"Montserrat", sans-serif'

    document.querySelectorAll("[data-en][data-ar]").forEach((element) => {
        element.textContent = arabic ? element.dataset.ar : element.dataset.en
    })

    savePreference("language", arabic ? "ar" : "en")
    if (darkMode) {
        const themeLabel = document.body.classList.contains("dark")
            ? (arabic ? "التبديل إلى الوضع الفاتح" : "Switch to light mode")
            : (arabic ? "التبديل إلى الوضع الداكن" : "Switch to dark mode")
        darkMode.setAttribute("aria-label", themeLabel)
        darkMode.title = themeLabel
    }
    if (darkMob) {
        darkMob.textContent = document.body.classList.contains("dark")
            ? (arabic ? "الوضع الفاتح" : "Light")
            : (arabic ? "الوضع الداكن" : "Dark")
    }

    updateLogo()
}

if (menu_drop && mobile_menu) {
    menu_drop.addEventListener("click", () => {
        mobile_menu.style.display = "flex"
        document.body.style.overflowY = "hidden"
    })
}

if (closeDrop && mobile_menu) {
    closeDrop.addEventListener("click", () => {
        mobile_menu.style.display = "none"
        document.body.style.overflowY = "auto"
    })
}

const homeBtnEl = document.getElementById("homebtn")
if (homeBtnEl) {
    homeBtnEl.addEventListener("click", () => {
        window.location.href = "index.html"
    })
}

const articlesBtn = document.getElementById("articlesbtn")
if (articlesBtn && mobile_menu) {
    articlesBtn.addEventListener("click", () => {
        window.location.href = document.getElementById("featured-cont")
            ? "#featured-cont"
            : "index.html#featured-cont"
        mobile_menu.style.display = "none"
        document.body.style.overflowY = "auto"
    })
}

if (card1 && rarr && card1Cover) {
    card1.addEventListener("mouseenter", () => {
        card1.style.border = "red 2px solid"
        rarr.style.marginInlineStart = "0.5rem"
        card1Cover.style.backgroundSize = "110%"
    })

    card1.addEventListener("mouseleave", () => {
        card1.style.border = "2px solid rgb(199, 199, 199)"
        rarr.style.marginInlineStart = "0.25rem"
        card1Cover.style.backgroundSize = "100%"
    })
}

if (darkMode) {
    darkMode.addEventListener("click", () => {
        applyTheme(!document.body.classList.contains("dark"))
    })
}

if (darkMob) {
    darkMob.addEventListener("click", () => {
        applyTheme(!document.body.classList.contains("dark"))
    })
}

if (language) {
    language.addEventListener("click", () => {
        applyLanguage(!isArabic)
    });
}

if (langMob) {
    langMob.addEventListener("click", () => {
        applyLanguage(!isArabic)
    })
}

isArabic = getPreference("language") === "ar"
applyLanguage(isArabic)
applyTheme(getPreference("theme") === "dark")

const shareUrl = window.location.href
const getShareTitle = () => document.querySelector(".page h1")?.textContent.trim() || document.title
const shareStatus = document.getElementById("share-status")
const shareWhatsApp = document.getElementById("share-whatsapp")
const shareTelegram = document.getElementById("share-telegram")
const shareMessenger = document.getElementById("share-messenger")

if (shareWhatsApp) {
    shareWhatsApp.addEventListener("click", () => {
        const text = encodeURIComponent(`${getShareTitle()} ${shareUrl}`)
        window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer")
    })
}

if (shareTelegram) {
    const url = encodeURIComponent(shareUrl)
    shareTelegram.addEventListener("click", () => {
        const text = encodeURIComponent(getShareTitle())
        window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank", "noopener,noreferrer")
    })
}

async function copyArticleUrl() {
    if (navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(shareUrl)
            return true
        } catch {
        }
    }

    const urlField = document.createElement("textarea")
    urlField.value = shareUrl
    urlField.setAttribute("readonly", "")
    urlField.style.position = "fixed"
    urlField.style.opacity = "0"
    document.body.appendChild(urlField)
    urlField.select()
    const copied = document.execCommand("copy")
    urlField.remove()
    return copied
}

if (shareMessenger) {
    shareMessenger.addEventListener("click", async () => {
        const title = getShareTitle()
        if (navigator.share) {
            try {
                await navigator.share({ title, text: title, url: shareUrl })
                return
            } catch (error) {
                if (error.name === "AbortError") return
            }
        }

        window.open("https://www.messenger.com/", "_blank", "noopener,noreferrer")
        const copied = await copyArticleUrl()
        if (shareStatus) {
            shareStatus.textContent = isArabic
                ? (copied ? "تم نسخ رابط المقال. الصقه في ماسنجر." : "تم فتح ماسنجر. انسخ عنوان المقال من المتصفح لمشاركته.")
                : (copied ? "Article link copied. Paste it into Messenger." : "Messenger opened. Copy this article's address from your browser to share it.")
        }
    })
}

const messages = isArabic
    ? [
        `<span id="arabic-lang-tip">يمكنك تغيير اللغة من القائمة</span>`,
        `<span id="arabic-lang-tip">استخدم الوضع الداكن من القائمة</span>`
    ]
    : [
        `<span id="english-lang-tip">You can change the language from the menu</span>`,
        `<span id="english-lang-tip">Access dark mode through the menu</span>`
    ]

const randomIndex = Math.floor(Math.random() * messages.length);
const loaderText = document.getElementById("loader-text");
if (loaderText) loaderText.innerHTML = messages[randomIndex];

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (!loader) return

    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 400);
    }, 1500);

});

window.runFullDiagnostics = async function runFullDiagnostics() {
    const results = [];
    const checkFetch = async (label, url, mode) => {
        const controller = new AbortController();
        // Bound each probe so a slow mobile connection cannot stall the full report.
        const timeout = setTimeout(() => controller.abort(), 6000);
        const started = performance.now();
        try {
            const response = await fetch(url, { mode, cache: "no-store", signal: controller.signal });
            const status = response.type === "opaque" ? "reachable (opaque response)" : `${response.status} ${response.statusText}`.trim();
            results.push({ check: label, status, latencyMs: Math.round(performance.now() - started) });
        } catch (error) {
            results.push({
                check: label,
                status: error.name === "AbortError" ? "timed out after 6000ms" : `failed: ${error.message}`,
                latencyMs: Math.round(performance.now() - started)
            });
        } finally {
            clearTimeout(timeout);
        }
    };

    try {
        const key = `costofx-diagnostic-${Date.now()}`;
        localStorage.setItem(key, "ok");
        const passed = localStorage.getItem(key) === "ok";
        localStorage.removeItem(key);
        results.push({ check: "localStorage read/write", status: passed ? "passed" : "failed", latencyMs: null });
    } catch (error) {
        results.push({ check: "localStorage read/write", status: `failed: ${error.message}`, latencyMs: null });
    }

    const rootUrl = window.location.origin === "null"
        ? new URL("index.html", window.location.href)
        : new URL("/index.html", window.location.origin);
    results.push({ check: "Tailwind CDN", status: "not used by this site; no request sent", latencyMs: null });
    await Promise.all([
        checkFetch("site root /index.html", rootUrl.href, "same-origin"),
        checkFetch("Font Awesome kit", "https://kit.fontawesome.com/ce0e489668.js", "no-cors"),
        checkFetch("Google Fonts CSS", "https://fonts.googleapis.com/css2?family=Inter", "no-cors")
    ]);

    console.table(results);
    const lines = results.map(({ check, status, latencyMs }) =>
        `${check}: ${status}${latencyMs === null ? "" : ` (${latencyMs}ms)`}`
    );
    if (typeof window.__updateDebugDiagnostics === "function") {
        window.__updateDebugDiagnostics(lines);
    }
    return results;
};
