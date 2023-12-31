import { useState, useEffect, useContext, useReducer } from 'react';
import { Link } from 'react-router-dom';

import { userContext } from '../../contexts/userContext.context';
import { SideBarContext } from '../../contexts/sideBarContext.context';

import UserSideBar from '../user-side-bar/user-side-bar.component';

import { getUsersFromFirestore } from '../../utils/firebase/firebase.utils';

import './users-side-bar-list.styles.css';


const UsersSideBarList = () => {
    const [users, setUsers] = useState();
    const [username, setUsername] = useState("Guest");
    const [userEmail, setUserEmail] = useState("None");

    const {userCredentialsContext} = useContext(userContext);
    const {setShowSideBar} = useContext(SideBarContext);

    const closeSideBar = () => {
        setShowSideBar(false);
    }

    useEffect(() => {
        const getUsers = async () =>{
            const tempUsers = (await getUsersFromFirestore()).map((user) => {return user.data()})
            setUsers(tempUsers);
        }
        getUsers();
    }, []) 

    useEffect(() => {
        if (userCredentialsContext) {
            setUsername(userCredentialsContext.user.displayName);
            setUserEmail(userCredentialsContext.user.email);
        } else {
            setUsername("Guest");
            setUserEmail("None");
        }
    }, [userCredentialsContext]);


    return (
        <div className="users-side-bar-list__container">
            <div className='users-side-bar-list__main-user-container'>
                <h3 className='users-side-bar-list__main-user-display-name'>Hello <Link onClick={closeSideBar} to="/">{username}</Link>!</h3>
            </div>  

            <div className="users-side-bar-list-users">
                {users && users.map((user) => {
                    if (user.email!=userEmail) {
                        return (
                            <UserSideBar closeSideBar={closeSideBar} key={user.id} user={user}/>
                        )
                    };
                })}
            </div>
        </div>
    )
}

export default UsersSideBarList;