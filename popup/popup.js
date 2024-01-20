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

  function startMonitoring() {
    doomscrollStatus.textContent = 'Monitoring';
    startTime = new Date();

    // Implement logic to start monitoring (e.g., send a message to content.js)
  }

  function stopMonitoring() {
    doomscrollStatus.textContent = 'Not monitoring';
    const endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000; // in seconds

    totalScrolls++; // For illustration purposes; you should update this based on your actual implementation

    totalScrollsElement.textContent = totalScrolls;
    timeSpentElement.textContent = `${timeDiff.toFixed(2)} seconds`;

    // Implement logic to stop monitoring (e.g., send a message to content.js)
  }
});
