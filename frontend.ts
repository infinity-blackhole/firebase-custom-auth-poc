import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { readFile } from "node:fs/promises";

const firebaseConfigFile = process.argv[2];
const token = process.argv[3];

if (typeof firebaseConfigFile != "string") {
  throw new Error("firebase config is required");
}
if (typeof token != "string") {
  throw new Error("token is required");
}

readFile(firebaseConfigFile, "utf8")
  .then((firebaseConfig) => initializeApp(JSON.parse(firebaseConfig)))
  .then((app) => signInWithCustomToken(getAuth(app), token))
  .then((user) => console.log(user));
