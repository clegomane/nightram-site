// Animated loops (docs/site-web.md, "Boucles animées"). Each loop tries media/NAME.webm then media/NAME.mp4 and is
// shown only once its first frame has loaded, so a missing loop simply leaves the still image.
// - <figure class="media" data-loop="NAME">: the video replaces the <img> when the figure nears the screen.
// - <element data-bg-loop="NAME"> (the hero): a background video fades in over the CSS still, loaded at once,
//   skipped when the visitor asked to save data.
// Off screen, loops pause; nothing plays when the visitor asked for reduced motion.
(() => {
  const figures = [...document.querySelectorAll("figure.media[data-loop]")];
  const backgrounds = [...document.querySelectorAll("[data-bg-loop]")];
  if (!figures.length && !backgrounds.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const makeVideo = (name, onReady) => {
    const video = document.createElement("video");
    Object.assign(video, { muted: true, loop: true, playsInline: true, autoplay: true, preload: "auto" });
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    for (const [ext, type] of [["webm", "video/webm"], ["mp4", "video/mp4"]]) {
      const s = document.createElement("source");
      s.src = `media/${name}.${ext}`;
      s.type = type;
      video.appendChild(s);
    }
    video.addEventListener("loadeddata", () => { onReady(video); video.play().catch(() => {}); }, { once: true });
    return video;
  };

  const loadFigure = (fig) => {
    const img = fig.querySelector("img");
    fig._video = makeVideo(fig.dataset.loop, (video) => {
      if (img) { video.poster = img.currentSrc || img.src; video.setAttribute("aria-label", img.alt); img.replaceWith(video); }
      else fig.appendChild(video);
    });
  };

  const loadBackground = (el) => {
    el._video = makeVideo(el.dataset.bgLoop, (video) => {
      video.className = "hero-video";
      video.setAttribute("aria-hidden", "true");
      el.prepend(video);
      void video.offsetWidth; // commit opacity 0 first so the fade runs (rAF never fires in a background tab)
      video.classList.add("ready");
    });
  };

  const saveData = navigator.connection && navigator.connection.saveData;
  if (!saveData) backgrounds.forEach(loadBackground);

  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const el = e.target;
      if (e.isIntersecting) {
        if (!el._video && el.matches("figure.media")) loadFigure(el);
        else if (el._video && el._video.isConnected) el._video.play().catch(() => {});
      } else if (el._video && el._video.isConnected) {
        el._video.pause();
      }
    }
  }, { rootMargin: "300px 0px" });
  figures.forEach((f) => io.observe(f));
  backgrounds.forEach((b) => io.observe(b));
})();
