function result = LogisticRegression(X, Y, theta, learning_rate)
  precise = 0.00000001;
  sliding_window_size = min(randi(120) + 1000, size(X, 1));
  sliding_window_size = size(X, 1);

  % [X, scaleX] = FeatureScaling(X);
  
  result = [costJ(X, Y, theta)];
  while((size(result) < 10) || (abs(result(size(result, 1)) - result(size(result, 1) - 1)) > precise))
    sliding_window_start = 0;
    while(sliding_window_start + sliding_window_size <= size(X, 1) + 1)
      % --- batch calculation
      X_temp = X(sliding_window_start + 1:sliding_window_start + sliding_window_size, :);
      Y_temp = Y(sliding_window_start + 1:sliding_window_start + sliding_window_size, :);

      sigma = getSigma(X_temp, Y_temp, theta);
      theta = theta - learning_rate*sigma;
      result = [result; costJ(X_temp, Y_temp, theta)];

      if(mod(size(result, 1), 10000) == 0) 
        display("cost:");
        display(result(size(result,1)));
        display("theta:");
        display(theta);
        result = resize(result, 1, 1);
      end
      if(result(size(result, 1)) == Inf) 
        display("algorithm diverges"); 
        break; 
      end
      sliding_window_start = sliding_window_start + sliding_window_size;
    end
    if(result(size(result, 1)) == Inf) break; end
  end
  display("result theta:");
  display(theta);
  % display(theta .* scaleX');
endfunction
