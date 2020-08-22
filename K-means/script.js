var K;

function setup(){
  createCanvas(400, 300);

  K = new Kmeans();
  K.init();
}

function draw() {
  background(150);

  K.run();
  K.draw();
}

function TrainingSet()
{
  this.pos = [];

  this.init = function()
  {
    var centerX;
    var centerY;


    for (var i = 0; i < 50; i++) {
      centerX = 100;
      centerY = 100;

      this.pos.push(createVector(random(centerX - 50, centerX + 50), random(centerY - 50, centerY + 50)));

      centerX = 200;
      centerY = 200;

      this.pos.push(createVector(random(centerX - 50, centerX + 50), random(centerY - 50, centerY + 50)));

      centerX = 300;
      centerY = 100;

      this.pos.push(createVector(random(centerX - 50, centerX + 50), random(centerY - 50, centerY + 50)));
    }
  }

  this.draw = function()
  {
    for (var i = this.pos.length - 1; i >= 0; i--) {
      ellipse(this.pos[i].x, this.pos[i].y, 5, 5);
    }
  }
}

function Centroids (){
  this.pos = [];

  this.init = function() 
  {

  }

  this.__add = function(vec)
  {
    this.pos.push(vec);
  }

  this.draw = function()
  {
    push();
    for (var i = this.pos.length - 1; i >= 0; i--) {
      fill(255,0,0);
      ellipse(this.pos[i].x, this.pos[i].y, 5, 5);
    }
    pop();
  }

}

function mouseClicked() {
  K.C.__add(createVector(mouseX, mouseY));

  // prevent default
  return false;
}

function Kmeans()
{
  var X;
  var C;

  this.init = function()
  {
    this.X = new TrainingSet();
    this.X.init();
    this.C = new Centroids();
    this.C.init();
  }

  this.draw = function()
  {
    this.X.draw();
    this.C.draw();
  }

  this.run = function()
  {
    var u = [];
    var min_dist, curr_dist, k_set, x_sum, y_sum;



      for (var i = this.X.pos.length - 1; i >= 0; i--)
      {
        // X.pos[i]
        min_dist = Infinity;
        min_idx = -1;
        for (var j = this.C.pos.length - 1; j >= 0; j--)
        {
          curr_dist = dist(this.X.pos[i].x, this.X.pos[i].y, this.C.pos[j].x, this.C.pos[j].y);
          if(curr_dist < min_dist)
          {
            min_dist = curr_dist;
            min_idx = j;
          }
        }

        u[i] = min_idx;
      }

    for (var k = this.C.pos.length - 1; k >= 0; k--)
    {
      k_set = [];
      x_sum = 0;
      y_sum = 0;

      for(i = 0; i < u.length; ++i)
      {
        if(u[i] == k) k_set.push(this.X.pos[i]);
      }

      if(k_set.length)
      {
        for(i = 0; i < k_set.length; ++i)
        {
          x_sum += k_set[i].x;
          y_sum += k_set[i].y;
        }
        this.C.pos[k].x = x_sum / k_set.length;
        this.C.pos[k].y = y_sum / k_set.length;


        for(i = 0; i < k_set.length; ++i)
        {
          line(k_set[i].x, k_set[i].y, this.C.pos[k].x, this.C.pos[k].y);
        }
      }
      else
      {
        console.debug("u(" + this.C.pos[k].x + ", " + this.C.pos[k].y + ") eliminated");
        this.C.pos.splice(k, 1);
      }
    }
  }
}
