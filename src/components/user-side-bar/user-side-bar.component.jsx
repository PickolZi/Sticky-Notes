import { Link } from 'react-router-dom';

import './user-side-bar.styles.css'

const UserSideBar = ({closeSideBar, user}) => { 
    return (
        <Link to={`/user/${user.id}`}>
            <div className='user-side-bar__container' onClick={closeSideBar}>
                <img className="user-side-bar__img" src={user.photoURL} alt={`${user.displayName}'s photo`} />
                <h3 className='user-side-bar__display-name'>{user.displayName}</h3>
            </div>
        </Link>
    )
}

export default UserSideBar;