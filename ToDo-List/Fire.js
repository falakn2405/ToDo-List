import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCSAt7KMPt9XlEX3NmP0Wy17xOzhXvvw1g",
    authDomain: "todolist-c47b5.firebaseapp.com",
    projectId: "todolist-c47b5",
    storageBucket: "todolist-c47b5.appspot.com",
    messagingSenderId: "86109231575",
    appId: "1:86109231575:web:892bf09b95ad009888d392",
    measurementId: "G-QE7RHBXSMB"
};

class Fire {
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        this.getLists(lists => {
            this.lists = lists;
            callback();
        });
    }

    getLists(callback) {
        let ref = this.ref.orderBy('name');

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];
            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });
            callback(lists);
        });
    }

    addList(list) {
        let ref = this.ref;
        ref.add(list);
    }

    updateList(list) {
        let ref = this.ref;
        ref.doc(list.id).update(list);
    }

    get ref() {
        return firebase.firestore().collection('lists');
    }

    detach() {
        this.unsubscribe();
    }
}

  
export default Fire;
