function calculateFitness()
{
  for(i = 0; i < population.length; ++i)
  {
    d = calcDistance(population[i]);
    fitness[i] = 1 / (d + 1);

    if(d < bestDistabnce)
    {
      bestDistabnce = d;
      bestInstance = population[i];
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
    new_population[i] = pickOne(population, fitness);
    mutate(new_population[i]);
  }

  population = new_population;
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
  if(random(1) < 0.5)
  {
    var indexA = floor(random(order.length));
    var indexB = floor(random(order.length));

    swap(order, indexA, indexB);
  }
};
