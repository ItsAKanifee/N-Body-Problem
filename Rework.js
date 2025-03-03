class Body{
    
    constructor(mass, pos, vel, color, others){
        this.mass = mass;
        this.pos = pos;
        this.vel = vel;
        this.color = color;

        this.others = [];

        for(let i = 0; i < others; i++){
            this.others.append([0,0]);
        }

        this.acc = [0,0];
    }

    setRadiusVectors(other_Planet){
        out = [0,0];
        out[0] = other_Planet[0] - this.pos[0];
        out[1] = other_Planet[1] - this.pos[1];
        return out;
    }

    setGravity(){
        
    }

}
