import React, {useEffect, useState} from 'react';
import {Avatar, IconButton} from "@mui/material";
import {AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import {db} from "../firebase";
import {useStateValue} from "../StateProvider";
import {addDoc, collection, doc, onSnapshot, query, orderBy, serverTimestamp} from 'firebase/firestore';
import './Chat.css';

const Chat = () => {
  const [randomString, setRandomString] = useState(0);
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);

  const {roomId} = useParams();

  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      const docRef = doc(db, 'rooms', roomId);

      onSnapshot(docRef, (snapshot) => {
        setRoomName(snapshot.data()?.name);
      });

      const docRefQuery = doc(db, 'rooms', roomId);
      const colRef = collection(docRefQuery, 'message');
      const q = query(colRef, orderBy('timestamp', 'asc'));

      onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [roomId]);

  useEffect(() => {
    setRandomString(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    const docRef = doc(db, 'rooms', roomId);
    const colRef = collection(docRef, 'message');

    addDoc(colRef, {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp()
    }).then(() => {
      console.log('data added');
    });

    setInput('');
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${randomString}.svg`}/>
        <div className="chat__header_info">
          <h3>{roomName}</h3>
          <p>Last seen {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
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
        {messages.map((message, index) => (
          <p key={index} className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
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
