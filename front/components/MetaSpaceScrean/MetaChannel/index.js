import React, { useCallback, useEffect, useState, useRef } from 'react';
import styles from '../MetaChannel/styles.module.css';
import { io } from 'socket.io-client'
import { backUrl } from "../config/config";

/* redux */
import { useSelector, useDispatch } from "react-redux";

const socket = io(backUrl, {
  transports: ["websocket"],
});

const MetaChannel = ({username, room}) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { me } = useSelector((state) => state.user);
  const id = me && me.id;

  const onChangeInput = useCallback((e) => {
    setCurrentMessage(e.target.value);
  })

  socket.emit("join_room", room);

  const sendMessage = async () => {
    if (currentMessage != "") {
      const messageData = {
        room: room,
        author: me.nickname,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      // console.log('내가 보내는 데이터')
      // console.log(messageData)
      setCurrentMessage("");
    }
  }

  useEffect(() => {

    socket.on("receive_message", (data) => {
      // console.log(data);
      setMessageList((list) => [...list, data])
      // console.log('내가 받는 데이터')
      // console.log(data)
    })
  }, [socket])

  const scrollRef = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  // let user = (username === messageContent.author ? "you" : "other");

  return (
    <div className={styles.chat_window}>
      <div className={styles.chat_header}>
        <p>채팅 목록</p>
      </div>
      <div className={styles.chat_body}>
      <div className={styles.message_container}>
          {messageList.map((messageContent, index) => (
            <div key={index} className={styles.message}>
              <div>
                <div className={styles.message_content}>
                  <p>{messageContent.message}</p>
                </div>
                <div className={styles.message_meta}>
                  <p>시간:</p>
                  <p>{messageContent.time}</p>
                  <p>, 작성자:</p>
                  <p>{messageContent.author}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollRef}></div>
        </div>
      </div>
      <div className={styles.chat_footer}>
        <input
          type="text"
          value={currentMessage}
          placeholder="입력하세요"
          onChange={onChangeInput}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
        }}
        />
        <button onClick={sendMessage}>▶</button>
      </div>
    </div>
  )
}

export default MetaChannel;