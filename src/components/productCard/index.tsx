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

const ProductCard = ({
  product,
  handleProduct,
}: {
  product: ProductType;
  handleProduct: (productId: string) => void;
}) => {
  return (
    <ProductContainer onPress={() => handleProduct(product.id || '')}>
      <ProductImage src={product.imageUrl?.split(',')[0]} />
      <StyledText color="#382E1E" fontSize={20} fontWeight="bold">
        {product.name}
      </StyledText>
      <StyledText color="#382E1E" fontSize={12} fontWeight="bold">
        {product.description}
      </StyledText>
      <RowView alignItems="center" justifyContent="space-between">
        <RowView alignItems="center">
          <ProductPriceText>
            $ {product.sizes?.length && product.sizes[0].price}
          </ProductPriceText>
        </RowView>
        <AddToCartButton>
          <PlusSVG />
        </AddToCartButton>
      </RowView>
    </ProductContainer>
  );
};

export default ProductCard;
