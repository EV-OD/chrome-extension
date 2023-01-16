// Listen for messages from the injected script
chrome.runtime.onMessage.addListener(function(message) {
    // When the injected script sends a message indicating that an element has been clicked,
    // show the popup
    if (message.elementClicked) {
      chrome.browserAction.setPopup({popup: "popup.html"});
    }
  });
  
  // Inject a script into the page that will allow the user to select elements by clicking on them
  chrome.tabs.executeScript({
    file: 'selector.js'
  });
  
  // Listen for messages from the injected script
  chrome.runtime.onMessage.addListener(function(message) {
    // When the injected script sends a message with the selected element's outerHTML,
    // send it to the popup to display it
    if (message.selectedElementOuterHTML) {
      chrome.runtime.sendMessage({
        selectedElementOuterHTML: message.selectedElementOuterHTML
      });
    }
  });
  