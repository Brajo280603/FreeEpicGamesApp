/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
  }


let installBtn = document.getElementById("downloadBtn");
  // This variable will save the event for later use.
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevents the default mini-infobar or install dialog from appearing on mobile
  e.preventDefault();
  // Save the event because you'll need to trigger it later.
  deferredPrompt = e;
  // Show your customized install prompt for your PWA
  // Your own UI doesn't have to be a single element, you
  // can have buttons in different locations, or wait to prompt
  // as part of a critical journey.
  showInAppInstallPromotion();
});


function showInAppInstallPromotion(){
  installBtn.style.display = "initial";
  console.log("btn shown")
}

// // Gather the data from your custom install UI event listener
// installButton.addEventListener('click', async () => {
//   // deferredPrompt is a global variable we've been using in the sample to capture the `beforeinstallevent`
//   deferredPrompt.prompt();
//   // Find out whether the user confirmed the installation or not
//   const { outcome } = await deferredPrompt.userChoice;
//   // The deferredPrompt can only be used once.
//   deferredPrompt = null;
//   // Act on the user's choice
//   if (outcome === 'accepted') {
//     console.log('User accepted the install prompt.');
//   } else if (outcome === 'dismissed') {
//     console.log('User dismissed the install prompt');
//   }
// });


function triggerInstall (){
  deferredPrompt.prompt();
  console.log("event triggered");
}