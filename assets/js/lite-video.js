/* Click-to-load video embeds. Nothing is requested from YouTube or Vimeo
   until the visitor actually clicks play. */
(function () {
  "use strict";

  function play(facade) {

    var provider = facade.dataset.provider;
    var id = facade.dataset.id;
    var src =
      provider === "vimeo"
        ? "https://player.vimeo.com/video/" + id + "?autoplay=1&byline=0&portrait=0"
        : "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";

    var iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = facade.dataset.title || "Video player";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";

    facade.replaceChildren(iframe);
    facade.removeAttribute("data-provider");
    facade.removeAttribute("role");
    facade.removeAttribute("tabindex");
    iframe.focus();
  }

  document.addEventListener("click", function (event) {
    var facade = event.target.closest(".vid[data-provider]");
    if (facade) play(facade);
  });

  /* The facade is a div acting as a button, so wire up the keys a button
     would respond to. */
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar") return;
    var facade = event.target.closest(".vid[data-provider]");
    if (!facade) return;
    event.preventDefault();
    play(facade);
  });

  /* Reveal sections as they scroll into view. */
  var targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    targets.forEach(function (el) { observer.observe(el); });
  }

  /* Hairline under the sticky header once the page scrolls. */
  var masthead = document.querySelector(".masthead");
  if (masthead) {
    var onScroll = function () {
      masthead.classList.toggle("is-stuck", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
