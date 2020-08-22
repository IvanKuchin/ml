function failed_predictions = PredictionStatistic(H, actual_value)
  if(size(H, 1) == size(actual_value, 1))
    [max_H_value, max_H_idx] = max(H, [], 2);
    max_H_idx -= 1;
    
    low_confidence = 0;
    failed_prediction = 0;
    failed_predictions = [];
    for i = [1:size(max_H_value, 1)]
      if(max_H_value(i) <= 0.5)
        ++low_confidence;
      endif
      if(max_H_idx(i) != actual_value(i))
        ++failed_prediction;
        failed_predictions = [failed_predictions; i];
      endif
    endfor
    
    printf("%f%% failed_prediction\t%f%% low_confidence\n", failed_prediction / size(H, 1) * 100, low_confidence / size(H, 1) * 100);
  else
    display("H and actual size have different size");
  endif
endfunction
