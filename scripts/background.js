let storedScrollData = 0;

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'scrollEvent') {
      storedScrollData = message.data; // Store scroll count

      // Check if popup is open and forward data
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.some((tab) => tab.url === chrome.runtime.getURL('popup.html'))) {
          chrome.tabs.sendMessage(tabs[0].id, { type: 'scrollData', data: storedScrollData });
          storedScrollData = []; // Clear stored data
        }
      });
    }
  });
});
