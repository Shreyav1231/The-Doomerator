import { createClient } from 'redis';

let isMonitoring = false;

const client = createClient({
  password: '*******',
  socket: {
      host: 'redis-11309.c325.us-east-1-4.ec2.cloud.redislabs.com',
      port: 11309
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['isMonitoring'], (data) => {
    isMonitoring = data.isMonitoring || false;
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'scrollEvent' && isMonitoring) {
      const scrollCount = message.data;

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.some((tab) => tab.url === chrome.runtime.getURL('popup.html'))) {
          chrome.tabs.sendMessage(tabs[0].id, { type: 'scrollData', data: scrollCount });
        }
      });
    } else if (message.type === 'startMonitoring') {
      isMonitoring = true;
      chrome.tabs.sendMessage(sender.tab.id, { type: 'monitoring', data: true });

      // Add a listener for scroll data from the content script
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'scrollData') {
          const scrollCount = message.data.scrollCount;
          // ... (process scroll data as needed)
        }
      });
    } else if (message.type === 'stopMonitoring') {
      isMonitoring = false;
      chrome.tabs.sendMessage(sender.tab.id, { type: 'monitoring', data: false });
    } else if (message.type === 'getMonitoringState') {
      sendResponse({ data: isMonitoring });
    }
  });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.some((tab) => tab.url === chrome.runtime.getURL('popup.html'))) {
      chrome.storage.local.get(['totalScrolls'], (data) => {
        const totalScrolls = data.totalScrolls || 0;
        chrome.tabs.sendMessage(tabs[0].id, { type: 'scrollData', data: totalScrolls });
      });
    }
  });
});
