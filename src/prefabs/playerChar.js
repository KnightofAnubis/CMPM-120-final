class playerChar extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene
        //add to scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.onOverlap = true;
        this.body.setCollideWorldBounds(true);
        //create anims
        const tags = this.anims.createFromAseprite('dorothy');
        console.log(tags);
        this.isMotion = false;
        this.lastVelocityX = 0;
        this.lastVelocityY = 0;
        this.currentPress = keyW;
    }

    create() { }

    update() {
        //movement
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            this.body.setVelocity(0, -this.scene.VEL);
            this.currentPress = keyW;
        }
        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            this.body.setVelocity(0, this.scene.VEL);
            this.currentPress = keyS;

        }
        if (Phaser.Input.Keyboard.JustDown(keyA)) {
            this.body.setVelocity(-this.scene.VEL, 0);
            this.currentPress = keyA;

        }
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.body.setVelocity(this.scene.VEL, 0);
            this.currentPress = keyD;

        }
        console.log(this.currentPress)
        if (this.currentPress.isUp) {
            this.anims.stopAfterRepeat(0);
            this.body.setVelocity(0, 0);
            this.isMotion = false;
        }

        if(this.lastVelocityX != this.body.velocity.x || this.lastVelocityY != this.body.velocity.y){
            this.lastVelocityY = this.body.velocity.y;
            this.lastVelocityX = this.body.velocity.x;
            if(this.body.velocity.y > 0){
                this.anims.play({ key: 'charDOWN', repeat: -1 });
            }
            if(this.body.velocity.y < 0){
                this.anims.play({ key: 'charUP', repeat: -1 });
            }
            if(this.body.velocity.x > 0){
                this.anims.play({ key: 'charRIGHT', repeat: -1 });
            }
            if(this.body.velocity.x < 0){
                this.anims.play({ key: 'charLEFT', repeat: -1 });
            }

        }


    }
}
