/** localStorage key for the visitor's light/dark choice. Server-safe, so the root layout can import it. */
export const THEME_KEY = "jmj-theme";

/**
 * Inline script for <head>: applies the stored choice (or the system setting)
 * before the page paints, so there is no flash of the wrong theme. It also
 * marks <html> with "js" so scroll-reveal styles only apply when JS runs, and
 * with "intro-seen" when the loader already played this session.
 */
export const THEME_SCRIPT = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.dataset.theme=t;if(sessionStorage.getItem("jmj-intro")==="1")d.classList.add("intro-seen")}catch(e){d.dataset.theme="light"}})()`;
