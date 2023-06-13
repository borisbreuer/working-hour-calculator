
async function register() {
    try {
        await navigator.serviceWorker.register('../sw.js', { scope: '/' })
    } catch (error) {
        console.error(`Registration failed with ${error}`);
    }
}

// function notifyMe(message, optoions = {}) {
//     if (!("Notification" in window)) {
//         alert("This browser does not support desktop notification")
//     } else if (Notification.permission === "granted") {
//         if (!!message) return new Notification(message, optoions);
//     } else if (Notification.permission !== "denied") {
//         // We need to ask the user for permission
//         Notification.requestPermission().then((permission) => {
//             if (permission === "granted") {
//                 new Notification("Thank you :)")
//             }
//         });
//     }
// }

// addEventListener("notificationclick", (e) => {
//     console.log(e)
// });

async function regServiceWorker() {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
            // registration.addEventListener("updatefound", () => {
            //     registration.addEventListener('notificationclick', async () => {
            //         console.log('Updated');
            //         await registration.update()
            //     })
            //     const text = 'Update Available'
            //     registration.showNotification(text, { actions: [{ action: "update", title: "Update now" }] })
                
            //     // if (confirm(text) == true) {
                    
            //     // } 
            // });
        }
        await register()
    }
}
regServiceWorker()