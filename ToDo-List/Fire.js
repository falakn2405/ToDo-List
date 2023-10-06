import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCsH2TIw4ivqcrH-ocUWEJXSVhZLXnGEqI",
    authDomain: "todo-list-32a62.firebaseapp.com",
    projectId: "todo-list-32a62",
    storageBucket: "todo-list-32a62.appspot.com",
    messagingSenderId: "159364081109",
    appId: "1:159364081109:web:10a41dab667577e047895c"
};

class Fire {
    constructor(callback) {
        this.init(callback);
    }
  
    async init(callback) {
        try {
            if (!initializeApp.apps.length) {
                initializeApp(firebaseConfig);
            }
  
            const auth = getAuth();
  
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    callback(null, user);
                } else {
                    try {
                        await signInAnonymously(auth);
                    } catch (error) {
                        callback(error);
                    }
                }
            });
        } catch (error) {
            callback(error);
        }
    }
}
  
export default Fire;
