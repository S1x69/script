self.addEventListener("push", (event) => {
    const notification = event.data.json();
    // {"title":"Hi" , "body":"something amazing!" , "url":"./?message=123"}
    event.waitUntil(self.registration.showNotification(notification.title, {
        body: notification.body,
        icon: "https://cdn-icons-png.flaticon.com/512/2275/2275981.png",
        data: {
            notifURL: notification.url
        }
    }));
});

self.addEventListener("notificationclick", (event) => {
    event.waitUntil(clients.openWindow(event.notification.data.notifURL));
});