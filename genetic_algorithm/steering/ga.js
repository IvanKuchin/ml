function calculateFitness()
{
  currentBestDistance = Infinity;

  for(i = 0; i < population.length; ++i)
  {
    d = calcDistance(population[i]);
    fitness[i] = 1 / (d + 1);

    if(d < bestDistance)
    {
      bestDistance = d;
      bestInstance = population[i];
    }

    if(d < currentBestDistance)
    {
      currentBestDistance = d;
      currentBestInstance = population[i];
    }


  }
};

function normalizeFitness()
{
  var sum = 0;

  for(i = 0; i < population.length; ++i)
  {
    sum += fitness[i];
  }

  for(i = 0; i < population.length; ++i)
  {
    fitness[i] = fitness[i] / sum;
  }

};

function nextGeneration()
{
  var new_population = [];

  for(var i = 0; i < population.length; ++i)
  {
    new_population[i] = crossover(pickOne(population, fitness), pickOne(population, fitness));
    mutate(new_population[i]);
  }

  population = new_population;
};

function crossover(orderA, orderB)
{
  var shortestObjA = GetShortestIdx(orderA);
  var shortestObjB = GetShortestIdx(orderB);
  var pathDistanceA = calcDistance(orderA);
  var pathDistanceB = calcDistance(orderB);
  var mainPath, inserterPath;
  var finalOrder = [];
  var insertPosition = floor(random(order.length - 1));
  var i;

  if(pathDistanceA < pathDistanceB)
  {
    mainPath = orderA;
    inserterPath = shortestObjB;
  }
  else
  {
    mainPath = orderB;
    inserterPath = shortestObjA;
  }

  for(i = 0; i < mainPath.length; ++i) finalOrder[i] = Infinity;

  finalOrder[insertPosition] = (inserterPath.cityBIdx);
  finalOrder[insertPosition + 1] = (inserterPath.cityAIdx);

  for(i = 0; i < mainPath.length; ++i)
  {
    if(!finalOrder.includes(mainPath[i])) insert_into_arr_at_inf(finalOrder, mainPath[i]);
  }

  return finalOrder;
};

function insert_into_arr_at_inf(arr, item)
{
  for(var i = 0; i < arr.length; ++i)
  {
    if(arr[i] == Infinity)
    {
      arr[i] = item;
      break;
    }
  }
};

function GetShortestIdx(order, avoid_idx1, avoid_idx2)
{
  var d;
  var shortestIdx = 0;
  var cityA, cityB;
  var shortestObj = {};

  shortestObj.dist = Infinity;

  for(var i = 0; i < order.length - 1; ++i)
  {
    if(i == avoid_idx1) {}
    else if(i == avoid_idx2) {}
    else if((i + 1) == avoid_idx1) {}
    else if((i + 1) == avoid_idx2) {}
    else
    {
      cityA = cities[order[i]];
      cityB = cities[order[i+1]];

      d = dist(cityA.pos.x, cityA.pos.y, cityB.pos.x, cityB.pos.y);

      if(d < shortestObj.dist)
      {
        shortestObj.dist = d;
        shortestObj.cityAIdx = i;
        shortestObj.cityBIdx = i + 1;
      }
    }
  }

  return shortestObj;
};

function pickOne(list, prob)
{
  var index = 0;
  var r = random(1);

  while(r > 0)
  {
    r = r - prob[index++];
  }

  --index;

  return list[index].slice();
};

function mutate(order, mutationRate)
{
  if(random(1) < 0.01)
  {
    var indexA = floor(random(order.length));
    var indexB = floor(random(order.length));

    swap(order, indexA, indexB);
  }
};
