import styled from 'styled-components/native';

export const ProductImage = styled.Image({
  width: 150,
  height: 150,
  borderRadius: 30,
});

export const AddToCartButton = styled.TouchableOpacity({
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#00512D',
});

export const ProductContainer = styled.TouchableOpacity({
  borderRadius: 40,
  width: 180,
  height: 290,
  justifyContent: 'space-between',
  backgroundColor: 'white',
  padding: 15,
  elevation: '4',
  marginVertical: 8,
});

export const ProductPriceText = styled.Text({
  color: '#382E1E',
  fontSize: 18,
  fontWeight: 'bold',
  lineHeight: '22px',
  marginRight: 2,
});
