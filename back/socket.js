const SocketIO = require("socket.io");
var players = [];

module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: "/socket.io", // 프론트엔드와 일치해야 합니다.
    cors: {
      origin: "http://localhost:3060",
      credentials: true
    }
  });

  app.set("io", io);

  io.on("connection", (socket) => {
    //console.log(socket.id);

    // 캐릭터 움직임 시작
    socket.on('updatePlayer', function (data) {
      //console.log('데이터 들어옴!!')
      //console.log(data)
      var playerFound = false;
      // players 배열을 순회하면서 해당 플레이어의 위치 정보를 업데이트
      for (var i = 0; i < players.length; i++) {
          if (players[i].id == socket.id) {
              players[i].posx = data.posx;
              players[i].posy = data.posy;
              playerFound = true;
              break;
          }
      }
      // 플레이어가 배열에 없으면 새로 추가
      if (!playerFound) {
          players.push({ posx: data.posx, posy: data.posy, id: socket.id });
      }
      // 모든 클라이언트에게 업데이트된 플레이어 정보를 전달
      io.emit('updatePlayers', players);
    });

    socket.on('disconnect', function() {
      var indexToRemove = -1;
      // players 배열을 순회하면서 해당 플레이어를 찾아 제거
      for (var i = 0; i < players.length; i++) {
          if (players[i].id == socket.id) {
              indexToRemove = i;
              break;
          }
      }
      // 플레이어를 제거하고 해당 정보를 모든 클라이언트에게 전달
      if (indexToRemove != -1) {
          players.splice(indexToRemove, 1);
          io.emit('updatePlayers', players);
      }
    });
    // 캐릭터 움직임 끝

    // 채팅 시작
    socket.on('join_room', (data) => {
      socket.join(data);
      //console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", (data) => {
      //console.log(data);
      socket.to(data.room).emit("receive_message",data);
    });
    // 채팅 끝

    // broadcast to all clients in the given sub-namespace
    socket.emit("hello", 'hello');

    // socket.on("disconnect", () => {
    //   // Handle disconnect event if needed
    // });
  });
};