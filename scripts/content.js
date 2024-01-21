let scrollCount = 0;

const targetURLs = [
  'https://www.instagram.com/',
  'https://www.youtube.com/shorts',
  'https://www.twitter.com/',
  'https://www.tiktok.com/'
];

const messages = [
    "Warning: You're doomscrolling.",
    "Your laptop will shutdown soon ☠️",
    "QUIT SCROLLING",
    "STOP",
    "Stop, get some help"
]

let isMonitoring = false;

const scrollListener = () => {
    chrome.storage.local.get(['isMonitoring'], (data) => {
      isMonitoring = data.isMonitoring;
  
      if (isMonitoring) {
        console.log(window.location.href);
        if (targetURLs.includes(window.location.href)) {
          console.log("Sending");
          scrollCount++;
          console.log("Scroll " + scrollCount);
          if (scrollCount > 400 && scrollCount < 600) {
            customAlert("☠️");
          } else if (scrollCount > 600) {
            // ...
          }
          chrome.runtime.sendMessage({ type: 'scrollEvent', data: scrollCount });
        }
      }
    });
  };
 



// Wait for the signal from the popup to start sending scroll data

 window.addEventListener('scroll', () => 
{
  //if (targetURLs.includes(window.location.href)) {
        chrome.storage.local.get(['isMonitoring'], (data) => {
            isMonitoring = data.isMonitoring;
        })

        if(isMonitoring) {
            console.log(window.location.href)
            if (targetURLs.includes(window.location.href)) {
                console.log("Sending")
                scrollCount++;
                //alert("Scroll " + scrollCount)
                console.log("Scroll " + scrollCount);
                if(scrollCount > 400 && scrollCount < 600) {
                    customAlert(messages[0])
                } else if (scrollCount > 600 && scrollCount <1200) {
                    customAlert(messages[Math.floor(Math.random()*3) + 1])
                    new Promise((resolve) => setTimeout(resolve, Math.random() * 2000)); // Delay 1-2 seconds
                } else if(scrollCount > 1200) {
                    alert(messages[Math.floor(Math.random()*3) + 1])
                }
                chrome.runtime.sendMessage({ type: 'scrollEvent', data: scrollCount });

            }
        }
            
})

function customAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('custom-alert');
    alertDiv.style.position = 'fixed'; // Position absolutely for flexibility
    alertDiv.style.left = '20%'; // Adjust left position as needed
    alertDiv.style.top = '50%'; // Center vertically
    alertDiv.style.transform = 'translateY(-50%)'; // Fine-tune vertical positioning
    alertDiv.style.padding = '10px 20px'; // Add padding
    alertDiv.style.border = '1px solid #ccc'; // Add a border
    alertDiv.style.borderRadius = '5px'; // Make it slightly rounded
    alertDiv.style.width = '60%'
    alertDiv.style.backgroundColor = '#f5f5f5'; // Light gray background
    alertDiv.style.color = 'black'; // Black text for contrast
  
    alertDiv.textContent = " " + message; // Add the skull emote
  
    document.body.appendChild(alertDiv);
  
    // Add animation or styling to the alertDiv (optional)
    // ...
  
    setTimeout(() => {
      document.body.removeChild(alertDiv);
    }, 3000); // Example timeout for 3 seconds
  }

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'startMonitoring') {
    
    console.log("Sending")
    // Start sending scroll events to the background script
    window.addEventListener('scroll', () => {
    //   if (targetURLs.includes(window.location.href)) {
        scrollCount++;
        chrome.runtime.sendMessage({ type: 'scrollEvent', data: scrollCount });
     // }
    });
  } else if (message.type === 'stopMonitoring') {
    // Stop sending scroll events
    window.removeEventListener('scroll', () => {});
  }
});
