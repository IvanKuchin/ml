function [result, theta1, theta2, theta3] = LearnNetwork(X, Y, number_of_nodes_in_hidden_layer, precision)
  number_of_training_sets = size(X,1);
  number_of_outputs = size(Y, 2);
  
  % --- add bias to X
  X = [ones(number_of_training_sets,1) X];
  % --- add bias to hidden layer
  number_of_nodes_in_hidden_layer += 1;
  [theta1, theta2, theta3] = InitTheta(size(X, 2), number_of_nodes_in_hidden_layer, number_of_outputs);

  sliding_window_size = min(randi(10) + 10, number_of_training_sets);
  sliding_window_size = number_of_training_sets;

  % [X, scaleX] = FeatureScaling(X);
  
  result = [];
  while((size(result) < 10) || (abs(result(size(result, 1)) - result(size(result, 1) - 1)) > precision))
    sliding_window_start = 0;
    while(sliding_window_start + sliding_window_size <= size(X, 1))
      % --- batch calculation
      X_temp = X(sliding_window_start + 1:sliding_window_start + sliding_window_size, :);
      Y_temp = Y(sliding_window_start + 1:sliding_window_start + sliding_window_size, :);

      [D1, D2, D3] = BackProp(X, Y, theta1, theta2, theta3);
      
      theta1 -= D1;
      theta2 -= D2;
      theta3 -= D3;
      
      result = [result; costJ(X_temp, Y_temp, theta1, theta2, theta3)];

      if(mod(size(result, 1), 100) == 0) 
        printf("iteration %d\t tried images %d\t last error %f\n", size(result,1), size(result,1) * sliding_window_size, result(size(result, 1)));
        % CheckGradient(X, Y, theta1, theta2, theta3, D1, D2, D3);
      end
      if(result(size(result, 1)) == Inf) 
        display("algorithm diverges"); 
        break; 
      end
      sliding_window_start = sliding_window_start + sliding_window_size;
    end
    if(result(size(result, 1)) == Inf) break; end
    
%    display("unconditional break");
%    break;
  end
  % display("result theta1:");
  % display(theta1);
  % display("result theta2:");
  % display(theta2);
  % display("result theta3:");
  % display(theta3);
  % display(theta .* scaleX');
  printf("number of trained images %d\n", size(result,1) * sliding_window_size);
endfunction
