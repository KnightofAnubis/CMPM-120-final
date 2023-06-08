class Credit extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    create() {
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "Credits", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, "Created by Kelsey Melott and Yasha Bell", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.5 - borderUISize - borderPadding, "Assets made with:", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1 - borderUISize - borderPadding, "Press SPACE to return to the Menu.", menuConfig).setOrigin(0.5);
        //input for moving to next scene
        this.cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
     

    }

    update() {
         //moving to next scene...
         if(keySPACE.isDown){
            this.scene.start('menuScene');
        }
        
    }
}