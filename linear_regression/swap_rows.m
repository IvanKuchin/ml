function X = swap_rows(X, row1, row2)
  temp = X(row1, :);
  X(row1, :) = X(row2, :);
  X(row2, :) = temp;
endfunction
