import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {

};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const Sendrequest = () => {
  console.log("Requesting User Permission......");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted.");

      return getToken(messaging, { vapidKey: `` })
        .then((currentToken) => {
          if (currentToken) {
            console.log('Client Token: ', currentToken);

            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('../firebase-messaging-sw.js')
                .then(function (registration) {
                  console.log('Registration successful, scope is:', registration.scope);
                }).catch(function (err) {
                  console.log('Service worker registration failed, error:', err);
                });
            }
          } else {

            console.log('Failed to generate the registration token.');
          }
        })
        .catch((err) => {
          console.log('An error occurred when requesting to receive the token.', err);
        });
    } else {
      console.log("User Permission Denied.");
    }
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('test: ', payload)
      resolve(payload);
    });
  });

Sendrequest();