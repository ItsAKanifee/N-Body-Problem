const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const G = 6.67408e-11;
const mD = 1e11; // mass dilation factor

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


function setup() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStar();
    let mass1 = document.getElementById("mass1").value == 0 ? 10: parseFloat(document.getElementById("mass1").value);
    let mass2 = document.getElementById("mass2").value == 0 ? 10: parseFloat(document.getElementById("mass2").value);
    let mass3 = document.getElementById("mass3").value == 0 ? 10: parseFloat(document.getElementById("mass3").value);

    let l1 = document.getElementById("xpos1").value == 0 ? canvas.width/2: parseFloat(document.getElementById("xpos1").value);
    let l2 = document.getElementById("xpos2").value == 0 ? canvas.width/3: parseFloat(document.getElementById("xpos2").value);
    let l3 = document.getElementById("xpos3").value == 0 ? canvas.width/3 * 2: parseFloat(document.getElementById("xpos3").value);

    let h1 = document.getElementById("ypos1").value == 0 ? canvas.height/3: canvas.height - parseFloat(document.getElementById("ypos1").value);
    let h2 = document.getElementById("ypos2").value == 0 ? canvas.height/3 * 2: canvas.height - parseFloat(document.getElementById("ypos2").value);
    let h3 = document.getElementById("ypos3").value == 0 ? canvas.height/3 * 2: canvas.height - parseFloat(document.getElementById("ypos3").value);

    let vx1 = document.getElementById("xvel1").value == 0 ? 0: parseFloat(document.getElementById("xvel1").value);
    let vx2 = document.getElementById("xvel2").value == 0 ? 0: parseFloat(document.getElementById("xvel2").value);
    let vx3 = document.getElementById("xvel3").value == 0 ? 0: parseFloat(document.getElementById("xvel3").value);

    let vy1 = document.getElementById("yvel1").value == 0 ? 0: -parseFloat(document.getElementById("yvel1").value);
    let vy2 = document.getElementById("yvel2").value == 0 ? 0: -parseFloat(document.getElementById("yvel2").value);
    let vy3 = document.getElementById("yvel3").value == 0 ? 0: -parseFloat(document.getElementById("yvel3").value);

    Planet1 = new Body(mass1, [l1, h1], [vx1, vy1], "red");
    Planet2 = new Body(mass2, [l2, h2], [vx2, vy2], "blue");
    Planet3 = new Body(mass3, [l3, h3], [vx3, vy3], "green");

    Planet1.setGravity(Planet2, Planet3);
    Planet2.setGravity(Planet1, Planet3);
    Planet3.setGravity(Planet1, Planet2);

    Planet1.draw();
    Planet2.draw();
    Planet3.draw();
    
}

function Body(_mass, _pos, _vel, color) {
    this.mass = _mass;
    this.pos = _pos;
    this.vel = _vel;

    this.acc = [0,0];
    this.r1 = [0,0];
    this.r2 = [0,0];
    
    this.color = color;

    this.setRadiusVector = function (oP) { // oP means other planet, call this method twice to set both redius vectors
        out = [0,0];
        out[0] = oP.pos[0] - this.pos[0];
        out[1] = oP.pos[1] - this.pos[1];
        return out;
    }

    this.setGravity = function (p2, p3) { /* Idk if the objects are copied, or if the references are the acutal planet object, 
        so to keep radii constantly changing, use this function to update references every time the frame is updated*/

        this.vel[0] += this.acc[0];
        this.vel[1] += this.acc[1];

        this.r1 = this.setRadiusVector(p2);
        this.r2 = this.setRadiusVector(p3);

        let magr1 = mag(this.r1);
        let magr2 = mag(this.r2);

        if(magr1 == 0 || magr2 == 0){
            reset();
        }

        let angle1 = Math.atan2(this.r1[1], this.r1[0]);
        let angle2 = Math.atan2(this.r2[1], this.r2[0]);

        let Grav1 = G * p2.mass * mD / (magr1**2); // gets the gravitational magnitudes of each planet
        let Grav2 = G * p3.mass * mD / (magr2**2);

        Grav1vect = [Grav1 * Math.cos(angle1), Grav1 * Math.sin(angle1)];
        Grav2vect = [Grav2 * Math.cos(angle2), Grav2 * Math.sin(angle2)];


        this.acc = [Grav1vect[0] + Grav2vect[0], Grav1vect[1] + Grav2vect[1]];

        console.log(this.acc);
    }

    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.pos[0], this.pos[1], 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    this.update = function () {

        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];

        
        this.draw();
    }

    this.outBounds = function () {
        if (this.pos[0] < 0 || this.pos[0] > canvas.width || this.pos[1] < 0 || this.pos[1] > canvas.height) {
            return true;
        }
        return false;
    }

}

function mag(vec) {
    return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
}

function run() {
    anim = requestAnimationFrame(run);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStar();

    Planet1.update();
    Planet2.update();
    Planet3.update();

    if(Planet1.outBounds() && Planet2.outBounds() && Planet3.outBounds()){
        reset();
    }


    Planet1.setGravity(Planet2, Planet3);
    Planet2.setGravity(Planet1, Planet3);
    Planet3.setGravity(Planet1, Planet2);
    
}

function drawStar(){
    let i = 0;
    while (i < 30){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        star(x, y);
        i++;
    }
}

function star(x, y){
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(x, y, 1, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function reset() {
    cancelAnimationFrame(anim);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setup();
}



setup();
