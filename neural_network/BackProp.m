function [D1, D2, D3] = BackProp(X, Y, Theta1, Theta2, Theta3)
  [H, A1, Z2, A2, Z3, A3, Z4, A4] = hypothesis(X, Theta1, Theta2, Theta3);

  number_of_training_sets = size(H, 1);
  
  % --- calculate "error" of a cost for every neuron
  delta4 = A4 - Y;
  delta3 = delta4 * transpose(Theta3);
  delta2 = delta3 * transpose(Theta2);
% delta1 = delta2 * transpose(Theta1); % --- no delta1, because "error" can't be applied to "input"

  Delta3 = transpose(A3) * delta4;
  Delta2 = transpose(A2) * delta3;
  Delta1 = transpose(A1) * delta2;
  
  D1 = Delta1 / number_of_training_sets;
  D2 = Delta2 / number_of_training_sets;
  D3 = Delta3 / number_of_training_sets;
endfunction
