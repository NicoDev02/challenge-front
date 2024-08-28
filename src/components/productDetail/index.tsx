import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {deleteProduct, getProductById} from '../../actions/productActions';
import {
  AboutContainer,
  AddToCartButton,
  BackArrowButton,
  BodyContainer,
  DeleteButton,
  EditButton,
  HeaderContainer,
  InfoProductContainer,
  ProductContainer,
  ProductDetailContainer,
  ProductImage,
  RatingContainer,
  SizePill,
  SizesContainer,
  SizesFlatlist,
  StyledTextDetail,
} from './styles';
import StarSVG from '../../assets/Star.svg';
import ArrowBackSVG from '../../assets/ArrowBack.svg';
import {RowView, StyledText} from '../../globalStyles';
import {HomeScreenNavigationProp} from '../../screens/types';
import {SizeType} from '../../slices/productSlice';

const ProductDetail = ({
  productId,
  navigation,
}: {
  productId: string;
  navigation: HomeScreenNavigationProp;
}) => {
  const dispatch = useAppDispatch();
  const {product} = useAppSelector(state => state.product);
  const {user} = useAppSelector(state => state.user);
  const [selectedSize, setSelectedSize] = useState<SizeType | null>(null);
  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product && product.sizes) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);
  const handleSelectSize = (size: SizeType) => {
    setSelectedSize(size);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(productId));
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductDetailContainer>
      <BackArrowButton onPress={() => navigation.goBack()}>
        <ArrowBackSVG width={25} height={25} color={'white'} />
      </BackArrowButton>
      <ProductImage src={product?.imageUrl?.split(',')[0]} resizeMode="cover" />
      <ProductContainer>
        <InfoProductContainer>
          <HeaderContainer>
            <RowView
              bgColor="transparent"
              justifyContent="space-between"
              pr={25}>
              <StyledText color="white" fontSize={30} fontWeight="bold">
                {product?.name}
              </StyledText>
              <RatingContainer>
                <StarSVG width={10} height={10} />
                <StyledText color="white" fontSize={15}>
                  3.95
                </StyledText>
              </RatingContainer>
            </RowView>
            <StyledText color="white" fontSize={15}>
              {product?.description}
            </StyledText>
          </HeaderContainer>
          <BodyContainer>
            <StyledText color="#382E1E" fontSize={25} fontWeight="bold">
              Coffee Size
            </StyledText>
            <SizesContainer>
              <SizesFlatlist
                data={product?.sizes}
                horizontal
                // eslint-disable-next-line react-native/no-inline-styles
                contentContainerStyle={{
                  justifyContent: 'space-around',
                  width: '100%',
                }}
                keyExtractor={item => (item as SizeType).id as string}
                //@ts-expect-error TODO: Handle type error
                renderItem={({item}: {item: SizeType}) => (
                  <SizePill
                    selected={selectedSize?.id === item.id}
                    onPress={() => handleSelectSize(item)}>
                    <StyledText
                      fontWeight="bold"
                      color={
                        selectedSize?.id === item.id ? 'white' : '#382E1E'
                      }>
                      {item.size}
                    </StyledText>
                  </SizePill>
                )}
              />
            </SizesContainer>
            <StyledTextDetail fontSize={20}>About</StyledTextDetail>
            <AboutContainer>
              <StyledTextDetail>{product?.about}</StyledTextDetail>
            </AboutContainer>
            <AddToCartButton>
              <StyledTextDetail fontSize={20} color="white">
                Add to cart | ${selectedSize?.price}
              </StyledTextDetail>
            </AddToCartButton>
            {user && (
              <RowView alignItems="center" justifyContent="space-around">
                <DeleteButton onPress={handleDelete}>
                  <StyledText color="white" fontSize={18}>
                    Delete
                  </StyledText>
                </DeleteButton>
                <EditButton
                  onPress={() =>
                    navigation.navigate('EditProduct', {productId})
                  }>
                  <StyledText color="white" fontSize={18}>
                    Edit
                  </StyledText>
                </EditButton>
              </RowView>
            )}
          </BodyContainer>
        </InfoProductContainer>
      </ProductContainer>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
