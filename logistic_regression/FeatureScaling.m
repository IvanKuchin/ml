function [newX, scaleX] = FeatureScaling(X)
  scaleX = 1 ./ max(X);
  for i=1:size(X,2)
    newX(:,i) = X(:,i)*scaleX(i);
  end
endfunction
