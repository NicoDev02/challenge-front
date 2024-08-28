import React, {useEffect, useState} from 'react';
import {
  EmptyProfilePicture,
  HomeContainer,
  ItemSeparator,
  OfferContainer,
  OfferImage,
  OfferTag,
  ProfilePicture,
  StyledFlatlist,
} from './styles';
import SearchBar from '../searchBar';
import {ColumnView, RowView, StyledText} from '../../globalStyles';
import BellSVG from '../../assets/Bell.svg';
import Categories from '../categories';
import ProductCard from '../productCard';
import {ProductType} from '../../slices/productSlice';
import {TouchableOpacity} from 'react-native';
import {login, logout} from '../../actions/loginActions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {CategoryType} from '../../slices/categorySlice';
import {getAllCategories} from '../../actions/categoryActions';
import {getAllProducts} from '../../actions/productActions';
import {HomeScreenNavigationProp} from '../../screens/types';

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<HomeProps> = ({navigation}) => {
  const {categories} = useAppSelector(state => state.category);
  const {products} = useAppSelector(state => state.product);

  const {user} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>();
  useEffect(() => {
    dispatch(getAllCategories(null));
    dispatch(getAllProducts(null));
  }, [dispatch]);

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [categories]);

  const filteredProducts = products.filter(
    product => product.categoryId === selectedCategory?.id,
  );

  const handleLogin = async () => {
    try {
      await dispatch(login());
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  const handleAuth = () => {
    user ? handleLogout() : handleLogin();
  };
  return (
    <HomeContainer>
      <ColumnView pt={25} pl={25} pr={25} alignItems="flex-start">
        <RowView
          justifyContent="space-between"
          alignItems="center"
          mb={15}
          width={'100%'}>
          <TouchableOpacity onPress={handleAuth}>
            {user ? (
              <ProfilePicture src={user?.picture} />
            ) : (
              <EmptyProfilePicture />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              user && navigation.navigate('CreateProduct' as never)
            }>
            <BellSVG width={25} height={30} />
          </TouchableOpacity>
        </RowView>
        <StyledText color="#382E1E" fontSize={22} fontWeight="bold" mb={18}>
          Good {new Date().getHours() > 12 ? 'Afternoon' : 'Morning'},{' '}
          {user?.name || 'Guest'}
        </StyledText>
        <SearchBar />
        <StyledText
          color="#382E1E"
          fontSize={18}
          fontWeight="bold"
          mt={20}
          mb={10}>
          Categories
        </StyledText>
        <Categories
          selectedCategory={selectedCategory}
          categories={categories}
          onCategoryPress={category => {
            setSelectedCategory(category);
          }}
        />
      </ColumnView>
      <StyledFlatlist
        horizontal
        extraData={selectedCategory}
        ItemSeparatorComponent={ItemSeparator}
        data={filteredProducts}
        // @ts-ignore
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ProductCard
            handleProduct={id =>
              navigation.navigate('ProductDetail', {productId: id})
            }
            product={item as ProductType}
          />
        )}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{paddingRight: 10}}
        ListHeaderComponent={
          <RowView>
            <ItemSeparator key={1} width={10} />
          </RowView>
        }
      />
      {products.length !== 0 && (
        <>
          <StyledText
            color="#382E1E"
            fontSize={18}
            fontWeight="bold"
            pl={25}
            mb={10}>
            Special Offer 🔥
          </StyledText>
          <OfferContainer>
            <OfferImage src={products[0].imageUrl?.split(',')[0]} />
            <ColumnView
              flex={1}
              justifyContent="center"
              padding={15}
              position="relative">
              <OfferTag>
                <StyledText color="white" fontSize={12} fontWeight="bold">
                  Discount Sales
                </StyledText>
              </OfferTag>
              <StyledText color="#382E1E" fontSize={16} fontWeight="bold">
                {`Get two ${products[0].name} for the price of one`}
              </StyledText>
            </ColumnView>
          </OfferContainer>
        </>
      )}
      <StyledText
        color="#382E1E"
        fontSize={18}
        fontWeight="bold"
        mt={20}
        mb={10}
        pl={25}>
        All Products
      </StyledText>
      <StyledFlatlist
        ItemSeparatorComponent={ItemSeparator}
        numColumns={2}
        // eslint-disable-next-line react-native/no-inline-styles
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
        data={products}
        // @ts-ignore
        scrollEnabled={false}
        keyExtractor={item => (item as ProductType).id as string}
        renderItem={({item}) => (
          <ProductCard
            handleProduct={id =>
              navigation.navigate('ProductDetail', {productId: id})
            }
            product={item as ProductType}
          />
        )}
      />
    </HomeContainer>
  );
};

export default Home;
