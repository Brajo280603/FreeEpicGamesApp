/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
}

const installBtn = document.getElementById('downloadBtn')
// This variable will save the event for later use.
let deferredPrompt
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevents the default mini-infobar or install dialog from appearing on mobile
  e.preventDefault()
  // Save the event because you'll need to trigger it later.
  deferredPrompt = e
  // Show your customized install prompt for your PWA
  // Your own UI doesn't have to be a single element, you
  // can have buttons in different locations, or wait to prompt
  // as part of a critical journey.
  showInAppInstallPromotion()
})

function showInAppInstallPromotion () {
  installBtn.style.display = 'initial'
  console.log('btn shown')
}

installBtn.addEventListener('click', () => {
  triggerInstall()
})

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

function triggerInstall () {
  deferredPrompt.prompt()
  console.log('event triggered')
}

//  not used due to no notification support
// function notifyMe() {
//   if (!("Notification" in window)) {
//     // Check if the browser supports notifications
//     alert("This browser does not support desktop notification");
//   } else if (Notification.permission === "granted") {
//     // Check whether notification permissions have already been granted;
//     // if so, create a notification
//     const notification = new Notification("Hi there!");
//     // …
//   } else if (Notification.permission !== "denied") {
//     // We need to ask the user for permission
//     Notification.requestPermission().then((permission) => {
//       // If the user accepts, let's create a notification
//       if (permission === "granted") {
//         const notification = new Notification("Hi there!");
//         // …
//       }
//     });
//   }

//   // At last, if the user has denied notifications, and you
//   // want to be respectful there is no need to bother them anymore.
// }

// let isInstalled = window.localStorage.getItem('pwaInstalled') === '1' || false

if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
  // User is currently navigating on the PWA so yes it's installed
  window.localStorage.setItem('pwaInstalled', '1')
  // isInstalled = true
} else {
  //  User is navigating in browser
  window.addEventListener('beforeinstallprompt', () => {
    window.localStorage.setItem('pwaInstalled', '0')
    // isInstalled = false
    //  User can get an installation prompt meaning the app is not installed
  })
  window.addEventListener('onappinstalled', () => {
    window.localStorage.setItem('pwaInstalled', '1')
    // isInstalled = true
  })
}

console.log(`%c
███████╗██████╗ ███████╗███████╗    ███████╗██████╗ ██╗ ██████╗     ██████╗  █████╗ ███╗   ███╗███████╗███████╗     █████╗ ██████╗ ██████╗ 
██╔════╝██╔══██╗██╔════╝██╔════╝    ██╔════╝██╔══██╗██║██╔════╝    ██╔════╝ ██╔══██╗████╗ ████║██╔════╝██╔════╝    ██╔══██╗██╔══██╗██╔══██╗
█████╗  ██████╔╝█████╗  █████╗      █████╗  ██████╔╝██║██║         ██║  ███╗███████║██╔████╔██║█████╗  ███████╗    ███████║██████╔╝██████╔╝
██╔══╝  ██╔══██╗██╔══╝  ██╔══╝      ██╔══╝  ██╔═══╝ ██║██║         ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║    ██╔══██║██╔═══╝ ██╔═══╝ 
██║     ██║  ██║███████╗███████╗    ███████╗██║     ██║╚██████╗    ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗███████║    ██║  ██║██║     ██║     
╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝    ╚══════╝╚═╝     ╚═╝ ╚═════╝     ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝    ╚═╝  ╚═╝╚═╝     ╚═╝     
                                                                                                                                           
`, 'color: #0d6efd;')
