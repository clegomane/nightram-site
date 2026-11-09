// Every outside link of the site lives here: fill a URL and every button using it goes live.
// An empty URL greys the button out and labels it "coming soon".
const LINKS = {
  steam: "",    // e.g. https://store.steampowered.com/app/1234560/NightRam/
  discord: "",  // e.g. https://discord.gg/xxxxxxx
  contact: "",  // e.g. mailto:press@nightram.com
};

document.querySelectorAll("[data-link]").forEach((el) => {
  const url = LINKS[el.dataset.link];
  if (url) {
    el.href = url;
    if (!url.startsWith("mailto:")) { el.target = "_blank"; el.rel = "noopener"; }
  } else {
    el.removeAttribute("href");
    el.setAttribute("aria-disabled", "true");
    el.title = "Coming soon";
    if (el.classList.contains("btn")) el.textContent += " · soon";
  }
});
