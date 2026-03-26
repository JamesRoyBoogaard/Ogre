function remove_shorts() {
  document.querySelectorAll([
    "ytm-shorts-lockup-view-model",
    "ytd-reel-item-renderer",
    "a[href*='/shorts/']"
  ].join(",")).forEach(el => {
    el.closest("ytd-rich-item-renderer") ?.remove() || el.remove();
  });
}

function remove_home_and_shorts_options() {
  document.querySelectorAll("ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer")
    .forEach(el => {
      const label = el.querySelector("yt-formatted-string, .title")?.textContent?.trim();
      if (label === "Home" || label === "Shorts") el.remove();
    });
}

let redirected = false;
function start_at_subscriptions() {
  if (redirected) return;
  redirected = true;
  window.location.replace("https://www.youtube.com/feed/subscriptions");
}

function remove_recommendations(){
    document.querySelectorAll("ytd-watch-flexy"
    ).forEach(element => {
        const rec = element.querySelector("#secondary");
        const related = element.querySelector("#related");
        if (rec) rec.remove();
        if (related) related.remove();
    })
}

function remove_end_suggestions() {
  document.querySelectorAll([
    ".ytp-suggestion-set",         
    ".ytp-fullscreen-grid",        
    ".ytp-ce-element",             
    "ytd-endscreen-renderer",      
  ].join(",")).forEach(el => el.remove());
}

function main(){
    const current_window = window.location.pathname;
    if (current_window === "/") {
      start_at_subscriptions();
    }else if(current_window === "/feed/subscriptions"){
      remove_shorts();
      remove_home_and_shorts_options();
    }else if(current_window.startsWith("/watch")){
      remove_recommendations();
      remove_end_suggestions();
    }
}

let debounceTimer;
const observer = new MutationObserver(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(main, 100);
});
observer.observe(document.body, { childList: true, subtree: true });