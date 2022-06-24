class SpaceShip {
    constructor() {
        this.position = {
            x : document.getElementById('ship').offsetLeft, /*posicao atual em x */
            y : document.getElementById('ship').offsetTop /*posicao atual em y */
        } 
    } 

    setX() {
        document.getElementById('ship').style.left = this.position.x
    }  

    canMove(value) { /* Verificar se pode mover */
        if(value >= 10 && value < 1240) {
            return true
        } 
        return false
    }
}

class Missil {

    constructor() {
        this.missilEmMovimento = []
    }

    fire(x,y) {
        this.missilEmMovimento.push({ 
            x: x+20,
            y: y-10
        })
        this.drawMissil()
    }

    removeMissil(){

        var missilDisponiveis = this.missilEmMovimento;
        for(var missil=0; missil < missilDisponiveis.length; missil++ ) {
            
            if (missilDisponiveis[missil].y < 0) {
                this.missilEmMovimento.splice(missil,1);
            }
        }
    }

    drawMissil() {
        document.getElementById('missil').innerHTML = ''
        for(var missil=0; missil < this.missilEmMovimento.length; missil++ ) {
            document.getElementById('missil').innerHTML += `<img src='image/retangulo.png' id='image-retangulo' alt='retangulo' 
            style='left:${this.missilEmMovimento[missil].x}px; top: ${this.missilEmMovimento[missil].y}px';>`;
        }
    }

    moveMissil(){
        for(var missil=0; missil < this.missilEmMovimento.length; missil++ ) {
            this.missilEmMovimento[missil].y -= 5; 

            for(var i=0; i < enemy.list_of_enemys.length; i++) {
                if (this.missilEmMovimento[missil].y - enemy.list_of_enemys[i].y < 20 ) { 
                    enemy.list_of_enemys.splice(i,1)
                }
            }
            
        }
        this.removeMissil()
    }

} 

class Enemy {

    constructor() {
        
        var enemy = {
            x: 640,
            y: 10
        }

        this.list_of_enemys = [enemy];

    }

    addEnemyToList(postionX,positionY) { 
        var enemy = {
            x : postionX, 
            y : positionY
        }

        this.list_of_enemys.push(enemy)

    }

    drawEnemy() {
        document.getElementById('enemy').innerHTML = ''
        for(var i=0; i < this.list_of_enemys.length; i++) {
            document.getElementById('enemy').innerHTML += `<div id='enemy' style='left:${this.list_of_enemys[i].x}px; top: ${this.list_of_enemys[i].y+=1}px';>
            <img src='image/enemy.png' id='image-enemy' alt='enemy'></div>` ;
        }
    } 

    checkEnemy() {

        for(var i=0; i < this.list_of_enemys.length; i++) {

            if(this.list_of_enemys[i].y >= 670) {
                this.list_of_enemys.splice(i,1)
            }
        } 

        this.drawEnemy()
    }


}
const enemy = new Enemy()
const space_ship = new SpaceShip();
const missil = new Missil()

var fire =  false

document.addEventListener('keydown', function(e) { 

    if (!e.repeat) {

        if (e.key == 'ArrowLeft') {
            //console.log(space_ship.position.x) 
            if(space_ship.canMove(space_ship.position.x-10)) {
                space_ship.position.x -= 10
                space_ship.setX()
            }
        } 
    
        else if(e.key == 'ArrowRight') {
            //console.log(space_ship.position.x)
            if(space_ship.canMove(space_ship.position.x+10)) {
                space_ship.position.x += 10
                space_ship.setX()
            }
        } 
    
        else if (e.key == ' ') {
            var x = space_ship.position.x
            var y = space_ship.position.y
            missil.fire(x,y)
        }

    }
})


function gameLoop() {
    enemy.checkEnemy()
    setTimeout(gameLoop, 20)
    missil.moveMissil()
    missil.drawMissil()

}
gameLoop()

