function J = costJ(X, Y, Theta)
	m = size(X, 1); % number of training sets
	_Hypothesis = hypothesis(X, Theta);
  
  % --- log(0) is Inf which affects next calculations
  % --- 0 * log(0) == 0 * Inf = NaN, calculations will break here
  % --- workaround is to take max between (0 and 1e-200), 
  % --- 1e-200 very small value so it won't affect further calculations
  __Hypothesis = max(_Hypothesis, 1e-200);
  __One_Minus_Hypothesis = max(1 - _Hypothesis, 1e-200);
  
  % --- below statement is actually 
	%_Cost = -Y .* log(_Hypothesis) - (1-Y) .* log(1-_Hypothesis)
  
	_Cost = -Y .* log(__Hypothesis) - (1-Y) .* log(__One_Minus_Hypothesis);

	J = 1/m * sum(_Cost);
  
  endfunction
  

