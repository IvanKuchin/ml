function [resX, resY] = shuffle(X, Y)
  resX = X;
  resY = Y;
  
  for i = 1:size(X,1)
    __rand1 = randi(size(X,1));
    __rand2 = randi(size(X,1));
    
    resX = swap_rows(resX, __rand1, __rand2);
    resY = swap_rows(resY, __rand1, __rand2);
  endfor
endfunction
