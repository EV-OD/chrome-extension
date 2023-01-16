// Add a click listener to the page
document.addEventListener("click", function(event) {
    // Send a message to the background script indicating that an element has been clicked
    chrome.runtime.sendMessage({
      elementClicked: true
    });
  });
  