import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
    onValue
}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";

const firebaseConfig = {

    apiKey: "AIzaSyDZtvkF-Ps1Hkc6bUm7sBZwsxOVlfyzb30",

    authDomain: "blood-oath-fd412.firebaseapp.com",

    projectId: "blood-oath-fd412",

    storageBucket: "blood-oath-fd412.firebasestorage.app",

    messagingSenderId: "262616465115",

    appId: "1:262616465115:web:31c4dd96cb38ba9bb1d6fe",

    measurementId: "G-4KKMVYLB1G"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export {
    db,
    ref,
    set,
    get,
    onValue
};
