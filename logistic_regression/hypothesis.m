function H = hypothesis(X, Theta)
  _prod = X * Theta;
  
  % --- sigmoid
  H = 1 ./ (1 + exp(-_prod));
endfunction
