import React from 'react';
import {ProductType} from '../../slices/productSlice';
import PlusSVG from '../../assets/Plus.svg';
import {
  AddToCartButton,
  ProductContainer,
  ProductImage,
  ProductPriceText,
} from './style';
import {RowView, StyledText} from '../../globalStyles';

const ProductCard = ({product}: {product: ProductType}) => {
  return (
    <ProductContainer>
      <ProductImage source={{uri: product.imageUrl}} />
      <StyledText color="#382E1E" fontSize={20} fontWeight="bold">
        {product.name}
      </StyledText>
      <StyledText color="#382E1E" fontSize={12} fontWeight="bold">
        {product.description}
      </StyledText>
      <RowView alignItems="center" justifyContent="space-between">
        <RowView alignItems="center">
          {/*
          This separation of '$' and the price is intentional
          because the font of the app does not have a '$' symbol
        */}
          <ProductPriceText>$</ProductPriceText>
          <StyledText color="black" fontSize={20} fontWeight="bold">
            {product.sizes?.length && product.sizes[0].price}
          </StyledText>
        </RowView>
        <AddToCartButton>
          <PlusSVG />
        </AddToCartButton>
      </RowView>
    </ProductContainer>
  );
};

export default ProductCard;
