class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, game.config.height/2, game.config.width * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';
        // load graphics assets
        this.load.image('title', 'title.png');
        //scene tornado
        this.load.image('tornado', 'tornado.png');
        this.load.image('houseShadow', 'houseShadow.png');
        this.load.image('witch', 'witch.png');
        //scene munchkins
        this.load.image('bubble', 'bubble.png');
        this.load.image('flower01', 'flower01.png');
        this.load.image('flower02', 'flower02.png');
        this.load.image('flower03', 'flower03.png');
        //Wiz scene
        this.load.path ='./assets/wiz/'
        this.load.image('particleBase','particleBase.png');
        this.load.image('demonOpen','demonOpen.png');
        this.load.image('demonClose','demonClose.png');
        this.load.image('smoke', 'cloud.png');
        this.load.image('fireball', 'fireball.png');
        this.load.aseprite('theIronCurtain', 'curtain.png','curtain.json')
        this.load.atlas('wizSprite', 'wizSprite.png', 'wizSprite.json')
        //tilemap
        this.load.path = './assets/'
        this.load.image('tilesetImage', 'tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON','munchkin.json');
        this.load.tilemapTiledJSON('tilemapWizJSON','wiz/wiz.json');
        this.load.tilemapTiledJSON('tilemapForestJSON','forest.json');
        // load audio assets
        this.load.audio('munchkin', 'oz.wav');
        this.load.audio('pop', 'pop.wav');
        this.load.audio('wind', 'wind.wav');
        this.load.audio('forest', 'forest.wav');
        //char aseprite sheets
        this.load.aseprite('dorothy', 'dorothy.png', 'dorothy.json');
        this.load.path = './assets/sideChar/'
        this.load.aseprite('tin', 'tinman.png', 'tinman.json');
        this.load.aseprite('lion', 'lion.png', 'lion.json');
        this.load.aseprite('scare', 'scarecrow.png', 'scarecrow.json');


    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
    }
}