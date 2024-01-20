document.addEventListener('DOMContentLoaded', function () {
    let isMonitoring = false;
    const doomscrollStatusElement = document.getElementById('doomscrollStatus');
    const toggleMonitoringButton = document.getElementById('toggleMonitoring');
    const totalScrollsElement = document.getElementById('totalScrolls');
  
    // Retrieve initial monitoring state and scroll count from background
    chrome.storage.local.get(['isMonitoring', 'totalScrolls'], (data) => {
      isMonitoring = data.isMonitoring || false;
      totalScrollsElement.textContent = data.totalScrolls || 0;
      updateDoomscrollStatus();
    });
  
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'scrollData') {
        const receivedScrollCount = message.data;
        totalScrollsElement.textContent = receivedScrollCount; // Update UI
        chrome.storage.local.set({ totalScrolls: receivedScrollCount }, () => {
          console.log('Scroll count stored in local storage:', receivedScrollCount);
        });
      } else if (message.type === 'monitoring') {
        isMonitoring = message.data;
        updateDoomscrollStatus();
      }
    });
  
    toggleMonitoringButton.addEventListener('click', function () {
      isMonitoring = !isMonitoring;
      updateDoomscrollStatus();
  
      if (isMonitoring) {
        chrome.runtime.sendMessage({ type: 'startMonitoring' });
      } else {
        chrome.runtime.sendMessage({ type: 'stopMonitoring' });
      }
  
      chrome.storage.local.set({ isMonitoring: isMonitoring }, () => {
        console.log('Monitoring state saved:', isMonitoring);
      });
    });
  
    // Listen for scroll data from background
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'scrollData') {
        const receivedScrollCount = message.data;
        totalScrolls = receivedScrollCount; // Update totalScrolls
        localStorage.setItem('totalScrolls', totalScrolls); // Save to LocalStorage
        updateDoomscrollStatus(); // Update UI with new scroll count
      }
    });
  
    chrome.runtime.sendMessage({ type: 'requestScrollData' }); // Request data on popup open
  
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'scrollData') {
        const receivedScrollCount = message.data;
        totalScrolls = receivedScrollCount; // Update totalScrolls
        localStorage.setItem('totalScrolls', totalScrolls); // Save to LocalStorage
        updateDoomscrollStatus(); // Update UI with new scroll count
      }
    });
  
    function startMonitoring() {
      doomscrollStatusElement.textContent = 'Monitoring';
      startTime = new Date();
      toggleMonitoringButton.classList.add('monitoring');
  
      // Implement logic to start monitoring (e.g., send a message to content.js)
    }
  
    function stopMonitoring() {
      doomscrollStatusElement.textContent = 'Not monitoring';
      toggleMonitoringButton.classList.remove('monitoring');
  
      // Implement logic to stop monitoring (e.g., send a message to content.js)
  
      // Remove seconds feature:
      timeSpentElement.textContent = 'Time spent: Calculating...'; // Display a placeholder while monitoring
    }
  
    function updateDoomscrollStatus() {
        if (isMonitoring) {
          doomscrollStatusElement.textContent = 'Monitoring doomscrolls...';
          toggleMonitoringButton.classList.add('monitoring');
        } else {
          doomscrollStatusElement.textContent = 'Not monitoring';
          toggleMonitoringButton.classList.remove('monitoring');
        }
      }
    }
);