
import './user-side-bar.styles.css'

const UserSideBar = ({user}) => { 
    return (
        <div className='user-side-bar__container'>
            <img className="user-side-bar__img" src={user.photoURL} alt={`${user.displayName}'s photo`} />
            <h3 className='user-side-bar__display-name'>{user.displayName}</h3>
        </div>
    )
}

export default UserSideBar;