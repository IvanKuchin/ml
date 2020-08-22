function J = costJ(X, Y, theta)
	m = size(X, 1); % number of training sets
	predictions = X*theta;
	sqrErrors = (predictions - Y).^2;

	J = 1/(2*m) * sum(sqrErrors);
  
  endfunction
  

