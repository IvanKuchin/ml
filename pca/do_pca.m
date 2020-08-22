function [U, V, D] = do_pca(X)
  X1 = mean_normalization(X);
  X2 = feature_scaling(X1);

  Sigma = get_sigma(X2);

  [U, V, D] = svd(Sigma);
endfunction
