import React from 'react';
import EditProduct from '../components/editProduct';
import {HomeScreenNavigationProp} from './types';

type ProductDetailScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const EditProductScreen: React.FC<ProductDetailScreenProps> = ({
  navigation,
}) => {
  return <EditProduct navigation={navigation} />;
};

export default EditProductScreen;
