import React from 'react';
import ProductDetail from '../components/productDetail';
import {HomeScreenNavigationProp} from './types';
import {HomeStackParamList} from '../navigation/stacks/types';
import {RouteProp} from '@react-navigation/native';

type ProductDetailScreenRouteProp = RouteProp<
  HomeStackParamList,
  'ProductDetail'
>;

type ProductDetailScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: ProductDetailScreenRouteProp;
};

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const {productId} = route.params;

  return <ProductDetail productId={productId} navigation={navigation} />;
};

export default ProductDetailScreen;
