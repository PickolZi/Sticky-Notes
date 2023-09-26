import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { userContext } from '../../contexts/userContext.context'
import { stickyNotesContext } from '../../contexts/stickyNotesContext.context';

import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    signOutAuthUser,
    updateStickyNotesToFirestore,
} from '../../utils/firebase/firebase.utils';

import './navigation-bar.styles.css'
import iconSvg from '/assets/svgs/sticky-note-icon.svg'


const NavigationBar = () => {
    const { userCredentialsContext, setUserCredentialsContext } = useContext(userContext);
    const { stickyNotesJSON, isStickyNoteChange, setStickyNoteChange } = useContext(stickyNotesContext);

    const handleSignInWithGooglePopup = async () => {
        setUserCredentialsContext(await signInWithGooglePopup());
    }

    const handleSignOut = () => {
        signOutAuthUser();
        setUserCredentialsContext(null);
    }

    const saveStickyNotesToFirestore = () => {
        // When clicked, updates firestore database 
        stickyNotesJSON.map((stickyNoteJSON) => {
            if (stickyNoteJSON.updated == true) {
                delete stickyNoteJSON.updated;
                updateStickyNotesToFirestore(userCredentialsContext, stickyNoteJSON);
                setStickyNoteChange(false);
            }
        });
    };

    useEffect(() => {
        createUserDocumentFromAuth(userCredentialsContext);
    }, [userCredentialsContext]);

    return (
        <nav>
            <div className="nav__icon">
                <Link to="/">
                    <img className="nav__icon-img" src={iconSvg} alt="Sticky Note web page icon" />
                </Link>
            </div>

            <div className='nav__save-button'>
                {isStickyNoteChange && <button onClick={saveStickyNotesToFirestore}>Save</button>}
            </div>

            <div className="nav__links">
                {!userCredentialsContext ? 
                    <span className="nav__link" onClick={handleSignInWithGooglePopup}>Sign In</span> : 
                    <span className="nav__link" onClick={handleSignOut}>Sign Out</span>
                }
            </div>
        </nav>
    );
};

export default NavigationBar;

