function main(X)
  [U, V, D] = do_pca(X);
  variation_probability = retain_variations_depends_on_number_of_features(V);
  display(variation_probability);
endfunction
