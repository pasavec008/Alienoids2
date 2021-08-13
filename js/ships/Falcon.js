class Falcon{
    shipID = 1;
    ySize = 70;
    xSize = this.ySize;
    x;  //sets during lvl creation
    y;  //sets during lvl creation
    collisionSize = this.xSize * 0.8;
    dx = 0;
    dy = 0;
    rotation = 0;
    rotationRadians;
    rotationSpeedO = 1.5;
    speedO = 0.05;
    consumptionO = 0.1;
    rotationSpeed;
    speed;
    passiveSlowSpeed = 50;

    animation = 0.95;
    maxHealth = 1000;
    shieldBaseUnit = 500;
    maxShield;
    collisionDamage;
    health;
    shield;
    shieldAbsorption;
    
    shieldSize = 90;
    shieldOffset = (this.shieldSize - this.ySize) / 2;
    hitTimer = 500;
    shieldRegenTime;
    activeShieldTextureTimer = 0;
    activeShieldTexture = 0;

    burn = 0; //in ticks

    primaryFrames = [];
    secondaryFrames = [];
    avionicsFrames = [];
    shieldFrames = [];
    frameConstantX = 150;
    frameConstantChangeX = 110;
    primaryFrameBaseY = 195;
    secondaryFrameBaseY = 345;
    avionicsFrameBaseY = 495;
    shieldFrameBaseY = 645;

    texture = new Image();
    texture_shield = new Image();
    texture_burn = new Image();

    constructor(){
        this.texture.src = "textures/spaceships/0.png";
        this.texture_shield.src = "textures/spaceships/shield0.png";
        this.texture_burn.src = "textures/spaceships/burn0.png";

        //frames
        for(var i = 0; i < 3; i++){
            this.primaryFrames.push(new Frame(this.frameConstantX + i * this.frameConstantChangeX, this.primaryFrameBaseY, 2, -35 + 35 * i, 90))
        }
        for(var i = 0; i < 1; i++){
            this.secondaryFrames.push(new Frame(this.frameConstantX + i * this.frameConstantChangeX, this.secondaryFrameBaseY, 3, 0, 90))
        }
        for(var i = 0; i < 3; i++){
            this.avionicsFrames.push(new Frame(this.frameConstantX + i * this.frameConstantChangeX, this.avionicsFrameBaseY, 4, 0, 90))
        }
        for(var i = 0; i < 2; i++){
            this.shieldFrames.push(new Frame(this.frameConstantX + i * this.frameConstantChangeX, this.shieldFrameBaseY, 5, 0, 90))
        }

        this.primaryFrames[1].item = new LaserGun();
        this.secondaryFrames[0].item = new Rocket();

        this.avionicsFrames[0].item = new SimpleEngine();
        this.avionicsFrames[1].item = new RotationMechanism();

        this.shieldFrames[0].item = new SimpleShieldBattery();
    }

    init(){
        this.x = 1920 / 2 - this.xSize / 2;
        this.y = 1080 * 0.85 / 2 - this.ySize / 2;

        this.health = this.maxHealth;
        this.shield = this.maxShield;
        this.dx = 0;
        this.dy = 0;
        this.rotation = 0;

        this.rotationSpeed = this.rotationSpeedO;
        this.speed = this.speedO;
        this.consumption = this.consumptionO;

        for(var i = 0; i < this.avionicsFrames.length; i++){
            if(this.avionicsFrames[i].item != 0)
                this.avionicsFrames[i].item.enhance(this);
        }

        this.maxShield = 0;
        this.shieldAbsorption = 0;
        this.shieldRegenTime = 0;
        var numberOfShields = 0;
        for(var i = 0; i < this.shieldFrames.length; i++){
            if(this.shieldFrames[i].item != 0){
                this.shieldFrames[i].item.enhance(this);
                numberOfShields++;
            }
        }
        this.shield = this.maxShield;
        this.shieldAbsorption /= numberOfShields;
        this.shieldRegenTime /= numberOfShields;

        this.burn = 0;
    }

    takeDamage(collidedObject){
        var x = collidedObject.collisionDamage;
        this.hitTimer = 0;
        this.activeShieldTextureTimer = 10;
        var shieldDamage = x * this.shieldAbsorption;
        var shipDamage = x - shieldDamage;
        this.shield -= shieldDamage;

        if(this.shield <= 0){
            shipDamage -= this.shield;
            this.shield = 0;
        }

        this.health -= shipDamage;

        if(collidedObject.special)
            collidedObject.specialEffectOnShip(this);
    }

    takeFlatDamage(howMuch){
        this.hitTimer = 0;
        this.activeShieldTextureTimer = 10;
        var shieldDamage = howMuch * this.shieldAbsorption;
        var shipDamage = howMuch - shieldDamage;
        this.shield -= shieldDamage;

        if(this.shield <= 0){
            shipDamage -= this.shield;
            this.shield = 0;
        }

        this.health -= shipDamage;
    }

    change(controller, model){
        //burn
        if(this.burn > 0){
            this.burn--;
            if(model.player.sulfum > this.consumptionO * 10)
                model.player.sulfum -= this.consumptionO * 10;
            this.takeFlatDamage(this.maxHealth / 1000);
        }

        if(this.health <= 0)
            return;

        this.collisionDamage = this.health + this.shield;
        
        this.hitTimer++;
        if(this.hitTimer > this.shieldRegenTime && this.shield < this.maxShield){
            this.activeShieldTextureTimer = 1;
            this.shield += this.maxShield / 500;
            if(this.shield > this.maxShield)
                this.shield = this.maxShield;
        }

        if(this.activeShieldTextureTimer > 0){
            this.activeShieldTextureTimer--;
            this.activeShieldTexture = 1;
        }
        else
            this.activeShieldTexture = 0;


        //passive slow
        if(this.dx > 0)
            this.dx -= this.dx/this.passiveSlowSpeed;
        else if(this.dx < 0)
            this.dx -= this.dx/this.passiveSlowSpeed;
        if(this.dy > 0)
            this.dy -= this.dy/this.passiveSlowSpeed;
        else if(this.dy < 0)
            this.dy -= this.dy/this.passiveSlowSpeed;

        
        if(controller.keys[37]) //left
            this.rotation -= this.rotationSpeed;
        if(controller.keys[39]) //right
            this.rotation += this.rotationSpeed;
        if(this.rotation > 360)
            this.rotation -= 360;
        else if(this.rotation < 0)
            this.rotation += 360;

        if(controller.keys[38] && model.player.sulfum > 0){//up
            if(this.animation <= 5.5)
                this.animation += 0.05;
            else
                this.animation--;

            model.player.sulfum -= this.consumption;
            if(model.player.sulfum < 0)
                model.player.sulfum = 0;

            this.rotationRadians = this.rotation * Math.PI / 180.0;
            this.dy -= Math.cos(this.rotationRadians) * this.speed;
            this.dx += Math.sin(this.rotationRadians) * this.speed;
        }
        else
            if(this.animation >= 1)
                this.animation -= 0.05;
        


        this.x += this.dx;
        this.y += this.dy;

        //edges of map
        if(this.x < 0 || this.x + this.xSize > 1920)
            this.dx *= -1.1;
        if(this.y < 0 || this.y + this.ySize > 1080 * 0.85)
            this.dy *= -1.1;

        //primary weapons
        var tempBoolean = 0;
        if(controller.keys[17] || controller.keys[88])
            tempBoolean = 1;
        else
            tempBoolean = 0;
        for(var i = 0; i < this.primaryFrames.length; i++){
            if(this.primaryFrames[i].item != 0)
                this.primaryFrames[i].item.shoot(model, tempBoolean, this.primaryFrames[i].rotationOfItem);
        }

        //secondary weapons
        if(controller.keys[67])
            tempBoolean = 1;
        else
            tempBoolean = 0;
        for(var i = 0; i < this.secondaryFrames.length; i++){
            if(this.secondaryFrames[i].item != 0)
                this.secondaryFrames[i].item.shoot(model, tempBoolean, this.secondaryFrames[i].rotationOfItem, this);
        }
            
    }

    draw(context){
        if(this.health <= 0)
            return;

        context.save();
        context.translate(this.x + this.xSize / 2, this.y + this.ySize / 2);
        context.rotate(this.rotation * Math.PI / 180.0);
        context.drawImage(this.texture, Math.floor(this.animation) * 200, 0, 200, 200, 0 - this.xSize / 2, 0 - this.ySize / 2, this.xSize, this.ySize);
        if(this.shield)
            context.drawImage(this.texture_shield, this.activeShieldTexture * 230, 0, 230, 230, 0 - this.xSize / 2 - this.shieldOffset, 0 - this.ySize / 2 - this.shieldOffset, this.shieldSize, this.shieldSize);
        context.restore();
        if(this.burn)
            context.drawImage(this.texture_burn, Math.floor((this.burn % 30 / 10)) * 230, 0, 230, 230, this.x + this.xSize / 2 - 45, this.y + this.ySize / 2 - 45, this.shieldSize, this.shieldSize);
    }
}