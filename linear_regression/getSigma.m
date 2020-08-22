function sigma = getSigma(X, Y, theta)
	m = size(X, 1); % number of training sets
	hypotesis = X*theta;
	sigma = 1/m * transpose(X) * (hypotesis - Y); 
endfunction
  

