import axios from "axios";
import { getCookie } from "cookies-next";
import io from "socket.io-client";
import { useEffect, useState } from "react";

import styles from "../../styles/chatpp-app.module.css";

// component Bootstrap
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";

export default function chatApp() {
  // variable message
  const socket = io("http://localhost:5000");
  const [listUsers, setListUsers] = useState([]); // mendapatkan list user terdaftar
  const [currentUsername, setCurrentUsername] = useState([]); // menyimpan id pengirim dari cookie
  const [currentIdUser, setCurrentIdUser] = useState(""); // menyimpan id pengirim dari cookie
  const [receiverUsername, setReceiverUsername] = useState(""); // menyimpan nama penerima dari mengklik salah satu list user
  const [receiverIdUser, setReceiverIdUser] = useState(""); // menyimpan id pengirim dari mengklik salah satu list user
  const [testMessage, setTextMessage] = useState(""); // menyimpan pesan yang akan dikirim dari tag input
  const [messagesListBetweenUsers, setMessagesListBetweenUsers] = useState([]); // mendapatkan pesan antar user dengan mengirim idPengirim dan idPenerima
  const [messageList, setMessageList] = useState([]);

  // variable socket message
  // console.log(messagesListBetweenUsers);

  useEffect(() => {
    getUser();
    setCurrentIdUser(getCookie("userId"));
    setCurrentUsername(getCookie("username"));
  }, []);

  socket.emit("user_connected", currentUsername);

  socket.once("user_connected", (username) => {
    console.log(username);
  });

  socket.once("receive_message", (data) => {
    setMessagesListBetweenUsers((list) => [...list, data]);
  });

  // function kirim pesan
  const Send = async (e) => {
    e.preventDefault();

    const messageObject = {
      senderUsername: currentUsername,
      senderIdUser: currentIdUser,
      receiverUsername: receiverUsername,
      receiverIdUser: receiverIdUser,
      message: testMessage,
    };
    if (testMessage == "") {
      return;
    } else {
      socket.emit("send_message", messageObject);
      setMessagesListBetweenUsers((list) => [...list, messageObject]);
      setTextMessage("");

      try {
        const response = await axios.post(
          "http://localhost:5000/api/send/message",
          {
            id_pengirim: messageObject.senderIdUser,
            id_penerima: messageObject.receiverIdUser,
            text_Massage: messageObject.message,
          }
        );
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // mendapatkan list user
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setListUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // mendapatkan chat antar user
  const getMessage = async (receiver) => {
    try {
      const response = await axios.post("http://localhost:5000/api/messages", {
        id_pengirim: currentIdUser,
        id_penerima: receiver.unique_id,
      });
      // console.log(response.data);
      setReceiverIdUser(receiver.unique_id);
      setReceiverUsername(receiver.username);
      setMessagesListBetweenUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container>
        <Col>
          <Container className={'pb-5'}>
            <h1 className={'text-center'}>Chat - App</h1>
            <h5 className={'pt-5'}>current user : {currentUsername}</h5>
          </Container>
        </Col>
        <Col>
          <Container>
            <Row style={{ padding: "0px" }}>
              <Col sm={4}>
                <ListGroup>
                  {listUsers.map((user) => {
                    if (user.username == currentUsername) {
                      return;
                    } else {
                      return (
                        <div
                          onClick={() => {
                            getMessage(user);
                          }}
                          key={user.unique_id}
                        >
                          <ListGroup.Item>{user.username}</ListGroup.Item>
                        </div>
                      );
                    }
                  })}
                </ListGroup>
              </Col>
              <Col sm={8} style={{ padding: "0px" }}>
                <Container style={{ padding: "0px" }}>
                  <Col style={{ padding: "0px" }}>
                    <Container
                      className="overflow-auto"
                      style={{ height: "460px", padding: "0px" }}
                    >
                      {messagesListBetweenUsers.map((message, index) => {
                        let isCurrentUser =
                          currentIdUser == message.id_pengirim ||
                          currentIdUser === message.senderIdUser;
                        return (
                          <div
                            style={{
                              display: "inline-block",
                              textAlign: isCurrentUser ? "right" : "left",
                              width: "100%",
                            }}
                            key={index}
                          >
                            <Card
                              style={{
                                width: "auto",
                                float: isCurrentUser ? "right" : "left",
                              }}
                            >
                              <Card.Body>
                                <Card.Title>
                                  {" "}
                                  <span>
                                    {isCurrentUser
                                      ? currentUsername
                                      : receiverUsername}
                                  </span>
                                </Card.Title>
                                <Card.Text>{message.message}</Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                        );
                      })}
                    </Container>
                    <Container style={{ padding: "0px" }}>
                      <Row style={{ padding: "0px" }}>
                        <Form onSubmit={Send} style={{ padding: "0px" }}>
                          <Row>
                            <Col sm={11} style={{ padding: "0px" }}>
                              <Form.Control
                                size="sm"
                                type="text"
                                id="text_Massage"
                                name="text_Massage"
                                aria-describedby="passwordHelpBlock"
                                value={testMessage}
                                onChange={(e) => setTextMessage(e.target.value)}
                              />
                            </Col>
                            <Col sm={1} style={{ padding: "0px" }}>
                              <Button variant="primary" type="submit" size="sm">
                                Kirim
                              </Button>{" "}
                            </Col>
                          </Row>
                        </Form>
                      </Row>
                    </Container>
                  </Col>
                </Container>
              </Col>
            </Row>
          </Container>
        </Col>
      </Container>
    </div>
  );
}
