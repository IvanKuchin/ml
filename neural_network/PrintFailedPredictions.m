function PrintFailedPredictions(failed_predictions, H, test_Labels, test_Images)
  [max_H_value, max_H_idx] = max(H, [], 2);
  max_H_idx -= 1;

  for i = failed_predictions'
    printf("hypothesis is %d, should_be %d\n", max_H_idx(i), test_Labels(i));
    digit_to_print = round(test_Images(i, :) ./ 64);
    for y = [0:27]
      for x = [1:28]
        char = digit_to_print( y * 28 + x);
        if(char == 0)
          printf(" ");
        endif
        if(char == 1)
          printf("*");
        endif
        if(char == 2)
          printf("+");
        endif
        if(char == 3)
          printf("=");
        endif
        if(char == 4)
          printf("#");
        endif
      endfor
      printf("\n");
    endfor
  endfor
endfunction
