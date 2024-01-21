let scrollCount = 0;

const targetURLs = [
  'https://www.instagram.com',
  'https://www.youtube.com/shorts',
  'https://www.twitter.com',
  'https://www.tiktok.com'
];

let isMonitoring = false;



// Wait for the signal from the popup to start sending scroll data

window.addEventListener('scroll', () => {
  //if (targetURLs.includes(window.location.href)) {
    //if(isMonitoring) {
        chrome.storage.local.get(['isMonitoring'], (data) => {
            isMonitoring = data.isMonitoring;
        })

        if(isMonitoring) {
            console.log("Sending")
            scrollCount++;
            //alert("Scroll " + scrollCount)
            console.log("Scroll " + scrollCount);
            chrome.runtime.sendMessage({ type: 'scrollEvent', data: scrollCount });
        }
        
    //}
    
  //}
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'startMonitoring') {
    console.log("Sending")
    // Start sending scroll events to the background script
    window.addEventListener('scroll', () => {
    //   if (targetURLs.includes(window.location.href)) {
        scrollCount++;
        chrome.runtime.sendMessage({ type: 'scrollEvent', data: scrollCount });
     // }
    });
  } else if (message.type === 'stopMonitoring') {
    // Stop sending scroll events
    window.removeEventListener('scroll', () => {});
  }
});
