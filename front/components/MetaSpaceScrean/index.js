import React, { useState, useEffect, KeyboardEvent, useCallback } from 'react';
import styles from '../MetaSpaceScrean/styles.module.css';
import gravatar from 'gravatar';
import MenuRight from '../MetaSpaceScrean/MenuRight';
import MenuLeft from '../MetaSpaceScrean/MenuLeft';
import MetaChannel from '../MetaSpaceScrean/MetaChannel';
import WebRtc from '../MetaSpaceScrean/WebRtc'
import { useRouter } from 'next/router';
import { io } from 'socket.io-client'
import { backUrl } from "../config/config";

let game;
let player;
var othersprites = [];
var others = [];

const socket = io(backUrl, {
  transports: ["websocket"],
});

const Meta = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [chattingShowUserMenu, setChattingShowUserMenu] = useState(false);
  const router = useRouter();

  const data = router.query;

  // console.log('111')
  // console.log(data.id);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const onClickUserChatting = useCallback(() => {
    setChattingShowUserMenu((prev) => !prev);
  }, []);

  const onCloseUserProfile = useCallback((e) => {
    e.stopPropagation();
    setShowUserMenu(false);
  }, []);

  const onCloseUserChatting = useCallback((e) => {
    e.stopPropagation();
    setChattingShowUserMenu(false);
  }, [])

  useEffect(() => {
    loadGame();
  }, []);

  const loadGame = async () => {
    let config = {
      type: Phaser.AUTO,
      width: 600,
      height: 600,
      backgroundColor: 0x999999,
      physics: {
        default: 'arcade',
        arcade: {
          // debug: true,
          gravity: {
            x: 0,
            y: 0
          }
        }
      },
      scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "gmae-content"
      },
      pixelArt: true,
      scene: [GameScene]
    }

    game = new Phaser.Game(config)
  };

  return (
    <div>
      <div className={styles.space_BackGroundColor} id="gmae-content" />
      <div className={styles.head}>
        {/* <div className={styles.rightMenu}>
          <span onClick={onClickUserProfile}>
            <img className={styles.gravatarRightImg} src={gravatar.url('', { s: '28px', d: 'retro' })} alt='' />
            {showUserMenu && (  
              <MenuRight show={showUserMenu} onCloseModal={onCloseUserProfile}>
                <div className={styles.webRtc_Modal}>
                  <div>
                    <WebRtc></WebRtc>
                  </div>
                </div>
              </MenuRight>
            )}
          </span>
        </div> */}
        <div className={styles.leftMenu}> {/* leftMenu */}
          <span onClick={onClickUserChatting}>
            <img className={styles.gravatarLeftImg} src={gravatar.url('', { s: '28px', d: 'retro' })} alt='' />
            {chattingShowUserMenu && (  
              <MenuLeft show={chattingShowUserMenu} onCloseModal={onCloseUserChatting}>
                <div className={styles.chatting_Modal}>
                  <div>
                    <div className={styles.chattingTitle}></div>
                    <div className={styles.chats}>
                      {/* <MetaChannel /> */}
                      <MetaChannel username='test1' room={data.id}/>
                    </div>
                  </div>
                </div>
              </MenuLeft>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

const speed = 200;
class GameScene extends Phaser.Scene {
  constructor() {
    super('gameScene')
  }
  
  preload() {
    this.load.image('tiles', '/images/FloorAndGround.png')
    this.load.tilemapTiledJSON('map', '/images/Metaverse_room.json')

    this.load.spritesheet('dude', '/images/adam.png', {
      frameWidth: 32,
      frameHeight: 45
    })
  }

  create() {
    const map = this.make.tilemap({ key: 'map' })
    
    const tileset = map.addTilesetImage('FloorAndGround', 'tiles')
    const belowLay = map.createLayer('below player', tileset, 0, 0)
    const worldLayer = map.createLayer('world', tileset, 0, 0)
    const aboveLayer = map.createLayer('above player', tileset, 0, 0)

    aboveLayer?.setDepth(100)

    worldLayer?.setCollisionByProperty({ collides: true })

    const debugGraphics = this.add.graphics().setAlpha(0.0)
    worldLayer?.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(255, 255, 50, 255),
      faceColor: new Phaser.Display.Color(0, 255, 0, 255)
    })

    player = this.physics.add.sprite(200, 130, 'dude').setScale(0.5)

    player.setCollideWorldBounds(true)
    this.physics.add.collider(player, worldLayer)
    this.physics.world.bounds.width = 700
    this.physics.world.bounds.height = 700
    this.cameras.main.setBounds(0, 0, 700, 700)
    this.cameras.main.startFollow(player, true, 0.8, 0.8)
  }

  update() {
    player.body.setVelocity(0);
    
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        player.body.setVelocityX(-speed);
      } else if (e.key === 'ArrowRight') {
        player.body.setVelocityX(speed);
      }

      if (e.key === 'ArrowUp') {
        player.body.setVelocityY(-speed)
      } else if (e.key === 'ArrowDown') {
        player.body.setVelocityY(speed)
      }

      if (e.key === 'Enter') {
        //console.log('엔터 때문')
      }
    });
    
    
    // 메타버스 내에 캐릭터 움직임 공유
    socket.emit('updatePlayer', { posy: player.body.y, posx: player.body.x });
    socket.on('updatePlayers', function (data) {
      //console.log('프론트 쪽 데이터 옴: '+ data)
      if (othersprites[0] != undefined) {
        for (let sprite of othersprites) {
            sprite.destroy(true);
        }
        othersprites = [];
    }
      others = data;
    })

    if (others != null) {
      for (let i = 0; i < others.length; i++) {
        if (others[i].id != socket.id) {
          let newPlayer = this.physics.add.sprite(others[i].posx, others[i].posy, 'dude').setScale(0.5);
          othersprites.push(newPlayer);
        }
      }
    }
  }
}

export default Meta;