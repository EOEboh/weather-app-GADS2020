// this beforeinstallprompt event notifies the user that the app can be installed in their device
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

// saves event and show install button
deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');

// show install prompt and hide install button
deferredInstallPrompt.prompt();
// Hide the install button, it can't be called twice.
evt.srcElement.setAttribute('hidden', true);

// check what the responded to the install dialogue by checking the promise returned by the userChoice property
deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = null;
    });

    // Add event listener for appinstalled event for alternatively installing the app via Chrome's three dot menu or any other browser's 
window.addEventListener('appinstalled', logAppInstalled);

// Add code to log the event
console.log('Weather App was installed.', evt);