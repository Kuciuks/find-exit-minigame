//Super class
class Target{
    constructor(locationX, locationY){
        this.locationX = locationX;
        this.locationY = locationY;
    }

    //Generate a random location coordinates
    setLocation(randX,randY){         
        this.locationX = randX;
        this.locationY = randY;
    }
}


//Sub class of Target super class
class wTarget extends Target{
    constructor(image = "check.png",name = "wTarget", color = "transparent", locationX, locationY){
        super(locationX,locationY);
        this.name = name;
        this.color = color;
        this.image = image;
    }
}


//Sub class of Target super class
class lTarget extends Target{
    constructor(image = "cancel.png",name = "lTarget", color = "transparent", locationX, locationY){
        super(locationX,locationY);
        this.name = name;
        this.color = color;
        this.image = image;
    }
}
