

document.getElementById('enable-button').addEventListener('click', function(event) {
    event.preventDefault();
    // Send a message to the content script running in the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'enable' });
    });
  });

document.getElementById('disable-button').addEventListener('click', function(event) {
    event.preventDefault();
    // Send a message to the content script running in the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'disable' });
    });
});

  