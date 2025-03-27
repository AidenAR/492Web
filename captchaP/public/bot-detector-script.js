function detectBot() {
    const indicators = {        // the potential indicators of bots
        webDriver: navigator.webdriver,
        headlessBrowser: navigator.userAgent.includes("Headless"),
        noLanguages: (navigator.languages?.length || 0) === 0,
        inconsistentEval: detectInconsistentEval(),
        domManipulation: document.documentElement
        .getAttributeNames()
        .some((attr) => ["selenium", "webdriver", "driver"].includes(attr)),
    };
  
    let verdict = false;        // default verdict
  
    // iterate over the potential bot indicators
    for (const i in indicators) {
        if (indicators[i]) {    // if any are true, set verdict to true
            verdict = true;
        }
    }

    return verdict;
}
  
function detectInconsistentEval() {
    let length = eval.toString().length;
    let userAgent = navigator.userAgent.toLowerCase();
    let browser;
  
    // determining which browser is being used
    if (userAgent.indexOf("edg/") !== -1) { browser = "edge"; } 
    else if (userAgent.indexOf("trident") !== -1 || userAgent.indexOf("msie") !== -1) { browser = "internet_explorer"; } 
    else if (userAgent.indexOf("firefox") !== -1) { browser = "firefox"; } 
    else if (userAgent.indexOf("opera") !== -1 || userAgent.indexOf("opr") !== -1) { browser = "opera"; } 
    else if (userAgent.indexOf("chrome") !== -1) { browser = "chrome"; } 
    else if (userAgent.indexOf("safari") !== -1) { browser = "safari"; } 
    else { return false; }      // if we don't know the browser, can't make any assumptions based on eval
  
    return ((length === 33 && !["chrome", "opera", "edge"].includes(browser)) ||
            (length === 37 && !["firefox", "safari"].includes(browser)) ||
            (length === 39 && !["internet_explorer"].includes(browser)));
}

// display the results
const verdict = detectBot();
document.getElementById("result").innerHTML = verdict ? "Bot Detected 🤖" : "Human User Detected 😃";