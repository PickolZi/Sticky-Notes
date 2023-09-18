import { Link } from 'react-router-dom';
import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

import './navigation-bar.styles.css'

import iconSvg from '/assets/svgs/sticky-note-icon.svg'

const NavigationBar = () => {

    // Handles Google authentication
    const handleSignInWithGooglePopup = async () => {
        // TODO: Will need to save this response in a context for future access to access
        const response = await signInWithGooglePopup()
    }

    return (
        <nav>
            <div className="nav__icon">
                <Link to="/">
                    <img className="nav__icon-img" src={iconSvg} alt="Sticky Note web page icon" />
                </Link>
            </div>

            <div className="nav__links">
                <span className="nav__link" onClick={handleSignInWithGooglePopup}>Sign In</span>
            </div>
        </nav>
    );
};

export default NavigationBar;

