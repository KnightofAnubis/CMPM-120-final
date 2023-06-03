
class Munchkin extends Phaser.Scene {
    constructor() {
        super('munchkinScene');
        
        this.VEL = 100;
    }
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

        
        
    }

    goodWitch() {
        //enter bubble of the good witch
        this.bubble = this.add.image(640, 0, 'bubble', 0);
        if(this.bubble.x > 320){
            this.bubble.x += -1.5;
            this.bubble.y += 1;
        } else{
            //gets bigger
            this.basicTween = this.tweens.add({
                targets: this.bubble,
                scale: { from: 1, to: 10 },
                ease: 'Sine.easeInOut',
                duration: 2000,
                repeat: 1, 
                yoyo: false,
                hold: 1000,
            });
            this.basicTween.play();
            this.time.delayedCall(4000, () => {
                    //play pop sound
                this.scene.start('forestScene');
            });
        }
        
    }
}

