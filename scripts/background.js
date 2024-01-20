let storedScrollData = 0;

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'scrollEvent') {
      storedScrollData = message.data; // Store scroll count
      console.log("Scroll Data "+ storedScrollData)
      // Check if popup is open and forward data
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const popupTab = tabs.find((tab) => tab.url === chrome.runtime.getURL('popup.html'));
      
        if (popupTab) {
          chrome.tabs.sendMessage(popupTab.id, { type: 'scrollData', data: storedScrollData });
        } else {
          // Handle the case where the popup is not open
          console.log("Popup is not currently open.");
          // You might consider storing the data temporarily or taking other actions
        }
      });
    }
  });
});

// Also listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'requestScrollData') {
      chrome.tabs.sendMessage(sender.tab.id, { type: 'scrollData', data: storedScrollData });
    }
  });
