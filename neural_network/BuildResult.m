function Y1 = BuildResult(Y0)
  result_variation = max(Y0) - min(Y0);
  number_of_training_sets = size(Y0, 1);
  Y1 = zeros(number_of_training_sets, result_variation + 1);
  idx = 1;
  for i = Y0'
    Y1(idx, i) = 1;
    idx++;
  endfor
endfunction
