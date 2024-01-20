document.addEventListener('DOMContentLoaded', function () {
  const doomscrollStatus = document.getElementById('doomscrollStatus');
  const toggleMonitoringButton = document.getElementById('toggleMonitoring');
  const totalScrollsElement = document.getElementById('totalScrolls');
  const timeSpentElement = document.getElementById('timeSpent');

  let isMonitoring = false;
  let totalScrolls = 0;
  let startTime;

  toggleMonitoringButton.addEventListener('click', function () {
    isMonitoring = !isMonitoring;

    if (isMonitoring) {
      startMonitoring();
    } else {
      stopMonitoring();
    }
  });

  //  window.addEventListener('scroll', () => {
  //   alert("scroll")
  //   if(isMonitoring) {
  //     totalScrolls++;
  //     totalScrollsElement.textContent = totalScrolls;
  //   }
  //  });

//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'scrollEvent') {
//         const receivedScrollCount = message.data; // Access the scrollCount directly
//         totalScrolls = receivedScrollCount;
//         function updateDoomscrollStatus() {
//           if (isMonitoring) {
//               doomscrollStatusElement.textContent = 'Monitoring doomscrolls...';
//           } else {
//               doomscrollStatusElement.textContent = 'Not monitoring';
//           }
//       }
//         // Example: Update an element in your popup's HTML
//         totalScrollsElement.textContent = totalScrolls;
//     }
// });

chrome.runtime.sendMessage({ type: 'requestScrollData' }); // Request data on popup open

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'scrollData') {
    const scrollCounts = message.data;
    // Update popup UI with scrollCounts
    const receivedScrollCount = message.data; // Access the scrollCount directly
    totalScrolls = receivedScrollCount;
    updateDoomscrollStatus()
}});

  function startMonitoring() {
    doomscrollStatus.textContent = 'Monitoring';
    startTime = new Date();

    // Implement logic to start monitoring (e.g., send a message to content.js)
  }

  function stopMonitoring() {
    doomscrollStatus.textContent = 'Not monitoring';
    const endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000; // in seconds

    //totalScrolls++; // For illustration purposes; you should update this based on your actual implementation

    totalScrollsElement.textContent = totalScrolls;
    timeSpentElement.textContent = `${timeDiff.toFixed(2)} seconds`;

    // Implement logic to stop monitoring (e.g., send a message to content.js)
  }
});

function updateDoomscrollStatus() {
  if (isMonitoring) {
      doomscrollStatusElement.textContent = 'Monitoring doomscrolls...';
  } else {
      doomscrollStatusElement.textContent = 'Not monitoring';
  }

  totalScrollsElement.textContent = totalScrolls;
}
