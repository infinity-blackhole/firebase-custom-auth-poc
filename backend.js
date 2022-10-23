import { initializeApp, credential, auth } from "firebase-admin";
import serviceAccount from "./key.json";

initializeApp({
  credential: credential.cert(serviceAccount),
  databaseURL:
    "https://bdz-cnd-transcoder-dev-default-rtdb.europe-west1.firebasedatabase.app",
});

auth()
  .createCustomToken("truc@gmail.com")
  .then((customToken) => {
    console.log(customToken);
  })
  .catch((error) => {
    console.log("Error creating custom token:", error);
  });
