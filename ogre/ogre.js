
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
  document.querySelectorAll("ytd-guide-section-renderer, ytd-mini-guide-entry-renderer")
    .forEach(element => {
      const text = element.textContent;
      const ariaLabel = element.getAttribute("aria-label") 
                     || element.querySelector("[aria-label]")?.getAttribute("aria-label");
      
      if (text.includes("Home") || text.includes("Shorts") || ariaLabel === "Home" || ariaLabel === "Shorts") {
        element.remove();
      }
    });
}

function start_at_subscriptions(){
  window.location.replace("https://www.youtube.com/feed/subscriptions");
}

function remove_recommendations(){
    document.querySelectorAll("ytd-watch-flexy"
    ).forEach(element => {
        const rec = element.querySelector("#secondary")
        if(rec){
            rec.remove()
        }
    })
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
    }
}

let debounceTimer;
const observer = new MutationObserver(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(main, 100);
});
observer.observe(document.body, { childList: true, subtree: true });