import React, {useEffect, useState} from 'react';
import {Avatar, IconButton} from "@mui/material";
import {AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import {db} from "../firebase";
import './Chat.css';

const Chat = () => {
  const [randomString, setRandomString] = useState(0);
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');
  const {roomId} = useParams();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId).onSnapshot((snapshot) => (
        setRoomName(snapshot.data().name)
      ));
    }
  }, [roomId]);

  useEffect(() => {
    setRandomString(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    setInput('');
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${randomString}.svg`}/>
        <div className="chat__header_info">
          <h3>{roomName}</h3>
          <p>Last seen at...</p>
        </div>
        <div className="cat__header_right">
          <IconButton>
            <SearchOutlined/>
          </IconButton>
          <IconButton>
            <AttachFile/>
          </IconButton>
          <IconButton>
            <MoreVert/>
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        <p className={`chat__message ${'chat__receiver'}`}>
          <span className="chat__name">Username</span>
          text
          <span className="chat__timestamp">3:52pm</span>
        </p>
      </div>

      <div className="chat__footer">
        <InsertEmoticon/>
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>Send a message</button>
        </form>
        <Mic/>
      </div>
    </div>
  );
};

export default Chat;
