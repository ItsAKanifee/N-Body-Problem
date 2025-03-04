class Body{
    
    constructor(mass, pos, vel, color, index){
        this.mass = mass;
        this.pos = pos;
        this.vel = vel;
        this.color = color;

        this.radii = [];
        this.index = index;

        this.acc = [0,0];
    }

    set_planets(planets){
        this.planets = planets;
        
        for(let i = 0; i < planets.length(); i++){
            this.radii.append([this.pos[0] - planets[i].pos[0], this.pos[1] - planets[i].pos[1]]);   
        }
    }


    setGravity(){
            
        
    }

}
