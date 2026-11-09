// Gallery viewer: a click on a gallery image opens it full screen instead of leaving the page.
// Close: click outside the image, the X, or Escape. Previous / next: the arrows or the arrow keys.
(() => {
  const links = [...document.querySelectorAll(".gallery a")];
  if (!links.length) return;

  const box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.innerHTML =
    '<button class="lb-close" aria-label="Close">&times;</button>' +
    '<button class="lb-prev" aria-label="Previous image">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lb-next" aria-label="Next image">&#8250;</button>';
  document.body.appendChild(box);
  const img = box.querySelector("img");
  let index = 0;

  const show = (i) => {
    index = (i + links.length) % links.length;
    img.src = links[index].href;
    img.alt = links[index].querySelector("img")?.alt || "";
  };
  const open = (i) => { show(i); box.hidden = false; document.body.style.overflow = "hidden"; box.querySelector(".lb-close").focus(); };
  const close = () => { box.hidden = true; document.body.style.overflow = ""; links[index].focus(); };

  links.forEach((a, i) => a.addEventListener("click", (e) => { e.preventDefault(); open(i); }));
  // Anything but the image and the arrows closes it (the dark backdrop, the X).
  box.addEventListener("click", (e) => {
    if (e.target.closest(".lb-prev")) show(index - 1);
    else if (e.target.closest(".lb-next")) show(index + 1);
    else if (e.target !== img) close();
  });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
  });
})();
