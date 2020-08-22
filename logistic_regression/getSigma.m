function sigma = getSigma(X, Y, Theta)
	m = size(X, 1); % number of training sets
	_Hypotesis = hypothesis(X, Theta);
	sigma = 1/m * transpose(X) * (_Hypotesis - Y); 
endfunction
  

