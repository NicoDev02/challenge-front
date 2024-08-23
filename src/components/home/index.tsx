import React, {useState} from 'react';
import {
  EmptyProfilePicture,
  FlatlistFooter,
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
import CapuccinoSVG from '../../assets/Cappuccino.svg';
import ColdBrewSVG from '../../assets/ColdBrew.svg';
import EspressoSVG from '../../assets/Espresso.svg';
import {CategoryType} from './types';
import ProductCard from '../productCard';
import {ProductType} from '../../slices/productSlice';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {login, logout} from '../../actions/loginActions';
import {useAppDispatch, useAppSelector} from '../../hooks';
const products: ProductType[] = [
  {
    name: 'Cappuccino',
    sizes: [
      {
        id: '1',
        name: 'Small',
        price: 2.5,
      },
      {
        id: '2',
        name: 'Medium',
        price: 3.5,
      },
      {
        id: '3',
        name: 'Large',
        price: 4.5,
      },
    ],
    about:
      'Cappuccino is a coffee preparation that combines equal parts of espresso and steamed milk.',
    // max length 48 characters
    description: 'With chocolate and milk syrup and milk with milk',
    categoryId: '1',
    createdAt: new Date(),
    imageUrl:
      'https://res.cloudinary.com/dgrmx6aau/image/upload/v1723596273/alpschyojgdf88isbajg.jpg',
    id: '1',
    stock: 10,
  },
  {
    name: 'Cappuccino',
    sizes: [
      {
        id: '1',
        name: 'Small',
        price: 2.5,
      },
      {
        id: '2',
        name: 'Medium',
        price: 3.5,
      },
      {
        id: '3',
        name: 'Large',
        price: 4.5,
      },
    ],
    about:
      'Cappuccino is a coffee preparation that combines equal parts of espresso and steamed milk.',
    description: 'With milk',
    categoryId: '1',
    createdAt: new Date(),
    imageUrl:
      'https://res.cloudinary.com/dgrmx6aau/image/upload/v1723596273/alpschyojgdf88isbajg.jpg',
    id: '2',
    stock: 10,
  },
  {
    name: 'Cappuccino',
    sizes: [
      {
        id: '1',
        name: 'Small',
        price: 2.5,
      },
      {
        id: '2',
        name: 'Medium',
        price: 3.5,
      },
      {
        id: '3',
        name: 'Large',
        price: 4.5,
      },
    ],
    about:
      'Cappuccino is a coffee preparation that combines equal parts of espresso and steamed milk.',
    description: 'With chocolate and milk syrup and milk',
    categoryId: '1',
    createdAt: new Date(),
    imageUrl:
      'https://res.cloudinary.com/dgrmx6aau/image/upload/v1723596273/alpschyojgdf88isbajg.jpg',
    id: '3',
    stock: 10,
  },
];
const initialCategories: CategoryType[] = [
  {
    name: 'Cappuccino',
    icon: CapuccinoSVG,
    selected: true,
  },
  {
    name: 'Cold Brew',
    icon: ColdBrewSVG,
    selected: false,
  },
  {
    name: 'Espresso',
    icon: EspressoSVG,
    selected: false,
  },
];

const Home = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState(initialCategories);
  const {user} = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();
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
  const handleCategoryChange = (category: CategoryType) => {
    setCategories(
      categories.map(c => ({
        ...c,
        selected: c.name === category.name,
      })),
    );
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
              <EmptyProfilePicture src={user?.picture} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateProduct' as never)}>
            <BellSVG width={25} height={30} />
          </TouchableOpacity>
        </RowView>
        <StyledText color="#382E1E" fontSize={22} fontWeight="bold" mb={18}>
          Good evening, Monice
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
          categories={categories}
          onCategoryPress={handleCategoryChange}
        />
      </ColumnView>
      <StyledFlatlist
        horizontal
        ItemSeparatorComponent={ItemSeparator}
        data={products}
        // @ts-ignore
        keyExtractor={item => item.id}
        renderItem={({item}) => <ProductCard product={item as ProductType} />}
        ListFooterComponent={
          <RowView>
            <ItemSeparator key={1} width={15} />
            <FlatlistFooter>
              <StyledText color="black" fontSize={18} fontWeight="bold">
                Show more
              </StyledText>
            </FlatlistFooter>
            <ItemSeparator key={3} width={10} />
          </RowView>
        }
        ListHeaderComponent={
          <RowView>
            <ItemSeparator key={1} width={10} />
          </RowView>
        }
      />
      <StyledText
        color="#382E1E"
        fontSize={18}
        fontWeight="bold"
        pl={25}
        mb={10}>
        Special Offer 🔥
      </StyledText>
      <OfferContainer>
        <OfferImage src="https://res.cloudinary.com/dgrmx6aau/image/upload/v1723596273/alpschyojgdf88isbajg.jpg" />
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
            Get two ice flowered cappuccinos for the price of one
          </StyledText>
        </ColumnView>
      </OfferContainer>
    </HomeContainer>
  );
};

export default Home;
