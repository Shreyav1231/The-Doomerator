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

window.addEventListener('scroll', () => {
    const scrollData = { // Object containing relevant scroll information };
    chrome.runtime.sendMessage({ type: 'scrollEvent', data: scrollData })
  }});

//   window.addEventListener('beforeunload', (event) => {
//     // Prompt the user for confirmation
//     event.preventDefault();
//     event.returnValue = '';
//   });


