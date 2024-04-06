import React, {useRef, useEffect, useState} from 'react';
import io from 'socket.io-client'
import styles from '../WebRtc/styles.module.css';
import useSocketWebRtc from '../../../hooks/useSocketWebRtc';
import { Device } from 'mediasoup-client';

const roomName = "room1"

let device;
let rtpCapabilities;
let producerTransport;
let consumerTransports = []
let audioProducer;
let videoProducer;

let params = {
  encodings: [
    {
      rid: 'r0',
      maxBitrate: 100000,
      scalabilityMode: 'S1T3',
    },
    {
      rid: 'r1',
      maxBitrate: 300000,
      scalabilityMode: 'S1T3',
    },
    {
      rid: 'r2',
      maxBitrate: 900000,
      scalabilityMode: 'S1T3',
    },
  ],
  codecOptions: {
    videoGoogleStartBitrate: 1000
  }
}

let audioParams;
let videoParams;
let consumingTransports= [];
let audioTrack;
let videoTrack;
let roomPeopleClient= [];
let one = true;
let two = true;

const WebRtc = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [socket] = useSocketWebRtc("room1");

  socket?.on('connection-success', ({ socketId }) => {
    // console.log(socketId)
    getLocalStream()
  })

  const constraints = { video: true, audio: true }

  const streamSuccess = (stream) => {
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
          // if (localVideoRef.current) {
          //   localVideoRef.current.srcObject = stream;
          // } else {
          //   console.error("localVideo element not found.");
          // }
        const localVideoContainer = document.getElementById("localVideoContainer");
        one = false;
        two = false;
              
      if (stream.getAudioTracks()[0].kind === 'audio') {
        // console.log('자기자신 오디오')
        // console.log('자기자신::', stream);
        // console.log('자기자신::', stream.id);
        // console.log('자기자신::', stream.getAudioTracks()[0]);
        // console.log('자기자신::', stream.getVideoTracks()[0]);
        // console.log('소켓 아이디::', [socket])
        // console.log('소켓 아이디::', [socket][0]?.id)
        const wrapper = document.createElement("div");
        wrapper.setAttribute("id", `td-audio-${[socket][0]?.id}`);
        const audio = document.createElement("audio")
        audio.setAttribute("autoplay", "true")
        wrapper.appendChild(audio)
        audio.srcObject = stream;
        localVideoContainer?.appendChild(wrapper)
      }
      
      if (stream.getAudioTracks()[0].kind !== 'video') {
        // console.log('자기자신 비디오')
        // console.log('자기자신::', stream);
        // console.log('자기자신::', stream.id);
        // console.log('자기자신::', stream.getAudioTracks()[0]);
        // console.log('자기자신::', stream.getVideoTracks()[0]);
        // console.log('소켓 아이디::', [socket])
        // console.log('소켓 아이디::', [socket][0]?.id)
        const video = document.createElement("video")
        video.setAttribute("id", `td-video-${[socket][0]?.id}`)
        video.setAttribute("autoplay", "true")
        video.srcObject = stream;
        localVideoContainer?.appendChild(video)
    
        const newElem = document.createElement("div"); // 비디오, 오디오 화면
        newElem.setAttribute("id", `controllers-${[socket][0]?.id}`)
          
        const micAndVid = document.createElement("div") // 카메라, 마이크, 이름 요소 wrapper
        micAndVid.setAttribute("id", `micAndVid-${[socket][0]?.id}`)
    
        const guestNameDisplay = document.createElement("p")
        guestNameDisplay.setAttribute("id", `guestNameDisplay-${[socket][0]?.id}`)
        guestNameDisplay.innerText = "room1"
    
        const micBtn = document.createElement("button")
        micBtn.setAttribute("id", `${[socket][0]?.id}-mute`)
        micBtn.setAttribute("class", "on")
        micBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
          
        
        const camBtn = document.createElement("button")
        camBtn.setAttribute("id", `${[socket][0]?.id}-camera`)
        camBtn.setAttribute("class", "on")
        camBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z"/></svg>`
    
        micAndVid.appendChild(guestNameDisplay)
        micAndVid.appendChild(micBtn)
        micAndVid.appendChild(camBtn)
    
        newElem.appendChild(micAndVid)
        localVideoContainer?.appendChild(newElem)
      }
          
          // //!버튼 이벤트리스너
          
          // let muteBtn = document.getElementById('first-mute')
          // let cameraBtn = document.getElementById('first-camera')
          // let buttonClick = true;
          
          //   muteBtn?.addEventListener('click', () => {
          //     console.log('스피커 클릭!!')
              
          //   })
          //   cameraBtn?.addEventListener('click', () => {
          //     console.log('비디오 클릭!')
          //     const videoElement: HTMLElement | null = document.getElementById(`td-video-first`);
          
          //     if (buttonClick) {
          //       console.log('영상 멈춥니다.');
          //       buttonClick = false;
          //       closeVideo(stream.id)
          //     } else {
          //       console.log('영상 재생합니다');
          //       buttonClick = true
          //       openVideo(stream.id)
          //     }
          //   });
          // } 
        
        //
        })
        .catch((err) => {
          console.log('getUserMedia Error: ', err)
      })
    
        audioTrack = stream.getAudioTracks()[0];
        videoTrack = stream.getVideoTracks()[0];
    
        joinRoom();
    };
    
      const joinRoom = () => {
      socket?.emit('joinRoom', { roomName }, (data) => {
        //console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`);
        rtpCapabilities = data.rtpCapabilities;
    
        createDevice();
      });
      };
    
      const getLocalStream = () => {
        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            width: {
              min: 640,
              max: 1920,
            },
            height: {
              min: 400,
              max: 1080,
            }
          }
        })
        .then(streamSuccess)
        .catch(error => {
          console.log(error.message);
        });
      };
      
      const createDevice = async () => {
        try {
          device = new Device()
      
          await device.load({
            routerRtpCapabilities: rtpCapabilities
          })
      
          //console.log('Device RTP Capabilities', device.rtpCapabilities)
          // console.log('~~~~~앞1')
          // console.log(roomPeopleClient)
      
          createSendTransport()
      
        } catch (error) {
          console.log(error)
        }
      }
    
      const createSendTransport = () => {
        socket?.emit('createWebRtcTransport', { consumer: false }, ({ params }) => {
          // console.log('~~~~~앞2')
          // console.log(roomPeopleClient)
    
          if (params.error) {
            console.log(params.error);
            return;
          }
    
    
          producerTransport = device.createSendTransport(params)
    
          producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            try {
              // console.log('~~~~~앞3')
              // console.log(roomPeopleClient)
    
              await socket.emit('transport-connect', {
                dtlsParameters,
              });
              callback();
      
            } catch (error) {
              errback(error);
            }
          });
      
          producerTransport.on('produce', async (parameters, callback, errback) => {
            try {
              // console.log('~~~~~앞4')
              // console.log(roomPeopleClient)
    
    
    
              await socket.emit('transport-produce', {
                kind: parameters.kind,
                rtpParameters: parameters.rtpParameters,
                appData: parameters.appData,
              }, ({ id, producersExist }) => {
                callback({ id });
      
                if (producersExist) getProducers();
              });
            } catch (error) {
              errback(error);
            }
          });
      
          connectSendTransport()
        })
      }
    
      const connectSendTransport = async () => {
        audioProducer = await producerTransport.produce({
          track: audioTrack,
          codecOptions: { mimeType: 'audio/opus' },
        });
        videoProducer = await producerTransport.produce({
          track: videoTrack,
          codecOptions: { mimeType: 'video/vp8', spatialLayer: 1 }
        });
      
        audioProducer.on('trackended', () => {
          //console.log('audio track ended')
      
          // close audio track
        })
      
        audioProducer.on('transportclose', () => {
          //console.log('audio transport ended')
      
          // close audio track
        })
        
        videoProducer.on('trackended', () => {
          //console.log('video track ended')
      
          // close video track
        })
      
        videoProducer.on('transportclose', () => {
          //console.log('video transport ended')
      
          // close video track
        })
      }
    
      const signalNewConsumerTransport = async (remoteProducerId) => {
        if (consumingTransports.includes(remoteProducerId)) return;
        consumingTransports.push(remoteProducerId);
      
        await socket?.emit('createWebRtcTransport', { consumer: true }, ({ params }) => {
          if (params.error) {
           // console.log(params.error)
            return
          }
          //console.log(`PARAMS... ${params}`)
      
          let consumerTransport
          try {
            consumerTransport = device.createRecvTransport(params)
          } catch (error) {
            console.log(error)
            return
          }
      
          consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            try {
              await socket?.emit('transport-recv-connect', {
                dtlsParameters,
                serverConsumerTransportId: params.id,
              })
      
              callback()
            } catch (error) {
              errback(error)
            }
          })
      
          connectRecvTransport(consumerTransport, remoteProducerId, params.id) 
        })
      }
    
      socket?.on('new-producer', ({ producerId }) => signalNewConsumerTransport(producerId))
    
      const getProducers = () => {
        socket?.emit('getProducers', (producerIds) => {
          producerIds.forEach(signalNewConsumerTransport);
        });
      };
    
      const connectRecvTransport = async (consumerTransport, remoteProducerId, serverConsumerTransportId) => {
        await socket?.emit('consume', {
            rtpCapabilities: device.rtpCapabilities,
            remoteProducerId,
            serverConsumerTransportId,
        }, async ({ params }) => {
            if (params.error) {
                console.log('Cannot Consume');
                return;
            }
    
            // console.log(`Consumer Params ${params}`);
            const consumer = await consumerTransport.consume({
                id: params.id,
                producerId: params.producerId,
                kind: params.kind,
                rtpParameters: params.rtpParameters
            });
    
            consumerTransports = [
                ...consumerTransports,
                {
                    consumerTransport,
                    serverConsumerTransportId: params.id,
                    producerId: remoteProducerId,
                    consumer,
                },
          ];
          
          const { track } = consumer
          const videoContainer = document.getElementById("videoContainer");
          //const localVideoContainer = document.getElementById("localVideoContainer");
          const videoTwoContainer = document.getElementById("videoTwoContainer");
    
          // console.log('~~~~~남')
          // console.log(roomPeopleClient)
          // console.log([socket][0]?.id)
    
          // console.log('!2!3!4')
          // console.log(roomPeopleClient[0]?.socketId)
          // console.log(roomPeopleClient[1]?.socketId)
          // console.log(roomPeopleClient[2]?.socketId)
    
          // console.log('!5!6!7')
          // console.log(roomPeopleClient[0]?.video)
          // console.log(roomPeopleClient[1]?.video)
          // console.log(roomPeopleClient[2]?.video)
    
          
          // 첫번째
          
          const foundUserOuter = roomPeopleClient.find(item => item.socketId === [socket][0]?.id);
          console.log(foundUserOuter);
    
          if (foundUserOuter?.video !== undefined) {
            if (params.kind === "audio") {
              // console.log('남')
              
              const wrapper = document.getElementById(`td-audio-${[socket][0]?.id}`);
              if (wrapper) {
                // console.log('!!!!')
                // console.log(wrapper)
                wrapper.id = `td-audio-${foundUserOuter?.video}`;
              }
            } else {
              const wrapper = document.getElementById(`td-video-${[socket][0]?.id}`);
              if (wrapper) {
                wrapper.id = `td-video-${foundUserOuter?.video}`;
              }
      
              const newElemWrapper = document.getElementById(`controllers-${[socket][0]?.id}`); // 비디오, 오디오 화면
              if (newElemWrapper) {
                newElemWrapper.id = `controllers-${foundUserOuter?.video}`
              }
              
              const micAndVidWrapper = document.getElementById(`micAndVid-${[socket][0]?.id}`);  // 카메라, 마이크, 이름 요소 wrapper
              if (micAndVidWrapper) {
                micAndVidWrapper.id = `micAndVid-${foundUserOuter?.video}`
              }
      
              const guestNameDisplayWrapper = document.getElementById(`guestNameDisplay-${[socket][0]?.id}`);
              if (guestNameDisplayWrapper) {
               guestNameDisplayWrapper.id = `guestNameDisplay-${foundUserOuter?.video}`
              }
      
              const micBtnWrapper = document.getElementById(`${[socket][0]?.id}-mute`);
              if (micBtnWrapper) {
               micBtnWrapper.id = `${foundUserOuter?.video}-mute`
              }
      
              const camBtnWrapper = document.getElementById(`${[socket][0]?.id}-camera`);
              if (camBtnWrapper) {
               camBtnWrapper.id = `${foundUserOuter?.video}-camera`
              }
      
            
            //!버튼 이벤트리스너
            
            let muteBtn = document.getElementById(foundUserOuter?.video+'-mute')
            let cameraBtn = document.getElementById(foundUserOuter?.video + '-camera')
            let buttonClick = true;
            
              muteBtn?.addEventListener('click', () => {
                console.log('스피커 클릭!!')
                
              })
              cameraBtn?.addEventListener('click', () => {
                // const videoElement: HTMLElement | null = document.getElementById(`td-${remoteProducerId}`);
            
                if (buttonClick) {
                  //console.log('영상 멈춥니다.');
                  buttonClick = false;
                  closeVideo(foundUserOuter?.video)
                } else {
                  //console.log('영상 재생합니다');
                  buttonClick = true
                  openVideo(foundUserOuter?.video)
                }
              });
      
              //socket.emit('consumer-resume', { serverConsumerId: params.serverConsumerId })
            }
    
            one = true;
            two = false;
          }
          
      
          // 두번째
    
          const foundUser = roomPeopleClient.find(item => item.socketId !== [socket][0]?.id);
    
          if (one) {
            if (document.getElementById('videoContainer')?.querySelector('video')) {
              // console.log('존재합니다.!')
              two = true;
            } else {
              if (foundUser?.video !== undefined) {
                //console.log('두번째!!')
                if (params.kind === "audio") {
                  //console.log('남')
                  
                  const wrapper = document.createElement("div");
                  wrapper.setAttribute("id", `td-audio-${foundUser?.video}`);
                  const audio = document.createElement("audio")
                  audio.setAttribute("autoplay", "true")
                  wrapper.appendChild(audio)
                  audio.srcObject = new MediaStream([track])
                  videoContainer?.appendChild(wrapper)
                }
                
                if (params.kind === "video") {
                  const video = document.createElement("video")
                  video.setAttribute("id", `td-video-${foundUser?.video}`)
                  video.setAttribute("autoplay", "true")
                  video.srcObject = new MediaStream([track])
                  videoContainer?.appendChild(video)
          
                  const newElem = document.createElement("div"); // 비디오, 오디오 화면
                  newElem.setAttribute("id", `controllers-${foundUser?.video}`)
                  
                  const micAndVid = document.createElement("div") // 카메라, 마이크, 이름 요소 wrapper
                  micAndVid.setAttribute("id", `micAndVid-${foundUser?.video}`)
          
                  const guestNameDisplay = document.createElement("p")
                  guestNameDisplay.setAttribute("id", `guestNameDisplay-${foundUser?.video}`)
                  guestNameDisplay.innerText = "room1" 
          
                  const micBtn = document.createElement("button")
                  micBtn.setAttribute("id", `${foundUser?.video}-mute`)
                  micBtn.setAttribute("class", "on")
                  micBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
                  
                  
                  const camBtn = document.createElement("button")
                  camBtn.setAttribute("id", `${foundUser?.video}-camera`)
                  camBtn.setAttribute("class", "on")
                  camBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z"/></svg>`
          
                  micAndVid.appendChild(guestNameDisplay)
                  micAndVid.appendChild(micBtn)
                  micAndVid.appendChild(camBtn)
          
                  newElem.appendChild(micAndVid)
                  videoContainer?.appendChild(newElem)
                
                //!버튼 이벤트리스너
                
                let muteBtn = document.getElementById(foundUser?.video+'-mute')
                let cameraBtn = document.getElementById(foundUser?.video + '-camera')
                let buttonClick = true;
                
                  muteBtn?.addEventListener('click', () => {
                    //console.log('스피커 클릭!!')
                    
                  })
                  cameraBtn?.addEventListener('click', () => {
                    // const videoElement: HTMLElement | null = document.getElementById(`td-${remoteProducerId}`);
                
                    if (buttonClick) {
                      //console.log('영상 멈춥니다.');
                      buttonClick = false;
                      closeVideo(foundUser?.video)
                    } else {
                      //console.log('영상 재생합니다');
                      buttonClick = true
                      openVideo(foundUser?.video)
                    }
                  });
                  socket.emit('consumer-resume', { serverConsumerId: params.serverConsumerId })
                }
              }
            }
    
          }
          
    
          // 세번째
          const foundTwoUser = roomPeopleClient.find(item => item.socketId !== [socket][0]?.id && item.socketId !== foundUser?.socketId);
    
          if (two) {
            if (foundTwoUser?.video !== undefined) {
              // console.log('세번째!!')
              if (params.kind === "audio") {
                //console.log('남')
                
                const wrapper = document.createElement("div");
                wrapper.setAttribute("id", `td-audio-${foundTwoUser?.video}`);
                const audio = document.createElement("audio")
                audio.setAttribute("autoplay", "true")
                wrapper.appendChild(audio)
                audio.srcObject = new MediaStream([track])
                videoTwoContainer?.appendChild(wrapper)
              }
              if (params.kind === "video") {
                const video = document.createElement("video")
                video.setAttribute("id", `td-video-${foundTwoUser?.video}`)
                video.setAttribute("autoplay", "true")
                video.srcObject = new MediaStream([track])
                videoTwoContainer?.appendChild(video)
        
                const newElem = document.createElement("div"); // 비디오, 오디오 화면
                newElem.setAttribute("id", `controllers-${foundTwoUser?.video}`)
                
                const micAndVid = document.createElement("div") // 카메라, 마이크, 이름 요소 wrapper
                micAndVid.setAttribute("id", `micAndVid-${foundTwoUser?.video}`)
        
                const guestNameDisplay = document.createElement("p")
                guestNameDisplay.setAttribute("id", `guestNameDisplay-${foundTwoUser?.video}`)
                guestNameDisplay.innerText = "room1" 
        
                const micBtn = document.createElement("button")
                micBtn.setAttribute("id", `${foundTwoUser?.video}-mute`)
                micBtn.setAttribute("class", "on")
                micBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
                
                
                const camBtn = document.createElement("button")
                camBtn.setAttribute("id", `${foundTwoUser?.video}-camera`)
                camBtn.setAttribute("class", "on")
                camBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z"/></svg>`
        
                micAndVid.appendChild(guestNameDisplay)
                micAndVid.appendChild(micBtn)
                micAndVid.appendChild(camBtn)
        
                newElem.appendChild(micAndVid)
                videoTwoContainer?.appendChild(newElem)
              
              //!버튼 이벤트리스너
              
              let muteBtn = document.getElementById(foundTwoUser?.video+'-mute')
              let cameraBtn = document.getElementById(foundTwoUser?.video + '-camera')
              let buttonClick = true;
              
                muteBtn?.addEventListener('click', () => {
                  //console.log('스피커 클릭!!')
                  
                })
                cameraBtn?.addEventListener('click', () => {
                  // const videoElement: HTMLElement | null = document.getElementById(`td-${remoteProducerId}`);
              
                  if (buttonClick) {
                    //console.log('영상 멈춥니다.');
                    buttonClick = false;
                    closeVideo(foundTwoUser?.video)
                  } else {
                    //console.log('영상 재생합니다');
                    buttonClick = true
                    openVideo(foundTwoUser?.video)
                  }
                });
    
                one = false;
        
                socket.emit('consumer-resume', { serverConsumerId: params.serverConsumerId })
              }
            }
          }
          
        });
      };
    
      function studentAudioController(e) {
        // let tempSocket = this.id.replace('-mute', '');
        // if (this.className === "off") { // 꺼진 상태라면 클릭했을 때 켜야한다. 
        //   this.innerHTML=audioOn
        //   this.className="on"
          
        //   socket.emit('audio-out',{
        //       studentSocketId: tempSocket,
        //       on : true,
        //   })
        // }
        // else {
        //   this.innerHTML=audioOff
        //   this.className="off"
        //   socket.emit("audio-out", {
        //             studentSocketId: tempSocket,
        //             on: false,
        //           });
        // }
        // console.log('클릭!!!')
      }
      
      const closeVideo = (data) => {
        socket?.emit('close-video-client', data);
      }
    
      const openVideo = (data) => {
        socket?.emit('open-video-client', data);
      }
    
      socket?.on('close-video-server', (data) => {
        //console.log('Received data from server(close-video-server):', data);
        const videoElement = document.getElementById(`td-video-${data}`);
    
        //console.log('왔어요!!')
        //console.log(videoElement)
    
        if (videoElement instanceof HTMLVideoElement) {
          const video = videoElement;
    
          //console.log('영상 멈춥니다.');
          video.style.visibility = 'hidden';
        }
      });
    
      socket?.on('open-video-server', (data) => {
        //console.log('Received data from server(open-video-server):', data);
        const videoElement = document.getElementById(`td-video-${data}`);
    
        if (videoElement instanceof HTMLVideoElement) {
          const video = videoElement;
    
          //console.log('영상 재생합니다');
          video.style.visibility = 'visible';
        }
      });
    
      socket?.on('roomPeople', (data) => {
        roomPeopleClient = data;
      })
    
      socket?.on('producer-closed', ({ remoteProducerId }) => {
        const producerToClose = consumerTransports.find(transportData => transportData.producerId === remoteProducerId);
        producerToClose.consumerTransport.close();
        producerToClose.consumer.close();
    
        consumerTransports = consumerTransports.filter(transportData => transportData.producerId !== remoteProducerId);
    
        const videoContainer = document.getElementById("videoContainer");
        const elementId = `td-${remoteProducerId}`;
    
    
        if (videoContainer) {
            const elementToRemove = document.getElementById(elementId);
          if (elementToRemove) {
              videoContainer?.removeChild(elementToRemove);
            } else {
                console.error(`Element with id '${elementId}' not found in videoContainer.`);
            }
        } else {
            console.error("videoContainer element not found1.");
        }
    
        const elementMicAndVid = `micAndVid-${remoteProducerId}`;
        const elementControllers = `controllers-${remoteProducerId}`;
        
        const elementMute = `${remoteProducerId}-mute`;
        const elementCamera = `${remoteProducerId}-camera`;
    
        const micAndVid = document.getElementById(elementMicAndVid);
        const controllers = document.getElementById(elementControllers);
        const elementToRemoveMute = document.getElementById(elementMute);
        const elementToRemoveCamera = document.getElementById(elementCamera);
        
        // console.log(micAndVid)
        // console.log(controllers)
        // console.log(elementToRemoveMute)
        // console.log(elementToRemoveCamera)
    
        if (micAndVid) {
          controllers?.remove();
          //console.log('지우기')
        }
        
      });
    
      // useEffect(() => {
      //   const script = document.createElement('script');
      //   script.src = '/components/WebRtc/bundle.js'
      //   script.async = true;
      //   document.body.appendChild(script);
      //   return () => {
      //     document.body.removeChild(script);
      //   }
      // }, [])
    
    
      return (
        <div>
          <div>
              <div>
                <div className={styles.localDiv} id="localVideoContainer"></div>
              </div>
          </div>
          <br />
          <div>
            <div>
              <div className={styles.remoteDiv} id="videoContainer"></div>
            </div>
          </div>
          <div>
            <div>
            <div className={styles.remoteDiv} id="videoTwoContainer"></div>
            </div>
          </div>
        </div> 
      )
    }
    
    export default WebRtc;