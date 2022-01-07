import {useEffect, useState} from "react";
import {Avatar} from "@mui/material";
import {db} from "../firebase";
import './SidebarChat.css';
import {Link} from "react-router-dom";

const SidebarChat = ({id, name, addNewChat}) => {
  const [randomString, setRandomString] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setRandomString(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => (
          setMessages(snapshot.docs.map((doc) => (
            doc.data()
          )))
        ));
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt('Please enter a name for chat room');

    if (roomName) {
      db.collection('rooms')
        .add({
          name: roomName,
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
