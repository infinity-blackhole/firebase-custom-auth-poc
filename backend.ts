import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFile } from "node:fs/promises";

const keyFile = process.argv[2];
const uid = process.argv[3];
const databaseURL = process.argv[4];

if (typeof keyFile != "string") {
  throw new Error("key file is required");
}
if (typeof uid != "string") {
  throw new Error("uid is required");
}
if (typeof databaseURL != "string") {
  throw new Error("database url is required");
}

readFile(keyFile, "utf8")
  .then((sa) =>
    initializeApp({
      credential: cert(JSON.parse(sa)),
      databaseURL,
    })
  )
  .then((app) => getAuth(app).createCustomToken(uid))
  .then((customToken) => console.log(customToken))
  .catch((error) => console.log("Error creating custom token:", error));
