/* ==========================================================
   LOGO INTRO  (logo-intro.js)
   dot drops -> bursts open into the S mark -> colours flip ->
   name + CREATIVE reveal -> overlay fades away, site appears.

   Click the intro to skip it.
   Replay from your own code:  window.playLogoIntro()
   ========================================================== */
(() => {
  /* ---------- CONFIG ---------- */
  const LINE_1 = "Stone & McBea";
  const LINE_2 = "Creative";
  const INTRO_SCALE = 2.1;        // size of the mark during the intro
  const INVERT = true;            // flip to light-on-dark mid-animation
  const ONCE_PER_SESSION = false; // true = only play on the first visit of a browser session
  const HOLD_AT_END = 600;        // ms to hold the finished logo before fading out
  /* ---------------------------- */

  const html = document.documentElement;
  const overlay = document.getElementById("si-overlay");
  if (!overlay) return;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let seen = false;
  try { seen = ONCE_PER_SESSION && sessionStorage.getItem("si-seen") === "1"; } catch (e) {}

  const finishNow = () => {               // remove overlay + unlock page
    overlay.remove();
    html.classList.remove("si-playing");
    window.dispatchEvent(new Event("logo-intro:done"));
  };
  if (reduce || seen) return finishNow();
  try { sessionStorage.setItem("si-seen", "1"); } catch (e) {}

  const $ = id => document.getElementById(id);
  const logo = $("si-logo"), markBox = $("si-markBox");
  const shape = $("si-markShape"), dotWrap = $("si-dotWrap"), dot = $("si-dot");
  const l1 = $("si-l1"), l2 = $("si-l2");
  l1.textContent = LINE_1; l2.textContent = LINE_2;
  dot.style.transformOrigin = "center"; dot.style.transformBox = "fill-box";

  let anims = [], timers = [], ended = false;
  const run = (el, kf, o) => { const a = el.animate(kf, { fill: "both", ...o }); anims.push(a); return a; };
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));

  // Make "CREATIVE" span exactly the same width as the bold line
  function fitLine2() {
    l2.style.letterSpacing = "0px"; l2.style.marginRight = "0px";
    const target  = l1.getBoundingClientRect().width;
    const natural = l2.getBoundingClientRect().width;
    const gaps = Math.max(l2.textContent.length - 1, 1);
    const ls = (target - natural) / gaps;
    l2.style.letterSpacing = ls + "px";
    l2.style.marginRight = (-ls) + "px";
  }

  function leave() {                      // fade the overlay out and reveal the site
    if (ended) return; ended = true;
    timers.forEach(clearTimeout);
    html.classList.remove("si-playing");  // page's own animations start now
    overlay.animate([{ opacity: 1 }, { opacity: 0 }],
      { duration: 650, easing: "ease-in-out", fill: "forwards" }).onfinish = finishNow;
  }

  function play() {
    fitLine2();
    const wrapH  = logo.offsetHeight;
    const markCy = markBox.offsetTop + markBox.offsetHeight / 2;
    const dy = wrapH / 2 - markCy;        // puts the mark at the screen centre
    logo.style.transformOrigin = `50% ${markCy}px`;
    logo.classList.add("si-ready");

    const startT = `translateY(${dy}px) scale(${INTRO_SCALE})`;
    const T = 3150;                       // when the wordmark reveal starts

    run(logo, [{ transform: startT }, { transform: startT }], { duration: T });
    run(l1, [{ transform: "translateY(115%)" }, { transform: "translateY(115%)" }], { duration: T + 350 });
    run(l2.parentElement, [{ clipPath: "inset(0 50% 0 50%)" }, { clipPath: "inset(0 50% 0 50%)" }], { duration: T + 600 });

    /* 1) dot falls with squash & stretch */
    run(shape, [{ clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(0% at 50% 50%)" }], { duration: 1100 });
    run(dotWrap, [{ opacity: 1 }, { opacity: 1 }], { duration: 1200 });
    run(dot, [
      { transform: "translateY(-230px) scale(0)",     offset: 0,   easing: "cubic-bezier(.3,1.6,.6,1)" },
      { transform: "translateY(-230px) scale(1)",     offset: .2,  easing: "cubic-bezier(.55,0,1,.6)" },
      { transform: "translateY(-12px) scale(.7,1.8)", offset: .68, easing: "linear" },
      { transform: "translateY(0) scale(1.9,.45)",    offset: .82, easing: "cubic-bezier(.2,.8,.4,1)" },
      { transform: "translateY(0) scale(1,1)",        offset: 1 }
    ], { duration: 1100 });

    /* 2) dot bursts open into the mark (circular reveal) */
    run(dotWrap, [{ opacity: 1 }, { opacity: 0 }], { delay: 1200, duration: 350 });
    run(shape, [{ clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(78% at 50% 50%)" }],
        { delay: 1100, duration: 750, easing: "cubic-bezier(.45,0,.15,1)" });
    run(markBox, [{ transform: "scale(.88)" }, { transform: "scale(1.04)", offset: .6 }, { transform: "scale(1)" }],
        { delay: 1100, duration: 900, easing: "cubic-bezier(.3,.7,.3,1)" });

    /* 3) colours flip */
    if (INVERT) later(() => overlay.classList.add("si-inverted"), 2450);

    /* 4) mark settles into place, text reveals */
    run(logo, [{ transform: startT }, { transform: "translateY(0) scale(1)" }],
        { delay: T, duration: 1000, easing: "cubic-bezier(.7,0,.15,1)" });
    run(l1, [{ transform: "translateY(115%)" }, { transform: "translateY(0)" }],
        { delay: T + 350, duration: 800, easing: "cubic-bezier(.2,.8,.2,1)" });
    run(l2.parentElement, [{ clipPath: "inset(0 50% 0 50%)" }, { clipPath: "inset(0 0% 0 0%)" }],
        { delay: T + 600, duration: 900, easing: "cubic-bezier(.3,.6,.2,1)" });

    /* 5) hold, then reveal the site */
    later(leave, T + 1500 + HOLD_AT_END);
  }

  overlay.addEventListener("click", leave);   // tap to skip
  window.playLogoIntro = () => location.reload();   // simplest reliable replay

  const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise(r => setTimeout(r, 1200))]).then(play);
})();
