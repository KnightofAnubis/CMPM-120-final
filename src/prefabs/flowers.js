class flowers extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.onOverlap = true;
        this.body.isCircle = true;
        this.scene = scene;       
    }

    update() {

        
    }

}