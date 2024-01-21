let isMonitoring = false;
let popupOpen = false;
let storedScrollData = 0;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['isMonitoring', 'totalScrolls'], (data) => {
    isMonitoring = data.isMonitoring || false;
    storedScrollData = data.totalScrolls || 0;
  });

  chrome.storage.local.set({ popupOpen: false }, () => {
    console.log('Initial popupOpen state set:', false);
  });

 
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'scrollEvent') {
      storedScrollData = message.data; // Store scroll count
      console.log("Scroll Data "+ storedScrollData)
       chrome.storage.local.get(['popupOpen'], (data) => {
         popupOpen = data.popupOpen || false;
       });

      if(popupOpen) {
        console.log("Scroll ")
        chrome.storage.local.set({ totalScrolls: storedScrollData }, () => {
            console.log('Storing scroll data');
          });
          chrome.runtime.sendMessage({ type: 'scrollData', data: storedScrollData });
      } else {
        console.log("Popup is not currently open.");
      }
    }
  });
});


