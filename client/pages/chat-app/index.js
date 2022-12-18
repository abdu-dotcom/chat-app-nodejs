import axios from "axios";
import { getCookie } from "cookies-next";
import io from "socket.io-client";
import { useEffect, useState } from "react";

import styles from "../../styles/chatpp-app.module.css";

export default function chatApp() {
    // variable message 
    const socket = io("http://localhost:5000");
    const [listUsers, setListUsers] = useState([]); // mendapatkan list user terdaftar
    const [currentUsername, setCurrentUsername] =useState([]); // menyimpan id pengirim dari cookie
    const [currentIdUser, setCurrentIdUser] = useState(""); // menyimpan id pengirim dari cookie
    const [receiverUsername, setReceiverUsername] = useState(""); // menyimpan nama penerima dari mengklik salah satu list user 
    const [receiverIdUser, setReceiverIdUser] = useState(""); // menyimpan id pengirim dari mengklik salah satu list user 
    const [testMessage, setTextMessage] = useState(""); // menyimpan pesan yang akan dikirim dari tag input
    const [messagesBetweenUsers, setMessagesBetweenUsers] = useState([]); // mendapatkan pesan antar user dengan mengirim idPengirim dan idPenerima
    const [messageList, setMessageList] = useState([]);

    // variable socket message
    console.log(messagesBetweenUsers);

    useEffect(()=>{
        getUser();  
        setCurrentIdUser(getCookie("userId"));
        setCurrentUsername(getCookie("username"));
    },[]);

    socket.emit("user_connected", currentUsername);
    
    socket.once("user_connected", (username) =>{
        console.log(username);
    });
    
    socket.once("receive_message", (data) =>{
        setMessagesBetweenUsers((list)=> [...list, data])
    });
    
    // function kirim pesan
    const Send = async(e) => {
        e.preventDefault();

        const messageObject = {
            senderUsername : currentUsername,
            senderIdUser : currentIdUser,
            receiverUsername: receiverUsername,
            receiverIdUser : receiverIdUser,
            message : testMessage
        };
        
        socket .emit("send_message", messageObject);
        setMessagesBetweenUsers((list)=> [...list, messageObject]);
        setTextMessage("");

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

    // mendapatkan list user
    const getUser = async() => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setListUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // mendapatkan chat antar user
    const getMessage = async(receiver) => { 
        try {
            const response = await axios.post('http://localhost:5000/api/messages',
            {
                id_pengirim: currentIdUser,
                id_penerima: receiver.unique_id,
            });
            // console.log(response.data);
            setReceiverIdUser(receiver.unique_id);
            setReceiverUsername(receiver.username);
            setMessagesBetweenUsers(response.data);
        } catch (error) {
            console.log(error);        
        }
    };

  return (
    <div>
      <div className={styles.container_chat_app}>
        <h2 className={styles.header_text}>Chat App</h2>
        <div>
          <h1>{currentUsername}</h1>
        </div>
        <div className={styles.container_feature}>
          <div className={styles.container_user_chat_app}>
          {listUsers.map((user) => {
            return (
                <div onClick={() => {getMessage(user)}} key={user.unique_id}>{user.username}</div>
            )
          })}
          </div>
          <div className={styles.container_feature_chat_app}>
            <div className={styles.container_chat}>

                {messagesBetweenUsers.map((message, index) => {
                    let isCurrentUser = currentIdUser == message.id_pengirim || currentIdUser === message.senderIdUser;
                    return (
                        <div style={{textAlign: isCurrentUser ? "right": "left", width: "100%"}} key={index}>
                            <span>{isCurrentUser ?  currentUsername: receiverUsername}</span>
                            <li>{message.message}</li>
                        </div>
                    )
                })}
            </div>
            <div className={styles.container_send}>
                <form onSubmit={Send} className={styles.container_form}>
                    <div className={styles.input_message}>
                    <input type="text" id="text_Massage" name="text_Massage" value={testMessage}onChange={(e) => setTextMessage(e.target.value)}/>
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
