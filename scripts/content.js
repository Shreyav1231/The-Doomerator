let scrollCount = 0; 

const targetURLs = [
    'https://www.instagram.com',
    'https://www.youtube.com/shorts'
  ];


//   window.addEventListener('scroll', () => {
//     if(targetURLs.includes(window.location.href)) {
//         scrollCount++;
//         console.log('Scroll count:', scrollCount);
//         if(scrollCount > 5) {

//         }
//     }
//   });



// Wait for the signal from the popup to start sending scroll data

window.addEventListener('scroll', () => {
    scrollCount++;
    alert("Scroll " + scrollCount)
    console.log("Scroll " + scrollCount)
    chrome.runtime.sendMessage({ type: 'scrollEvent', data: scrollCount });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'monitoring') {
      const scrollCounts = message.data;
      // Update popup UI with scrollCounts
      const receivedScrollCount = message.data; // Access the scrollCount directly
      totalScrolls = receivedScrollCount;
      updateDoomscrollStatus()
  }});


//   window.addEventListener('beforeunload', (event) => {
//     // Prompt the user for confirmation
//     event.preventDefault();
//     event.returnValue = '';
//   });


