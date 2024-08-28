import styled from 'styled-components/native';

export const ProductDetailContainer = styled.View({
  flex: 1,
  position: 'relative',
});

export const ProductImage = styled.Image({
  width: '100%',
  height: 350,
});

export const AddToCartButton = styled.TouchableOpacity({
  width: '100%',
  padding: 25,
  alignSelf: 'center',
  marginHorizontal: 15,
  borderRadius: 60,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#00512D',
});

export const ProductContainer = styled.View({
  zIndex: 2,
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 230,
  left: 0,
});

export const HeaderContainer = styled.View({
  paddingLeft: 25,
  marginBottom: 20,
});
export const BodyContainer = styled.View({
  backgroundColor: 'white',
  borderRadius: 30,
  padding: 25,
  flex: 1,
});

export const InfoProductContainer = styled.View({
  position: 'relative',
  flex: 1,
});

export const ProductPriceText = styled.Text({
  color: '#382E1E',
  fontSize: 14,
  fontWeight: 'bold',
});

export const EditButton = styled.TouchableOpacity({
  paddingVertical: 10,
  paddingHorizontal: 20,
  width: 100,
  marginTop: 10,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#00512D',
});

export const DeleteButton = styled.TouchableOpacity({
  paddingVertical: 10,
  paddingHorizontal: 20,
  width: 100,
  marginTop: 10,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#00512D',
});

interface SizePillProps {
  selected: boolean;
}

export const SizePill = styled.TouchableOpacity<SizePillProps>(
  ({selected}) => ({
    width: 80,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: selected ? '#00512D' : 'white',
    color: selected ? 'white' : '#382E1E',
  }),
);

export const RatingContainer = styled.View({
  backgroundColor: '#CF9F69',
  flexDirection: 'row',
  gap: 5,
  alignItems: 'center',
  padding: 5,
  borderRadius: 30,
});

export const BackArrowButton = styled.TouchableOpacity({
  position: 'absolute',
  zIndex: 1,
  top: 15,
  left: 15,
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
});

export const SizesFlatlist = styled.FlatList({});

interface StyledTextProps {
  color?: string;
  fontSize?: number;
}

export const StyledTextDetail = styled.Text<StyledTextProps>(
  ({color, fontSize}) => ({
    color: color ? color : '#382E1E',
    fontSize: fontSize ? fontSize : 16,
    fontWeight: 'bold',
  }),
);

export const SizesContainer = styled.View({
  height: 50,
  marginVertical: 15,
  backgroundColor: 'transparent',
});

export const AboutContainer = styled.View({
  marginVertical: 15,
  backgroundColor: 'transparent',
  height: 150,
});
