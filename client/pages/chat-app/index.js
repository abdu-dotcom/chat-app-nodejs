import axios from "axios";
import { getCookie } from "cookies-next";
import io from "socket.io-client";
import { useEffect, useState } from "react";

import styles from "../../styles/chatpp-app.module.css";

export default function chatApp() {
    // variable message 
    const socket = io.connect("http://localhost:5000");
    const [message, setMessage] = useState(""); // menyimpan pesan yang akan dikirim dari tag input
    const [idPengirim, setIdPengirim] = useState(""); // menyimpan id pengirim dari cookie
    const [idPenerima, setIdPenerima] = useState(""); // menyimpan id pengirim dari mengklik salah satu list user 
    const [namaPenerima, setNamaPenerima] = useState(""); // menyimpan id pengirim dari mengklik salah satu list user 
    const [currentUsername, setCurrentUsername] =useState(""); // menyimpan id pengirim dari cookie
    const [users, setUsers] = useState([]); // mendapatkan list user
    const [messageUsers, setmessageUsers] = useState([]); // mendapatkan pesan antar user dengan mengirim idPengirim dan idPenerima

    useEffect(()=>{
        getUser();  
        setIdPengirim(getCookie("userId"));
        setCurrentUsername(getCookie("username"));
    },[]);

    // function kirim pesan
    const Send = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/send/message',{
                id_pengirim: idPengirim,
                id_penerima: idPenerima,
                text_Massage: message
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    // mendapatkan list user
    const getUser = async() => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // mendapatkan chat antar user
    const getMessage = async(unique_id) => { 
        try {
            const response = await axios.post('http://localhost:5000/api/messages',
            {
                id_pengirim: idPengirim,
                id_penerima: unique_id,
            });
            // console.log(response.data);
            setmessageUsers(response.data);
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
          {users.map((user) => {
            return (
                <div onClick={() => {
                    setIdPenerima(user.unique_id)
                    setNamaPenerima(user.username)
                    getMessage(user.unique_id)}} key={user.unique_id}>{user.username}</div>
            )
          })}
          </div>
          <div className={styles.container_feature_chat_app}>
            <div className={styles.container_chat}>

                {messageUsers.map((message) => {
                    let isCurrentUser = message.id_pengirim == idPengirim;
                    return (
                        <div style={{textAlign: isCurrentUser ? "right": "left", width: "100%"}}>
                            <span>{isCurrentUser ? currentUsername: namaPenerima}</span>
                            <li>{message.message}</li>
                        </div>
                    )
                })}
            </div>
            <div className={styles.container_send}>
                <form onSubmit={Send} className={styles.container_form}>
                    <div className={styles.input_message}>
                    {/* <input type="text" id="id_penerima" onChange={(e)=> setIdPenerima(e.target.value)} hidden/>  */}
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
