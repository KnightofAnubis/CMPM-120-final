//Kelsey Melott <kmelott@ucsc.edu> & Yasha Bell
//Journey through Oz
//time it took: 



'use strict';
//game config
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scene: [Load, Menu,  House,  Munchkin, UI, Forest, Oz, GameOver, Credit]
   
}
//menu config
let menuConfig = {
    fontFamily: "Georgia",
    fontSize: '28px',
    //backgroundColor: '#008080',
    color: '#706553',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 0
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyW, keyA, keyS, keyD, keyC, keySPACE;
let score;
const sceneEvents = new Phaser.Events.EventEmitter();
/* maybe use...
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyR, keyM;
let level;
let highScore;
let newHighScore = false;

*/