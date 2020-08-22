function result = retain_variations_depends_on_number_of_features(V)
  result = [];
  for i = 1:size(V, 2)
    result = [result; sum(sum(V)(1:i)) / sum(sum(V)) * 100];
  endfor
endfunction
