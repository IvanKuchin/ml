function result = mean_normalization(X)
  result = X - 1/size(X, 1) * sum(X);
endfunction
