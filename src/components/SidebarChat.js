import {useEffect, useState} from "react";
import {Avatar} from "@mui/material";
import {db} from "../firebase";
import './SidebarChat.css';
import {Link} from "react-router-dom";
import {doc, collection, query, orderBy, onSnapshot, addDoc} from 'firebase/firestore';

const SidebarChat = ({id, name, addNewChat}) => {
  const [randomString, setRandomString] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setRandomString(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      const docRef = doc(db, 'rooms', id);
      const colRef = collection(docRef, 'message');
      const q = query(colRef, orderBy('timestamp', 'desc'));

      onSnapshot(q, (snapshot) => (
        setMessages(snapshot.docs.map((doc) => (
          doc.data()
        )))
      ));
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt('Please enter a name for chat room');

    if (roomName) {
      const colRef = collection(db, 'rooms');

      addDoc(colRef, {
        name: roomName
      }).then(() => {
        console.log('data added');
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar_chat">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${randomString}.svg`}/>
        <div className="sidebar_chat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebar_chat" onClick={createChat}>
      <h2>Add new Chat</h2>
    </div>
  );
};

export default SidebarChat;
