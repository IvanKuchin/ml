function result = LinearRegression(X, Y, theta, learning_rate)
  precise = 0.0000001;
  sliding_window_size = min(randi(120) + 1000, size(X, 1));
  sliding_window_size = size(X, 1);

  display("shuffling");
  [X, Y] = shuffle(X, Y);
  display("mean normalization");
  X = mean_normalization(X);
  X(:, 1) = 1;
  display("feature scaling");
  [X, scaleX] = FeatureScaling(X);
  
  %display("scale matrix:");
  %display(scaleX');
  
  result = [costJ(X, Y, theta)];
  while((size(result) < 10) || (abs(result(size(result, 1)) - result(size(result, 1) - 1)) > precise))
    sliding_window_start = 0;
    while(sliding_window_start + sliding_window_size <= size(X, 1))
      % --- batch calculation
      X_temp = X(sliding_window_start + 1:sliding_window_start + sliding_window_size, :);
      Y_temp = Y(sliding_window_start + 1:sliding_window_start + sliding_window_size, :);

      sigma = getSigma(X_temp, Y_temp, theta);
      theta = theta - learning_rate*sigma;
      result = [result; costJ(X_temp, Y_temp, theta)];

%      printf("theta(1) = %d\tsigma(1)=%f\n", theta(1), sigma(1));
      
      if(mod(size(result, 1), 10000) == 0) 
        display("cost:");
        display(result(size(result,1)));
        display("theta:");
        display(theta .* scaleX');
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
  display("result");
  display(theta .* scaleX');
endfunction
