var vehicles = [];
var vehicles_number = 10;
var targets = [];
var targets_number = 1;

var food = [];
var food_number = 10;

var poison = [];
var poison_number = 10;

var life_book_p;
var life_book = [];

function setup(){

  createCanvas(400, 300);
  life_book_p = createP();

  targets.push(new Target(random(width), random(height)));
}

function draw() {
  background(220);

  RegenerateFood();
  RegeneratePoison();
  RegenerateVehicles();
  DrawSupplies(food);
  DrawSupplies(poison);

  UpdateTargets();
  UpdateVehicles();

  UpdatePopulation();

  DrawTargets();

  UpdateStatistics();
}

function UpdateStatistics()
{
  var longest_life = 0;
  var shortest_life = Infinity;
  var average_life = 0;
  var total_population = 0;

  for(var i = 0; i < life_book.length; ++i)
  {
    if(life_book[i] > longest_life) longest_life = life_book[i];
    if(life_book[i] < shortest_life) shortest_life = life_book[i];
    average_life += life_book[i];
  }

  if(life_book.length)
  {
    life_book_p.html(
      "longest_life:" + longest_life + "<br>" + 
      "shortes_life:" + shortest_life + "<br>" +
      "average_life:" + Math.round(average_life / life_book.length) + "<br>" +
      "# of species:" + life_book.length + "<br>"
      );   
  }

}

function RegenerateVehicles()
{
    var new_vehicle;

    for(i = 0; i < vehicles_number - vehicles.length; ++i)
    {
      new_vehicle = new Vehicle(random(width), random(height), GetNewDNA());
      // new_vehicle = new Vehicle(random(width), random(height), [1, -0.1, random(0, 10)]);

      vehicles.push(new_vehicle);
    }
}

function GetNewDNA()
{
  var parentA = GetParentFromPopulation();
  var parentB = GetParentFromPopulation();
  var parentA_dna = parentA ? parentA.dna : null;
  var parentB_dna = parentB ? parentB.dna : null;

  return MutateDNA(CrosoverParentsDNA(parentA_dna, parentB_dna));
}

function GetParentFromPopulation()
{
  var result = null;
  var sum = 0;
  var random_num = random(1);
  var i;

  for(i = 0; i < vehicles.length; ++i)
  {
    sum += vehicles[i].lifetime;
  }

  for(i = 0; i < vehicles.length; ++i)
  {
    vehicles[i].fitness_score = vehicles[i].lifetime / sum;
  }

  for(i = 0; i < vehicles.length; ++i)
  {
    random_num -= vehicles[i].fitness_score;

    if(random_num < 0)
    {
      result = vehicles[i];
      break;
    }
  }

  return result;
}

function CrosoverParentsDNA(dna1, dna2)
{
  var result = [];

  if(dna1 && dna2)
  {
    slice_part = floor(random(dna1.genes.length));

    for(i = 0; i < slice_part; ++i) result[i] = dna1.genes[i];
    for(i = slice_part; i < dna2.genes.length; ++i) result[i] = dna2.genes[i];
  }
  else
  {
    result = [random(-1, 1), random(-1, 1), random(0, 10)];
  }

  return result;
}

function MutateDNA(dna)
{
  var tenth = 0;

  for(var i = 0; i < dna.length; ++i)
  {
    if(random(1) < 0.1)
    {
      if(random(2) < 1)
      {
        dna[i] += dna[i] / 10;
      }
      else
      {
        dna[i] -= dna[i] / 10;
      }
    }
  }

  return dna;
}

function RegenerateFood()
{
    var new_food;

    for(i = 0; i < food_number - food.length; ++i)
    {
      new_food = new Food(random(width), random(height));

      food.push(new_food);
    }
}

function RegeneratePoison()
{
    var new_poison;

    for(i = 0; i < poison_number - poison.length; ++i)
    {
      new_poison = new Poison(random(width), random(height));

      poison.push(new_poison);
    }
}


function DrawSupplies(list)
{
  for(var i = 0; i < list.length; ++i)
  {
    list[i].draw();
  }
}

function DrawTargets()
{
  for(var i = 0; i < targets.length; ++i)
  {
    targets[i].draw();
  }
}

function UpdateTargets()
{
  for(var i = 0; i < targets.length; ++i)
  {
    targets[i].update();
  }
}

function UpdatePopulation()
{
  for(var i = vehicles.length - 1; i >= 0; --i)
  {
    if(vehicles[i].health == 0)
    {
      life_book.push(vehicles[i].lifetime);
      vehicles.splice(i, 1);
    }
  }
}

function UpdateVehicles()
{
  var closestSmth;

  for(var i = 0; i < vehicles.length; ++i)
  {

    vehicles[i].eat(food);
    vehicles[i].eat(poison);

    closestSmth = vehicles[i].seek_closest(food);
    force = vehicles[i].get_force_to_target(closestSmth);
    force.mult(vehicles[i].dna.genes[0]);
    vehicles[i].applyForce(force);

    closestSmth = vehicles[i].seek_closest(poison);
    force = vehicles[i].get_force_to_target(closestSmth);
    force.mult(vehicles[i].dna.genes[1]);
    vehicles[i].applyForce(force);

    vehicles[i].update();
    vehicles[i].draw();
  }
}

function Target(x, y)
{
  this.pos = createVector(x, y);

  this.update = function()
  {
    // this.pos.x = mouseX;
    // this.pos.y = mouseY;
  }

  this.draw = function(x, y)
  {
    push();

    fill(255, 170);
    translate(this.pos.x, this.pos.y);
    circle(0, 0, 20);

    pop();
  }
}

function DNA(arr)
{
  this.genes = [];
  this.genes = arr;
}

function Vehicle (x, y, dna)
{
  this.acc = createVector(0, 0);
  this.vel = createVector(2, 2);
  this.pos = createVector(x, y);
  this.r = 6;
  this.maxspeed = 8;
  this.maxforce = 0.4;
  this.dna = new DNA(dna);
  this.health = 1;
  this.lifetime = 0;

  this.draw = function()
  {
    push();


    fill(lerpColor(color(255, 0, 0), color(0, 255, 0), this.health), 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    // triangleMode(CENTER);
    triangle(10,0, -5,-5, -5,5);

    stroke(255, 0, 0);
    noFill();
    // line(0, 0, -(this.dna.genes[1] * 30), 0);
    circle(0, 0, this.dna.genes[1] * 100);
    stroke(0, 255, 0);
    // line(0, 0, (this.dna.genes[0] * 30), 0);
    circle(0, 0, this.dna.genes[0] * 100);

    pop();
  }

  this.update = function()
  {
    ++this.lifetime;
    this.health -= 0.005;
    if(this.health < 0) this.health = 0;
    if(this.health > 1) this.health = 1;

    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);

    this.pos.add(this.vel);

    this.acc.mult(0);
  };

  this.applyForce = function(force)
  {
    this.acc.add(force);
  };

  this.get_force_to_target = function(target)
  {
    // --- desired direction
    var desired_vel = p5.Vector.sub(target, this.pos);

    // --- set max speed
    desired_vel.setMag(this.dna.genes[2]);

    // --- steering
    var steer = p5.Vector.sub(desired_vel, this.vel)
    steer.limit(this.maxforce);

    // this.applyForce(steer);
    return steer;
  }

  this.eat = function(list)
  {
    for(var i = list.length - 1; i >= 0; --i)
    {
      d = this.pos.dist(list[i].pos);

      if(d < 5)
      {
        this.health += list[i].nutrition;

        list.splice(i, 1);
      }
    }
  }

  this.seek_closest = function(list)
  {
    var d, best_distance = Infinity, best_index;
    var result = createVector(3, 30);
    var foundFlag = false;

    // --- find closest from the list
    for(var i = 0; i < list.length; ++i)
    {
      d = this.pos.dist(list[i].pos);
      if(d < best_distance)
      {
        best_distance = d;
        best_index = i;
        result = list[best_index].pos.copy();
        foundFlag = true;
      }
    }

    if(!foundFlag)
      {
        console.debug("ATTENTION !!! not found");
        // debugger;
      }

    return result;
  }
}

function Food(x, y)
{
  this.pos = createVector(x, y);
  this.nutrition = 0.1;

  this.draw = function()
  {
    push();

    // noStroke();
    fill(0, 255, 0);
    translate(this.pos.x, this.pos.y);
    ellipse(0,0, 8,8);

    pop();
  }

}

function Poison(x, y)
{
  this.pos = createVector(x, y);
  this.nutrition = -0.1;

  this.draw = function()
  {
    push();

    // noStroke();
    fill(255, 0, 0);
    translate(this.pos.x, this.pos.y);
    ellipse(0,0, 8,8);

    pop();
  }

}