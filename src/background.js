global.browser = require('webextension-polyfill')
const exturl = chrome.extension.getURL('data/data.html');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.ask == "openext") {
      chrome.tabs.create({url: exturl});
      sendResponse({result: true});
    }
  }
);