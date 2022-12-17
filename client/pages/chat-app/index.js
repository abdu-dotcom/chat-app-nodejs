import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import io from "socket.io-client";

import styles from "../../styles/chatpp-app.module.css";

export default function chatApp() {
    // variable message 
    const [message, setMessage] = useState("");
    const [idPengirim, setIdPengirim] = useState("");
    const [idPenerima, setIdPenerima] = useState("");
    const [namaPenerima, setNamaPenerima] = useState("");
    const [currentUsername, setCurrentUsername] =useState("");
    const [users, setUsers] = useState([]);
    const [messageUsers, setmessageUsers] = useState([]);
    const socket = io.connect("http://localhost:5000");

    useEffect(()=>{
        getUser();  
        // getMessage();
        setIdPengirim(getCookie("userId"));
        setCurrentUsername(getCookie("username"));
    }, []);

    // function kirim pesan
    const Send = async(e) => {
        e.preventDefault();
        const messageChat = {
            room: 1,
            namaPengirim: currentUsername,
            idPengirim: idPengirim,
            idPenerima: idPenerima,
            namaPenerima: e.username
        }
        socket.emit("send_message", messageChat);

        // try {
        //     const response = await axios.post('http://localhost:5000/api/send/message',{
        //         id_pengirim: idPengirim,
        //         id_penerima: idPenerima,
        //         text_Massage: message
        //     });
        //     console.log(response);
        // } catch (error) {
        //     console.log(error);
        // }
    };

    const joinChat = async(e) =>{
            setIdPenerima(e.unique_id)
            setNamaPenerima(e.username)
            getMessage(e.unique_id)

            const objectChat = {
                room: 1,
                namaPengirim: currentUsername,
                idPengirim: idPengirim,
                idPenerima: idPenerima,
                namaPenerima: e.username
            }
            socket.emit("join_chat", objectChat);
    };

    const getUser = async() => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getMessage = async(unique_id) => {
        try {
            const response = await axios.post('http://localhost:5000/api/messages',
            {
                id_pengirim: idPengirim,
                id_penerima: unique_id,
            });
            console.log(response.data);
            setmessageUsers(response.data);
        } catch (error) {
            console.log(error);        
        }
    };

    useEffect(()=> {
        socket.emit("receive_message", (data) =>{
            console.log(data);
        });
    },[]);

  return (
    <div>
      <div className={styles.container_chat_app}>
        <h2 className={styles.header_text}>Chat App</h2>
        <div>
          <h1>{currentUsername}</h1>
        </div>
        <div className={styles.container_feature}>
          <div className={styles.container_user_chat_app}>
          {users.map((user) => {
            return (
                <div onClick={() => {joinChat(user)}} key={user.unique_id}>{user.username}</div>
            )
          })}
          </div>
          <div className={styles.container_feature_chat_app}>
            <div className={styles.container_chat}>
                {messageUsers.map((message) => {
                    let isCurrentUser = message.id_pengirim == idPengirim;
                    return (
                        <div style={{textAlign: isCurrentUser ? "right": "left", width: "100%"}} key={message.message_id} >
                            <span>{isCurrentUser ? currentUsername: namaPenerima}</span>
                            <li>{message.message}</li>
                        </div>
                    )
                })}
            </div>
            <div className={styles.container_send}>
                <form onSubmit={Send} className={styles.container_form}>
                    <div className={styles.input_message}>
                    <input type="text" id="id_penerima" onChange={(e)=> setIdPenerima(e.target.value)} hidden/> 
                    <input type="text" id="text_Massage" name="text_Massage" onChange={(e) => setMessage(e.target.value)}/>
                    </div>
                    <div className={styles.button_submit}>
                    <button type="submit">kirim</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
