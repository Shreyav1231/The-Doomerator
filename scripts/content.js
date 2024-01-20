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

// window.addEventListener('scroll', () => {
//     scrollCount++;
//     alert("Scroll " + scrollCount)
//     console.log("Scroll " + scrollCount)
//     chrome.runtime.sendMessage({ type: 'scrollEvent', data: scrollCount });
// });


// Wait for the signal from the popup to start sending scroll data

window.addEventListener('scroll', () => {
    scrollCount++;
    alert("Scroll " + scrollCount)
    console.log("Scroll " + scrollCount)
    chrome.runtime.sendMessage({ type: 'scrollEvent', data: scrollCount });
});



//   window.addEventListener('beforeunload', (event) => {
//     // Prompt the user for confirmation
//     event.preventDefault();
//     event.returnValue = '';
//   });


