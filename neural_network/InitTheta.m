function [theta1, theta2, theta3] = InitTheta(number_of_inputs, number_of_nodes_in_hidden_layer, number_of_outputs)
  theta1 = rand(number_of_inputs, number_of_nodes_in_hidden_layer) * 2 - 1;
  theta2 = rand(number_of_nodes_in_hidden_layer, number_of_nodes_in_hidden_layer) * 2 - 1;
  theta3 = rand(number_of_nodes_in_hidden_layer, number_of_outputs) * 2 - 1;
endfunction
