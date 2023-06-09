class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {

        //some text instructions
        //this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "Journey Through Oz", menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, "Use WASD to move.", menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2.5 - borderUISize - borderPadding, "Press SPACE to continue...", menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/1 - borderUISize - borderPadding, "Press the UP arrow for Credits.", menuConfig).setOrigin(0.5);
        
        //title page
        this.add.image(game.config.width/2, game.config.height/2, 'title', 0).setOrigin(0.5);
    
        //input for moving to next scene
        this.cursors = this.input.keyboard.createCursorKeys();
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update() {
        //moving to next scene...
        if(this.cursors.space.isDown){
            this.scene.start('ozScene');
        }
        //credits
        if(keyC.isDown){
            this.scene.start('creditScene');
        }

    }
}