import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { SideBarContext } from './contexts/sideBarContext.context';

import NavigationBar from './components/navigation-bar/navigation-bar.component';
import StickyNotesList from './components/sticky-notes-list/sticky-notes-list.component';
import UsersSideBarList from './components/users-side-bar-list/users-side-bar-list.component';
import OtherUserStickyNotesList from './components/other-user-sticky-notes-list/other-user-sticky-notes-list.component';



function App() { 
  const {showSideBar} = useContext(SideBarContext);

  return (
    <Routes>
      <Route path="/" element={
        <>
          <NavigationBar />
          {showSideBar && <UsersSideBarList />}
        </>
      }>
        <Route index element={<StickyNotesList />}></Route>
        
        <Route path="/user/:userID" element={<OtherUserStickyNotesList />}/>
      </Route>
    </Routes>
  )
}

export default App
