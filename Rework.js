class Body{
    
    constructor(mass, pos, vel, color, planets, index){
        this.mass = mass;
        this.pos = pos;
        this.vel = vel;
        this.color = color;

        this.radii = [];
        this.planets = planets;
        this.index = index;

        for(let i = 0; i < planets.length(); i++){
            this.radii.append([0,0]);
        }

        this.acc = [0,0];
    }


    setGravity(){
        
    }

}
