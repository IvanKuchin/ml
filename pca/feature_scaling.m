function result = feature_scaling(X)
  result = X ./ max(X);
endfunction
