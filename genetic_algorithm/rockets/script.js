var population;
var lifespan = 251;
var lifeP;
var generation = 0;
var generationP;
var maxfitP;
var count = 0;
var target;
var obs_rx = 300, obs_ry = 110, obs_rw = 10, obs_rh = 100;

function setup(){
  createCanvas(400, 300);
  population = new Population();
  lifeP = createP();
  generationP = createP();
  maxfitP = createP();
  target = createVector(width / 2, 50);
}

function draw() {
  background(0);
  population.run();
  lifeP.html("lifetime: " + count);
  
  ++count;
  if(count == lifespan) {
    generationP.html("generation: " + ++generation);
    // population = new Population();
    population.evaluate();
    population.selection();
    count = 0;
  }
  
  // --- target
  ellipse(target.x, target.y, 16, 16);
  
  // --- obstacle
  rect(obs_rx, obs_ry, obs_rw, obs_rh);
}

function Population(){
  this.rockets = [];
  this.popsize = 100;
  this.matingpool = [];
  
  for(var i = 0; i < this.popsize; ++i) {
    this.rockets[i] = new Rocket;
  }

  this.evaluate = function() {
    var maxfit = 0;
    
    for(var i = 0; i < this.popsize; ++i) {
      this.rockets[i].calcFitness();      
      maxfit = Math.max(maxfit, this.rockets[i].fitness);
    }
// 
    maxfit = Math.max(1, maxfit); // --- we can't divide by 0 later on
    for(var i = 0; i < this.popsize; ++i) {
      this.rockets[i].fitness /= maxfit;
    }    

    maxfitP.html("maxfit: " + maxfit);

    this.matingpool = [];
    for(var i = 0; i < this.popsize; ++i) {
      var n = this.rockets[i].fitness * 100;
      for(var j = 0; j < n; ++j) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function() {
    var newRockets = [];

    for(var i = 0; i < this.popsize; ++i) {
      // if(i == )
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      var child_dna = parentA.crossover(parentB);
      child_dna.mutation();
      newRockets[i] = new Rocket(child_dna);
    }

    this.rockets = newRockets;
  }

  this.run = function() {
    for(var i = 0; i < this.popsize; ++i) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}

function DNA(genes) {
  if(genes) {
    this.genes = genes;
  }
  else {
    this.genes = [];

    for(var i = 0; i < lifespan; ++i) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(0.1);
    }
  }
  
  this.crossover = function(partner) {
    var newgenes = [];
    var mid = floor(random(this.genes.length));
    
    for(var i = 0; i < this.genes.length; ++i) {
      if(i >= mid) {
        newgenes[i] = this.genes[i];
      }
      else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }
  
  this.mutation = function(){
    for(var i = 0; i < this.genes.length; ++i) {
      if(Math.random() < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.1);
      }
    }
  }
}

function Rocket(dna) {
  this.pos = createVector(width-10, height - 50);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;

  this.pos.limit(1000);
  
  if(dna) {
    this.dna = dna;
  }
  else {
    this.dna = new DNA();
  }
  this.fitness = 0;
  
  this.applyForce = function(force) {
    this.acc.add(force);
  };

  this.calcFitness = function(){
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, 10000, width, 0, true);

    if(this.completed) {
      this.fitness *= 10;
    }
  }
  
  this.isHitObstacle = function() {
    var result = false;
    
    if(
        (obs_rx <= this.pos.x) && (this.pos.x <= (obs_rx + obs_rw)) &&
        (obs_ry <= this.pos.y) && (this.pos.y <= (obs_ry + obs_rh))
      )
      {
        result = true;
      }
    
    return result;
  }
  
  this.update = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if(d < 10) {
      this.completed = true;
      this.pos = target.copy();
    }

    if(this.completed == false) {
      if(this.isHitObstacle()) {
        // --- bounce it from obstacle
        var angle = this.vel.heading();
        var bounce_vec = createVector(1,0);
        bounce_vec.rotate(-angle + Math.PI);
        bounce_vec.setMag(2);
        // bounce_vec.setMag();
        this.applyForce(bounce_vec);
      }
      else{
        this.applyForce(this.dna.genes[count]);
      }

      // this.applyForce(createVector(0, 0.02));
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  };

  this.show = function() {
    push();
    noStroke();
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0,0, 25, 5);
    pop();
  };
}
