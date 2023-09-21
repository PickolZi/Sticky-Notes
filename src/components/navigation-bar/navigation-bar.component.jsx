import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    signOutAuthUser,
    updateStickyNotesToFirestore,
    createEmptyStickyNoteInFirestore
} from '../../utils/firebase/firebase.utils';

import { useContext } from 'react';
import { userContext } from '../../contexts/userContext.context'
import { stickyNotesContext } from '../../contexts/stickyNotesContext.context';

import './navigation-bar.styles.css'
import iconSvg from '/assets/svgs/sticky-note-icon.svg'


const NavigationBar = () => {
    const [userCredentials, setUserCredentials] = useState();
    const { userCredentialsContext, setUserCredentialsContext } = useContext(userContext);
    const { stickyNotesJSON } = useContext(stickyNotesContext);

    // Sign In
    const handleSignInWithGooglePopup = async () => {
        setUserCredentials(await signInWithGooglePopup());

        // Creates firebase document for the user depending on their UID.
        createUserDocumentFromAuth(userCredentials);
    }

    // Sign Out
    const handleSignOut = () => {
        signOutAuthUser();
        setUserCredentials(null);
    }

    // Call firebase function to save StickyNotes data to firestore.
    const saveStickyNotesToFirestore = () => {
        // When clicked, call the below function to update firestore database through each stickyNote document.
        stickyNotesJSON.map((stickyNoteJSON) => {
            if (stickyNoteJSON.updated == true) {
                delete stickyNoteJSON.updated;
                createEmptyStickyNoteInFirestore(userCredentials, stickyNoteJSON.id);
                updateStickyNotesToFirestore(userCredentials, stickyNoteJSON);
            }
        });
    };

    useEffect(() => {
        setUserCredentialsContext(userCredentials);
    }, [userCredentials]);

    return (
        <nav>
            <div className="nav__icon">
                <Link to="/">
                    <img className="nav__icon-img" src={iconSvg} alt="Sticky Note web page icon" />
                </Link>
            </div>

            <div className='nav__save-button'>
                {stickyNotesJSON ? 
                    <button onClick={saveStickyNotesToFirestore} >Save</button> :
                    ""
                };
            </div>

            <div className="nav__links">
                {!userCredentials ? 
                    <span className="nav__link" onClick={handleSignInWithGooglePopup}>Sign In</span> : 
                    <span className="nav__link" onClick={handleSignOut}>Sign Out</span>
                }
            </div>
        </nav>
    );
};

export default NavigationBar;

