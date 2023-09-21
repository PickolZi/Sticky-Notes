// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc, collection, query, getDocs, updateDoc } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const signInWithGooglePopup = async () => {
    try {
        const response = await signInWithPopup(auth, googleProvider);
        return response;
    } catch (error) {
        console.log("Google Sign in error occured: ");
        console.log(error);
    }
}

export const signOutAuthUser = () => {
    auth.signOut();
}

// Setting up firestore
export const db = getFirestore(app);

export const createUserDocumentFromAuth = async (userCredentials) => {
    // When signing in through google. Fetch user firestore document. If user firestore document does not exist, create one.
    const {displayName, email} = userCredentials.user;

    // Gets reference
    const userUID = userCredentials.user.uid;
    const userDocRef = doc(db, 'users', userUID);
    
    // Gets Doc
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        // Creates Doc 
        try {
            const data = {
                displayName: displayName,
                email: email
            };
            return await setDoc(userDocRef, data);
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return userSnapshot;
}

export const getStickyNotesFromUser = async (userCredentials) => {
    if (!userCredentials) return;
    // When the main page loads, call this function to recieve the data from firestore database.
    const userUID = userCredentials.user.uid;

    // Gets path to collection
    const stickyNotesDocRef = collection(db, `users/${userUID}/stickynotes`);
    const stickyNotesDocs = query(stickyNotesDocRef);

    const stickyNotesSnapshot = await getDocs(stickyNotesDocs);

    const stickyNotes = [];
    stickyNotesSnapshot.docs.map((stickyNote) => {
        stickyNotes.push(stickyNote.data())
    })

    return stickyNotes;
}

export const updateStickyNotesToFirestore = async (userCredentials, data) => {
    const userUID = userCredentials.user.uid;
    const stickyNotesColRef = collection(db, `users/${userUID}/stickynotes`);
    const stickyNotesDocs = query(stickyNotesColRef);

    const stickyNotesSnapshot = await getDocs(stickyNotesDocs);
    stickyNotesSnapshot.docs.map((stickyNote) => {
        const stickyNoteDocID = stickyNote.id;
        const stickyNoteDataID = stickyNote.data().id;

        if (stickyNoteDataID == data.id) {
            const stickyNoteDocRef = doc(db, `users/${userUID}/stickynotes/${stickyNoteDocID}`);
            
            try {
                return updateDoc(stickyNoteDocRef, data);
            } catch (error) {
                console.log("Error updating to firestore database...")
                console.log(error);
            }
        }
    });
};

export const createEmptyStickyNoteInFirestore = async (userCredentials, dataID) => {
    const userUID = userCredentials.user.uid;
    const newStickyNotesDocRef = doc(db, `users/${userUID}/stickynotes`, dataID.toString());
    return await setDoc(newStickyNotesDocRef, {id:dataID, title:"", text:"", date:""});
}