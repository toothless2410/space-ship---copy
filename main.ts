controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . 2 5 5 5 5 2 . . . . . 
        . . . . 2 5 5 5 5 5 5 2 . . . . 
        . . . . 2 5 5 4 4 5 5 2 . . . . 
        . . . . 2 5 4 4 4 4 5 2 . . . . 
        . . . . 2 4 4 4 4 4 4 2 . . . . 
        . . . . . 2 d 4 4 d 3 . . . . . 
        . . . . . 2 3 1 1 d 2 . . . . . 
        . . . . . . 3 1 1 3 2 . . . . . 
        . . . . . . 2 3 1 2 . . . . . . 
        . . . . . . 2 3 1 2 . . . . . . 
        . . . . . . . 3 1 2 . . . . . . 
        . . . . . . . 3 1 3 . . . . . . 
        . . . . . . . . 3 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SPACESHIP, 0, -100)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    scene.cameraShake(6, 600)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    sprites.destroy(sprite, effects.disintegrate, 500)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.ashes, 400)
    sprites.destroy(projectile, effects.spray, 300)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
    info.changeScoreBy(1)
})
let ENEMYW: Sprite = null
let projectile: Sprite = null
let SPACESHIP: Sprite = null
effects.starField.startScreenEffect()
info.setScore(0)
SPACESHIP = sprites.create(img`
    . . . . 6 6 6 6 6 6 6 . . . . 
    . . 6 6 7 7 7 7 7 7 7 6 6 . . 
    . 6 6 7 7 7 8 8 8 7 7 7 6 6 . 
    . 6 7 7 7 8 8 8 8 8 7 7 7 6 . 
    . c 7 7 8 8 8 8 8 8 8 7 7 c . 
    . c 9 7 8 7 7 7 7 7 8 7 9 c . 
    . c 9 9 7 7 7 7 7 7 7 9 9 c . 
    . c 6 6 9 9 9 9 9 9 9 6 6 c . 
    c c 6 6 6 6 6 6 6 6 6 6 6 c c 
    c d c c 6 6 6 6 6 6 6 c c d c 
    c d d d c c c c c c c d d d c 
    c c b d d d d d d d d d b c c 
    c c c c c b b b b b c c c c c 
    c c b b b b b b b b b b b c c 
    . c c b b b b b b b b b c c . 
    . . . c c c c c c c c c . . . 
    `, SpriteKind.Player)
controller.moveSprite(SPACESHIP, 100, 100)
SPACESHIP.setPosition(75, 105)
SPACESHIP.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(700, function () {
    ENEMYW = sprites.create(img`
        . . . . . . . . c c c c . . . . 
        . . . . c c c c c c c c c . . . 
        . . . c f c c a a a a c a c . . 
        . . c c f f f f a a a c a a c . 
        . . c c a f f c a a f f f a a c 
        . . c c a a a a b c f f f a a c 
        . c c c c a c c b a f c a a c c 
        c a f f c c c a b b 6 b b b c c 
        c a f f f f c c c 6 b b b a a c 
        c a a c f f c a 6 6 b b b a a c 
        c c b a a a a b 6 b b a b b a . 
        . c c b b b b b b b a c c b a . 
        . . c c c b c c c b a a b c . . 
        . . . . c b a c c b b b c . . . 
        . . . . c b b a a 6 b c . . . . 
        . . . . . . b 6 6 c c . . . . . 
        `, SpriteKind.Enemy)
    ENEMYW.setPosition(randint(0, scene.screenWidth()), 0)
    ENEMYW.follow(SPACESHIP, 48)
})
