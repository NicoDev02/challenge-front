import styled from 'styled-components/native';

export const HomeContainer = styled.ScrollView({
  flex: 1,
  backgroundColor: 'white',
});

export const ProfilePicture = styled.Image({
  width: 55,
  height: 55,
  borderRadius: 50,
});
export const EmptyProfilePicture = styled.View({
  width: 55,
  height: 55,
  borderRadius: 50,
  backgroundColor: '#AAAAAA',
});

interface ItemSeparatorProps {
  width?: number;
}
export const ItemSeparator = styled.View<ItemSeparatorProps>(({width}) => ({
  width: width ? width : 15,
}));

export const FlatlistFooter = styled.TouchableOpacity({
  borderRadius: 40,
  width: 180,
  height: 290,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: 15,
  elevation: '4',
});

export const StyledFlatlist = styled.FlatList({
  paddingVertical: 15,
});

export const OfferContainer = styled.TouchableOpacity({
  flexDirection: 'row',
  marginVertical: 10,
  backgroundColor: 'white',
  borderRadius: 40,
  padding: 15,
  marginHorizontal: 15,
  elevation: '6',
});

export const OfferTag = styled.View({
  justifyContent: 'center',
  paddingVertical: 5,
  paddingHorizontal: 10,
  alignItems: 'center',
  backgroundColor: '#CF9F69',
  borderRadius: 15,
  position: 'absolute',
  top: 5,
  left: 10,
});

export const OfferImage = styled.Image({
  width: 150,
  height: 150,
  borderRadius: 30,
});
