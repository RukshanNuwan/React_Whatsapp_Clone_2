import React from 'react';
import {Avatar, IconButton} from '@mui/material';
import {Chat, DonutLarge, MoreVert, SearchOutlined} from '@mui/icons-material';
import SidebarChat from "./SidebarChat";
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar/>
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
        <SidebarChat addNewChat={true}/>
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
      </div>
    </div>
  );
};

export default Sidebar;
