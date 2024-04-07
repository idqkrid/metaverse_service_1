import {io, Socket} from 'socket.io-client'
import React, { useCallback } from 'react'
import axios from 'axios';
import { backUrl } from "../config/config";

// 만든이유
/*
Socket.io는 웹소켓 특성상 근데 이렇게 하나의 컴포넌트에 종속되게 넣어버리면 이 컴포넌트가 사라져버리면
연결도 끊겨 버립니다.
그걸 방지하기 위해서
공통적인 컴포넌트에 넣어 줄건데 hook 소켓 연결하는거 설정함

- 공통적인걸 할때는 
: 화면이 있으면 부모 컴포너트에 설정하고
: 화면이 없으면 hook으로 만든다.
*/
const sockets = {}; // workspace는 고정값이면 sleact 이렇게 넣어줄수 있지만 고정값이 아니기때문에 key: string 으로 넣어줌 ex) sleact, text, hello
const useSocket = (workspace) => {
  const disconnect = useCallback(() => {
    if (workspace && sockets[workspace]) {
      console.log("소켓 연결 끊음");
      sockets[workspace].disconnect();
      delete sockets[workspace]; // 연결 끊을때는 객체 지워버리기
    }
  }, [workspace]);

  if (!workspace) {
    return [undefined, disconnect];
  }

  /*
  Socket.io 도 계층이 있다.
  1. 네임 스페이스 -> 슬랙의 워크스페이스
  2. 룸 -> 슬랙의 채널

  ws-sleact / ws-text 
  워크스페이스간에 이동하면 소켓을 끊어준다.
  */

  if (!sockets[workspace]) {
    // 기존에 소켓연결이 없었다면
    sockets[workspace] = io(backUrl, {
      transports: ["websocket"],
    });

    sockets[workspace].on("connect_error", (err) => {
      console.error(err);
      console.log(`connect_error due to ${err.message}`);
    }); // 소켓 에러 났을경우
  }

  return [sockets[workspace], disconnect]; // 기존 소켓 연결하기 (새롭게 소켓 연결 시도 x)
};

export default useSocket;