import { useContext } from 'react';

import { SideBarContext } from './contexts/sideBarContext.context';

import NavigationBar from './components/navigation-bar/navigation-bar.component';
import StickyNotesList from './components/sticky-notes-list/sticky-notes-list.component';
import UsersSideBarList from './components/users-side-bar-list/users-side-bar-list.component';



function App() { 
  const {showSideBar} = useContext(SideBarContext);

  return (
    <>
      <NavigationBar />
      <StickyNotesList />
      {showSideBar && <UsersSideBarList />}
    </>
  )
}

export default App
