document.addEventListener('DOMContentLoaded', function () {
     let isMonitoring = false;
    const doomscrollStatusElement = document.getElementById('doomscrollStatus');
    const toggleMonitoringButton = document.getElementById('toggleMonitoring');
    const totalScrollsElement = document.getElementById('totalScrolls');
    const dashboardButton = createDashboardButton(); // Create dashboard button
    totalScrollsElement.textContent = 0;

    function createDashboardButton() {
      const button = document.createElement('button');
      button.textContent = 'Open Dashboard';
      button.classList.add('dashboard-button'); // Add a new class for styling
      button.addEventListener('click', openDashboard);
      document.body.appendChild(button);
      return button;
    }

    function openDashboard() {
      const dashboardURL = chrome.runtime.getURL('dashboard/dashboard.html');
      window.open(dashboardURL, '_blank');
    }
  
    // Retrieve initial monitoring state and scroll count from background
    chrome.storage.local.get(['isMonitoring', 'totalScrolls', 'popupOpen'], (data) => {
      isMonitoring = data.isMonitoring || false;
      totalScrollsElement.textContent = data.totalScrolls || 0;
      popupOpen = data.popupOpen;
      updateDoomscrollStatus();
    });

    chrome.storage.local.set({ popupOpen: true }, () => {
      console.log('Popup opened:', true);
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
        chrome.storage.local.get(['totalScrolls'], (data) => {
          totalScrolls = data.totalScrolls
        })
        updateDoomscrollStatus(); // Update UI with new scroll count
      }
    });

    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        chrome.storage.local.set({ popupOpen: false }, () => {
          console.log('Popup opened:', false);
        });
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

        totalScrollsElement.textContent = totalScrolls
    }
  }
);