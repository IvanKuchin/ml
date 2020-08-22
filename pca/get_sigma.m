function result = get_sigma(X)
  result = 1 / size(X, 2) .* X' * X;
endfunction
