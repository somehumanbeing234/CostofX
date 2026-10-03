const menu_drop = document.getElementById("menu-nav")
const mobile_menu = document.getElementById("mobile-nav")
const homeBtn = document.getElementById("homebtn")
const closeDrop = document.getElementById("close")
const card1 = document.getElementById("card1")
const rarr = document.getElementById("rarr")
const card1Cover = document.getElementById("card1-cover")
const darkMode = document.getElementById("darkMode")
const heroCont = document.getElementById("hero-cont")
const hero = document.getElementById("hero")
const header = document.getElementById("heroh1")
const home = document.getElementById("hometxt")
const articles = document.getElementById("articlestxt")
const featuredTxt = document.getElementById("featured-txt")
const featuredDesc = document.getElementById("featured-desc")
const card1Stats = document.getElementById("card1-cntr")
const dailyTxt = document.getElementById("dailytxt")
const yearlyTxt = document.getElementById("yearlytxt")
const yrsTxt = document.getElementById("yrstxt")
const card1Desc = document.getElementById("card-1-desc")
const card1Read = document.getElementById("card1read")
const footer = document.getElementById("footer")
const footerH1 = document.getElementById("footerh1")
const footerDesc = document.getElementById("footerdesc")
const navBar = document.getElementById("navbar")
const logo = document.getElementById("logo")
const leftNav = document.getElementById("left-nav")
const heroLogo = document.getElementById("hero-logo")
const darkMob = document.getElementById("dark-mob")
const darkBtn = document.querySelectorAll("#mobile-nav button")
const language = document.getElementById("language")
const langMob = document.getElementById("lang-mob")
const footerRarr = document.getElementById("footerrarr")
let isArabic = false
let counter = 1

function updateLogo() {
    if (!logo || !heroLogo) return;

    if (document.body.classList.contains("dark")) {
        logo.src = isArabic
            ? "imgs/Copilot_20260208_163007.png"
            : "imgs/Copilot_20260207_204226-removebg-preview.png";
    } else {
        logo.src = isArabic
            ? "imgs/Copilot_20260208_162311.png"
            : "imgs/Copilot_20260205_203738-removebg-preview.png";
    }

    if (document.body.classList.contains("dark")) {
        heroLogo.src = isArabic
            ? "imgs/Copilot_20260208_163007.png"
            : "imgs/Copilot_20260207_204226-removebg-preview.png";
    } else {
        heroLogo.src = isArabic
            ? "imgs/Copilot_20260208_162311.png"
            : "imgs/Copilot_20260205_203738-removebg-preview.png";
    }

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

if (darkMode && hero && heroCont && header && articles && featuredTxt && featuredDesc && card1 && card1Stats && dailyTxt && yearlyTxt && yrsTxt && card1Desc && card1Read && footer && footerH1 && footerDesc && navBar) {
    darkMode.addEventListener("click", () => {
        document.body.classList.toggle("dark")
        if (document.body.classList.contains("dark")) {
            hero.style.backgroundColor = "transparent"
            heroCont.style.backgroundColor = "transparent"
            hero.style.color = "white"
            header.style.color = "white"
            articles.style.color = "white"
            featuredTxt.style.color = "white"
            featuredDesc.style.color = "white"
            card1.style.backgroundColor = "oklch(27.8% 0.033 256.848)"
            card1Stats.style.backgroundColor = "oklch(37.3% 0.034 259.733)"
            dailyTxt.style.color = "oklch(70.4% 0.191 22.216)"
            yearlyTxt.style.color = "oklch(70.4% 0.191 22.216)"
            yrsTxt.style.color = "oklch(70.4% 0.191 22.216)"
            card1Desc.style.color = "white"
            card1Read.style.color = "oklch(70.4% 0.191 22.216)"
            footer.style.backgroundColor = "transparent"
            footerH1.style.color = "white"
            footerDesc.style.color = "white"
            navBar.style.borderBottom = "1px solid white"
            darkMode.innerHTML = `<i class="fa-solid fa-sun fa-xl" id="sun"></i>`
            if (logo) logo.src = "imgs/Copilot_20260207_204226-removebg-preview.png"
            if (heroLogo) heroLogo.src = "imgs/Copilot_20260207_204226-removebg-preview.png"
        } else {
            hero.style.backgroundColor = "rgb(245, 244, 244)"
            heroCont.style.backgroundColor = "rgb(245, 244, 244)"
            hero.style.color = "black"
            header.style.color = "#111827"
            articles.style.color = "rgb(45,45,45)"
            featuredTxt.style.color = "#111827"
            featuredDesc.style.color = "rgb(45,45,45)"
            card1.style.backgroundColor = "white"
            card1Stats.style.backgroundColor = "oklch(92.797% 0.00011 271.152)"
            dailyTxt.style.color = "red"
            yearlyTxt.style.color = "red"
            yrsTxt.style.color = "red"
            card1Desc.style.color = "oklch(44.6% 0.03 256.802)"
            card1Read.style.color = "red"
            footer.style.backgroundColor = "rgb(245, 244, 244)"
            footerH1.style.color = "#111827"
            footerDesc.style.color = "rgb(45, 45, 45)"
            darkMode.innerHTML = `<i class="fa-regular fa-moon fa-xl"></i>`
            if (logo) logo.src = "imgs/Copilot_20260205_203738-removebg-preview.png"
            if (heroLogo) heroLogo.src = "imgs/Copilot_20260205_203738-removebg-preview.png"
        }

        updateLogo()
    })
}

if (darkMob && mobile_menu) {
    darkMob.addEventListener("click", () => {
        document.body.classList.toggle("dark")
        const isDark = document.body.classList.contains("dark")

        if (!hero || !heroCont || !header || !articles || !featuredTxt || !featuredDesc || !card1 || !card1Stats || !dailyTxt || !yearlyTxt || !yrsTxt || !card1Desc || !card1Read || !footer || !footerH1 || !footerDesc || !navBar) {
            darkMob.innerText = isDark ? "Light" : "Dark"
            mobile_menu.style.backgroundColor = isDark ? "#111827" : "white"
            darkBtn.forEach(btn => {
                btn.style.backgroundColor = isDark ? "#111827" : "white"
                btn.style.color = isDark ? "white" : "rgb(45,45,45)"
            })
            if (closeDrop) closeDrop.style.color = isDark ? "white" : "rgb(45,45,45)"
            if (navBar) navBar.style.borderBottom = isDark ? "1px solid white" : "1px solid gray"
            return
        }

        if (document.body.classList.contains("dark")) {
            hero.style.backgroundColor = "transparent"
            heroCont.style.backgroundColor = "transparent"
            hero.style.color = "white"
            header.style.color = "white"
            articles.style.color = "white"
            featuredTxt.style.color = "white"
            featuredDesc.style.color = "white"
            card1.style.backgroundColor = "oklch(27.8% 0.033 256.848)"
            card1Stats.style.backgroundColor = "oklch(37.3% 0.034 259.733)"
            dailyTxt.style.color = "oklch(70.4% 0.191 22.216)"
            yearlyTxt.style.color = "oklch(70.4% 0.191 22.216)"
            yrsTxt.style.color = "oklch(70.4% 0.191 22.216)"
            card1Desc.style.color = "white"
            card1Read.style.color = "oklch(70.4% 0.191 22.216)"
            footer.style.backgroundColor = "transparent"
            footerH1.style.color = "white"
            footerDesc.style.color = "white"
            navBar.style.borderBottom = "1px solid white"
            darkMode.innerHTML = `<i class="fa-solid fa-sun fa-xl" id="sun"></i>`
            if (logo) logo.src = "imgs/Copilot_20260207_204226-removebg-preview.png"
            if (heroLogo) heroLogo.src = "imgs/Copilot_20260207_204226-removebg-preview.png"
            darkMob.innerText = "Light"
            mobile_menu.style.backgroundColor = "#111827"
            darkBtn.forEach(btn => {
                btn.style.backgroundColor = "#111827"
                btn.style.color = "white"
            })
            if (closeDrop) closeDrop.style.color = "white"
        } else {
            hero.style.backgroundColor = "rgb(245, 244, 244)"
            heroCont.style.backgroundColor = "rgb(245, 244, 244)"
            hero.style.color = "black"
            header.style.color = "#111827"
            articles.style.color = "rgb(45,45,45)"
            featuredTxt.style.color = "#111827"
            featuredDesc.style.color = "rgb(45,45,45)"
            card1.style.backgroundColor = "white"
            card1Stats.style.backgroundColor = "oklch(92.797% 0.00011 271.152)"
            dailyTxt.style.color = "red"
            yearlyTxt.style.color = "red"
            yrsTxt.style.color = "red"
            card1Desc.style.color = "oklch(44.6% 0.03 256.802)"
            card1Read.style.color = "red"
            footer.style.backgroundColor = "rgb(245, 244, 244)"
            footerH1.style.color = "#111827"
            footerDesc.style.color = "rgb(45, 45, 45)"
            darkMode.innerHTML = `<i class="fa-regular fa-moon fa-xl"></i>`
            if (logo) logo.src = "imgs/Copilot_20260205_203738-removebg-preview.png"
            if (heroLogo) heroLogo.src = "imgs/Copilot_20260205_203738-removebg-preview.png"
            darkMob.innerText = "Dark"
            mobile_menu.style.backgroundColor = "white"
            darkBtn.forEach(btn => {
                btn.style.backgroundColor = "white"
                btn.style.color = "rgb(45,45,45)"
            })
            if (closeDrop) closeDrop.style.color = "rgb(45,45,45)"
        }

        updateLogo()
    })
}

if (articles) {
    articles.addEventListener("mouseenter", () => {
        articles.style.color = "red"
    })

    articles.addEventListener("mouseleave", () => {
        if (document.body.classList.contains("dark")) {
            articles.style.color = "white"
        } else {
            articles.style.color = "rgb(45,45,45)"
        }
    })
}

function switchToArabic() {
    document.querySelectorAll("[data-ar]").forEach(el => {
        el.textContent = el.dataset.ar;
        document.body.style.fontFamily = "Cairo"
        document.documentElement.dir = "rtl";
    });
}

function switchToEnglish() {
    document.querySelectorAll("[data-en]").forEach(el => {
        el.textContent = el.dataset.en;
        document.body.style.fontFamily = "Montserrat, sans-serif"
        document.documentElement.dir = "ltr";
    });
}

if (language) {
    language.addEventListener("click", () => {
        if (counter % 2 === 0) {
            isArabic = false
            switchToEnglish();
        } else {
            isArabic = true
            switchToArabic();
        }
        counter += 1
        updateLogo();
    });
}

langMob.addEventListener("click",()=> {
    if(counter % 2 === 0){
        isArabic = false;
        switchToEnglish();
    } else {
        isArabic = true; 
        switchToArabic();
    }
    counter += 1;
    updateLogo();
});

const shareUrl = window.location.href
const shareTitle = document.querySelector(".page h1")?.textContent.trim() || document.title
const shareStatus = document.getElementById("share-status")
const shareWhatsApp = document.getElementById("share-whatsapp")
const shareTelegram = document.getElementById("share-telegram")
const shareMessenger = document.getElementById("share-messenger")

if (shareWhatsApp) {
    const text = encodeURIComponent(`${shareTitle} ${shareUrl}`)
    shareWhatsApp.addEventListener("click", () => {
        window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer")
    })
}

if (shareTelegram) {
    const url = encodeURIComponent(shareUrl)
    const text = encodeURIComponent(shareTitle)
    shareTelegram.addEventListener("click", () => {
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
        if (navigator.share) {
            try {
                await navigator.share({ title: shareTitle, text: shareTitle, url: shareUrl })
                return
            } catch (error) {
                if (error.name === "AbortError") return
            }
        }

        window.open("https://www.messenger.com/", "_blank", "noopener,noreferrer")
        const copied = await copyArticleUrl()
        if (shareStatus) {
            shareStatus.textContent = copied
                ? "Article link copied. Paste it into Messenger."
                : "Messenger opened. Copy this article's address from your browser to share it."
        }
    })
}

const messages = [
    `<span id="arabic-lang-tip">يمكنك تغيير اللغة من القائمة</span>`,
    
    `<span id="arabic-lang-tip">استخدم الوضع الداكن من القائمة</span>`,

    `<span id="english-lang-tip">You can change the language from the menu</span>`,

    `<span id="english-lang-tip">Access dark mode through the menu</span>`
];

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

