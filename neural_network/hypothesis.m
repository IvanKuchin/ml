function [H, A1, Z2, A2, Z3, A3, Z4, A4] = hypothesis(X, Theta1, Theta2, Theta3)
  A1 = X;
  A1(:, 1) = 1; % --- set bias to 1
  Z2 = A1 * Theta1;
  A2 = Sigmoid(Z2);
  A2(:, 1) = 1; % --- set bias to 1
  Z3 = A2 * Theta2;
  A3 = Sigmoid(Z3);
  A3(:, 1) = 1; % --- set bias to 1
  Z4 = A3 * Theta3;
  A4 = Sigmoid(Z4);
  H = A4;
endfunction
