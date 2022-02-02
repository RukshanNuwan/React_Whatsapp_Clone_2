import React, {useEffect, useState} from 'react';
import {Avatar, IconButton} from '@mui/material';
import {Chat, DonutLarge, MoreVert, SearchOutlined} from '@mui/icons-material';
import SidebarChat from "./SidebarChat";
import {db} from "../firebase";
import {useStateValue} from "../StateProvider";
import {collection, onSnapshot} from 'firebase/firestore';
import './Sidebar.css';

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    const colRef = collection(db, 'rooms');

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      setRooms(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL}/>
        <div className="sidebar__header_right">
          <IconButton>
            <DonutLarge/>
          </IconButton>
          <IconButton>
            <Chat/>
          </IconButton>
          <IconButton>
            <MoreVert/>
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__search_container">
          <SearchOutlined/>
          <input type="text" placeholder="Search or start new chat"/>
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat/>
        {rooms.map((room) => (
          <SidebarChat
            key={room.id}
            id={room.id}
            name={room.data.name}
          />
        ))}<SidebarChat/>
      </div>
    </div>
  );
};

export default Sidebar;
