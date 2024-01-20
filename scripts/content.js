let scrollCount = 0;

const targetURLs = [
  'https://www.instagram.com',
  'https://www.youtube.com/shorts'
];

window.addEventListener('scroll', () => {
  if (targetURLs.includes(window.location.href)) {
    scrollCount++;
    console.log("Scroll " + scrollCount);
    chrome.runtime.sendMessage({ type: 'scrollEvent', data: scrollCount });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'startMonitoring') {
    // Start sending scroll events to the background script
    window.addEventListener('scroll', () => {
      if (targetURLs.includes(window.location.href)) {
        const scrollData = { scrollCount: scrollCount };
        chrome.runtime.sendMessage({ type: 'scrollData', data: scrollData });
      }
    });
  } else if (message.type === 'stopMonitoring') {
    // Stop sending scroll events
    window.removeEventListener('scroll', () => {});
  }
});
