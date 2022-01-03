import {useEffect, useState} from "react";
import {Avatar} from "@mui/material";
import './SidebarChat.css';

const SidebarChat = ({addNewChat}) => {
  const [randomString, setRandomString] = useState(0);

  useEffect(() => {
    setRandomString(Math.floor(Math.random() * 5000));

  }, []);

  const createChat = () => {
    const roomName = prompt('Please enter a name for chat');

    if (roomName) {}
  };

  return !addNewChat ? (
    <div className="sidebar_chat">
      <Avatar src={`https://avatars.dicebear.com/api/bottts/${randomString}.svg`}/>
      <div className="sidebar_chat__info">
        <h2>Room name</h2>
        <p>last message...</p>
      </div>
    </div>
  ) : (
    <div className="sidebar_chat" onClick={createChat}>
      <h2>Add new Chat</h2>
    </div>
  );
};

export default SidebarChat;
