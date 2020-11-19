var canvas;
var backgroundImg;
var mario, marioImage, marioHeadImage, marioDeadImage;
var ground, groundImg, invisibleGround;
var enemy, enemy1, enemy2, enemy3, enemy4, enemy5, enemyGroup;
var score;

function preload()
{
    backgroundImg = loadImage("images/bg.png");
    
    marioImage = loadAnimation("images/mario_01.png", "images/mario_02.png", "images/mario_03.png", "images/mario_04.png");
    marioDeadImage = loadImage("images/mario_dead.png");
    marioHeadImage = loadImage("images/mario_head.png");

    enemy1 = loadImage("images/enemy_01.png");
    enemy2 = loadImage("images/enemy_02.png");
    enemy3 = loadImage("images/enemy_03.png");
    enemy4 = loadImage("images/enemy_04.png");
    enemy5 = loadImage("images/enemy_05.png");

    groundImg = loadImage("images/ground.png");
}

function setup()
{
    canvas = createCanvas(800, 600);

    score = 0;

    ground = createSprite(width, height - 10, width, 20);
    ground.addImage(groundImg);
    ground.scale = 0.7;

    invisibleGround = createSprite(width/2, height - 9, width, 20);
    invisibleGround.visible = false;

    mario = createSprite(80, height - 40, 50, 50);
    mario.addAnimation("mario", marioImage);
    mario.addAnimation("dead", marioDeadImage);
    mario.scale = 0.4;

    enemyGroup = new Group();
}

function draw()
{
    background(backgroundImg);

    fill("black");
    textSize(26);
    text("SCORE : " + score, 40, 25);

    ground.velocityX = -4;
    if(ground.x < 0)
    {
        ground.x = width;
    }

    console.log(mario.y);
    if(keyDown(UP_ARROW) && mario.y >= 530)
    {
        mario.velocityY = -15;
    }
    mario.velocityY = mario.velocityY + 0.8;

    if(enemyGroup.isTouching(mario))
    {
        score = 0;

        enemyGroup.setVelocityXEach(0);
        enemyGroup.setLifetimeEach(-1);

        ground.velocityX = 0;

        mario.velocityY = 0;
        mario.changeAnimation("dead", marioDeadImage);
        mario.y = height - 10;
    }

    spawnEnemy();

    mario.collide(invisibleGround);
    drawSprites();
}

function spawnEnemy()
{
    if(frameCount % 300 === 0)
    {
        enemy = createSprite(width, height - 55, 50, 50);
        enemy.velocityX = -4;

        var rand = Math.round(random(1, 5));
        switch(rand)
        {
            case 1:
                enemy.addImage(enemy1);
                break;
            case 2:
                enemy.addImage(enemy2);
                break;
            case 3:
                enemy.addImage(enemy3);
                break;
            case 4:
                enemy.addImage(enemy4);
                break;
            case 5:
                enemy.addImage(enemy5);
                break;
            default: break;
        }

        enemy.scale = 0.4;
        enemy.lifetime = 300;

        mario.depth = enemy.depth + 1;

        enemyGroup.add(enemy);
    }
}