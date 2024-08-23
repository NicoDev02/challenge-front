import React from 'react';
import {CategoryPill, StyledImage} from './styles';
import ColdBrewSVG from '../../assets/ColdBrew.svg';
import EspressoSVG from '../../assets/Espresso.svg';
import {RowView, StyledText} from '../../globalStyles';
import {CategoryType} from '../../slices/categorySlice';
import {FlatList} from 'react-native';

const Categories = ({
  onCategoryPress,
  categories,
  selectedCategory,
}: {
  selectedCategory: CategoryType | undefined;
  onCategoryPress: (category: CategoryType) => void;
  categories: CategoryType[];
}) => {
  return (
    categories.length > 0 && (
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) =>
          item.name === 'Cappuccino' ? (
            <CategoryPill
              key={item.name}
              selected={selectedCategory?.id === item.id}
              onPress={() => onCategoryPress(item)}>
              <RowView alignItems="center" bgColor="transparent">
                <StyledImage
                  source={require('../../assets/cappuccino.png')}
                  selected={selectedCategory?.id === item.id}
                />
                <StyledText
                  fontSize={12}
                  ml={5}
                  color={
                    selectedCategory?.id === item.id ? 'white' : '#382E1E'
                  }>
                  {item.name}
                </StyledText>
              </RowView>
            </CategoryPill>
          ) : item.name === 'Cold Brew' ? (
            <CategoryPill
              key={item.name}
              selected={selectedCategory?.id === item.id}
              onPress={() => onCategoryPress(item)}>
              <RowView alignItems="center" bgColor="transparent">
                <ColdBrewSVG
                  color={selectedCategory?.id === item.id ? 'white' : '#382E1E'}
                  width={20}
                  height={20}
                />
                <StyledText
                  fontSize={12}
                  ml={5}
                  color={
                    selectedCategory?.id === item.id ? 'white' : '#382E1E'
                  }>
                  {item.name}
                </StyledText>
              </RowView>
            </CategoryPill>
          ) : item.name === 'Espresso' ? (
            <CategoryPill
              key={item.name}
              selected={selectedCategory?.id === item.id}
              onPress={() => onCategoryPress(item)}>
              <RowView alignItems="center" bgColor="transparent">
                <EspressoSVG
                  color={selectedCategory?.id === item.id ? 'white' : '#382E1E'}
                  width={20}
                  height={20}
                />
                <StyledText
                  fontSize={12}
                  ml={5}
                  color={
                    selectedCategory?.id === item.id ? 'white' : '#382E1E'
                  }>
                  {item.name}
                </StyledText>
              </RowView>
            </CategoryPill>
          ) : null
        }
      />
    )
  );
};

export default Categories;
