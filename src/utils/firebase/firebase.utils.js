import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    updateDoc, 
    getDoc, 
    getDocs, 
    deleteDoc, 
    query, 
} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId
};
const app = initializeApp(firebaseConfig);

/* ********************* */
/* Google Authentication */
/* ********************* */
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const signInWithGooglePopup = async () => {
    // Props Google popup to sign in with Google.
    try {
        const response = await signInWithPopup(auth, googleProvider);
        return response;
    } catch (error) {
        console.log("Google Sign in error occured: ");
        console.log(error);
    }
}

export const signOutAuthUser = () => {
    // Signs user out
    auth.signOut();
}

/* ***************** */
/* FIRESTORE METHODS */
/* ***************** */
export const db = getFirestore(app);

export const createUserDocumentFromAuth = async (userCredentials) => {
    if (!userCredentials) return;
    // When signing in through google. Fetch user firestore document. If user document does not exist, create one.
    const {displayName, email} = userCredentials.user;
    const userUID = userCredentials.user.uid;

    const userDocRef = doc(db, 'users', userUID);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        try {
            const data = {
                displayName: displayName,
                email: email
            };
            return await setDoc(userDocRef, data);
        } catch (error) {
            console.log("Error creating user: ", error);
        }
    }

    return userSnapshot;
}

export const getStickyNotesFromUser = async (userCredentials) => {
    // Gets all of a user's sticky notes. Return empty list if none.
    if (!userCredentials) return;
    const userUID = userCredentials.user.uid;

    const stickyNotesDocRef = collection(db, `users/${userUID}/stickynotes`);
    const stickyNotesSnapshot = await getDocs(stickyNotesDocRef);

    if (!stickyNotesSnapshot.empty) {
        const stickyNotes = stickyNotesSnapshot.docs.map((stickyNote) => { return stickyNote.data()});
        return stickyNotes
    }
    
    return [];
}

export const updateStickyNotesToFirestore = async (userCredentials, data) => {
    // Updates a user's sticky note.
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

export const deleteStickyNoteFromFirestore = async (userCredentials, id) => {
    // Deletes a user's sticky note
    const userUID = userCredentials.user.uid;
    const stickyNotesDocRef = doc(db, `users/${userUID}/stickynotes/${id}`);
    try {
        await deleteDoc(stickyNotesDocRef);
    } catch (error) {
        console.log("Failed deleting doc.");
        console.log(error);
    }

};

export const createEmptyStickyNoteInFirestore = async (userCredentials, dataID) => {
    // Create an empty sticky note
    const userUID = userCredentials.user.uid;
    const newStickyNotesDocRef = doc(db, `users/${userUID}/stickynotes`, dataID.toString());
    return await setDoc(newStickyNotesDocRef, {id:dataID, title:"", text:"", date:new Date()});
}