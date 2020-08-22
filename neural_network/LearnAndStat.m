function result = LearnAndStat(prod_Images, prod_Labels, test_Images, test_Labels)
  %for number_of_nodes = [8 16 32 64 128 256]
  %  for precision = [0.1 0.01 0.001 0.0001 0.00001]
  for number_of_nodes = [16]
    for precision = [0.001]
      printf("\n\nnumber_of_nodes %d\tprecision %d\n", number_of_nodes, precision);
      [ErrorVector, Theta1, Theta2, Theta3] = LearnNetwork(prod_Images, prod_Labels, number_of_nodes, precision);
      H = hypothesis(test_Images, Theta1, Theta2, Theta3);
      failed_predictions = PredictionStatistic(H, test_Labels);
      PrintFailedPredictions(failed_predictions, H, test_Labels, test_Images);
    endfor
  endfor
endfunction
