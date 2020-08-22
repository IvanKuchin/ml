function CheckGradient(X, Y, Theta1, Theta2, Theta3, D1, D2, D3)
  printf("check gradient...");
          
  epsilon = 0.1;

  _D1 = D1;
  _D2 = D2;
  _D3 = D3;
  
  for i = [1:size(Theta2, 1)]
    for j = [1:size(Theta2, 2)]
      Theta1_plus_epsilon = Theta1;
      Theta2_plus_epsilon = Theta2;
      Theta3_plus_epsilon = Theta3;
      Theta1_minus_epsilon = Theta1;
      Theta2_minus_epsilon = Theta2;
      Theta3_minus_epsilon = Theta3;
      
      Theta2_plus_epsilon(i,j) += epsilon;
      Theta2_minus_epsilon(i,j) -= epsilon;
      
      costJ_plus_epsilon = costJ(X, Y, Theta1_plus_epsilon, Theta2_plus_epsilon, Theta3_plus_epsilon);
      costJ_minus_epsilon = costJ(X, Y, Theta1_minus_epsilon, Theta2_minus_epsilon, Theta3_minus_epsilon);

      _D2(i, j) = (costJ_plus_epsilon - costJ_minus_epsilon) / (2 * epsilon);
    endfor
    printf("%d", i);
  endfor
  printf("\n");

  diff_D2 = abs(D2 - _D2);
  printf("diff D2: min %f, max %f\n", min(min(diff_D2)), max(max(diff_D2)));
  display(diff_D2);

  endfunction