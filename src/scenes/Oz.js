class Oz extends Phaser.Scene {
    constructor() {
        super('ozScene');
    }
    preload() {
        this.load.path = './assets/'
        this.load.image('tilesetImage', 'tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON','Wiz.json');
    }

    create() {

    }

    update() {

    }
}
/*
    create() {
        //scene test without tilemap:
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "This is Oz!", menuConfig).setOrigin(0.5);

        //for when bubble appears and what happens after...
        this.bubbleTimer = this.time.addEvent({
            delay: 1000,
            callback: this.goodWitch,
            callbackScope: this,
            loop: false
        });

    }

    update() {

        //moving bubble... represents the 'good witch'
        if(this.bubble){
            if(this.bubble.x > 320){
                this.bubble.x += -1.5;
                this.bubble.y += 1;
               
            } else{
                this.bubble.scaleX += .05;
                this.bubble.scaleY += .05;
                this.time.delayedCall(4000, () => {
                    //play pop sound
                    this.scene.start('forestScene');
                });
            }
        }
    }

    goodWitch() {
        this.bubble = this.add.image(640, 0, 'bubble', 0);
    }
}
*/
