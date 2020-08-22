var cities = [];
var num_cities = 10;
var population = [];
var fitness = [];

var bestDistabnce = Infinity;
var bestInstance = [];

var order = [];

function setup(){

  createCanvas(400, 300);

  InitCalculations();
};

function draw() {
  background(220);

  UpdateCalculations();
  calculateFitness()
  normalizeFitness()
  nextGeneration();

  DrawCities();
  DrawBestPath();
};

function InitCalculations()
{
  var i, d;

  cities = [];

  for(i = 0; i < num_cities; ++i) {
    cities.push(new City());
    order[i] = i;
  }

  for(i = 0; i < 10; ++i) {
    population[i] = shuffle(order);
  }
  // debugger;
}

function UpdateCalculations()
{
  var i, d;

};

function DrawBestPath() 
{
  var i, cityA, cityB;

  for(i = 0; i < cities.length; ++i)
  {
    cities[i].DrawBottomPart();
  }
  for(i = 0; i < bestInstance.length - 1; ++i)
  {
    cityA = cities[bestInstance[i]];
    cityB = cities[bestInstance[i + 1]];
    line(cityA.pos.x, cityA.pos.y + height / 2, cityB.pos.x, cityB.pos.y + height / 2);
  }
};

function DrawCities() {
  for(var i = 0; i < cities.length; ++i) {
    cities[i].Draw();
  }
};

function City() {
  this.pos = createVector(random(width - 20) + 10, random(height/2 - 20) + 10);

  this.Draw = function() {
    ellipse(this.pos.x, this.pos.y, 10, 10);
  };
  this.DrawBottomPart = function() {
    ellipse(this.pos.x, this.pos.y + height / 2, 10, 10);
  };
} 

function calcDistance(order) {
  var sum = 0;
  var cityA, cityB;

  for(var i = 0; i < cities.length -1; ++i)
  {
    cityA = cities[order[i]];
    cityB = cities[order[i + 1]];

    sum += dist(cityA.pos.x, cityA.pos.y, cityB.pos.x, cityB.pos.y);
  }

  return sum;
}

function swap(l, idx1, idx2)
{
  var temp = l[idx1];
  l[idx1] = l[idx2];
  l[idx2] = temp;
}