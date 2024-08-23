import React, {useEffect, useState} from 'react';
import {
  CreateProductButton,
  CreateProductContainer,
  ImagePreview,
  SizePill,
  StyledFlatList,
  StyledInput,
  UploadButton,
} from './styles';
import {Control, FieldValues, useController, useForm} from 'react-hook-form';
import {ColumnView, RowView, StyledText} from '../../globalStyles';

import UploadSVG from '../../assets/Upload.svg';
import ArrowBackSVG from '../../assets/ArrowBack.svg';
import Categories from '../categories';
import {CategoryType} from '../../slices/categorySlice';
import {ItemSeparator} from '../home/styles';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import apiClient from '../../axios';
import ImagePicker from 'react-native-image-crop-picker';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAllCategories} from '../../actions/categoryActions';
import {createProduct} from '../../actions/productActions';
interface ControlledInputProps {
  name: string;
  control: Control;
  multiline?: boolean;
  placeholder: string;
  numeric?: boolean;
  max?: number;
}
const ControlledInput = ({
  name,
  control,
  multiline = false,
  placeholder,
  numeric = false,
  max,
}: ControlledInputProps) => {
  const {field} = useController({name, control, defaultValue: ''});
  return (
    <StyledInput
      maxLength={max}
      placeholder={placeholder}
      value={field.value}
      keyboardType={numeric ? 'numeric' : 'default'}
      onChangeText={field.onChange}
      multiline={multiline}
    />
  );
};

const intialSizes = [
  {size: 'Small', price: 0},
  {size: 'Medium', price: 0},
  {size: 'Large', price: 0},
];

const CreateProduct = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.category.categories);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    categories[0],
  );
  const navigation = useNavigation();
  const {control, handleSubmit, watch} = useForm();
  const [sizes, setSize] =
    useState<{size: string; price: number}[]>(intialSizes);

  const smallSize = watch('Small');
  const mediumSize = watch('Medium');
  const largeSize = watch('Large');
  const description = watch('description');
  const name = watch('name');
  const about = watch('about');
  useEffect(() => {
    dispatch(getAllCategories(null));
  }, [dispatch]);
  const handleImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        mediaType: 'photo',
        includeBase64: true,
      });
      setIsLoadingImage(true);
      const response = await apiClient.post('/cloudinary/upload', {
        image: image.data,
      });
      setIsLoadingImage(false);
      setImageUrls([...imageUrls, response.data.url]);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSize([
      {size: 'Small', price: smallSize},
      {size: 'Medium', price: mediumSize},
      {size: 'Large', price: largeSize},
    ]);
  }, [smallSize, mediumSize, largeSize]);

  const isButtonDisabled =
    isLoadingImage ||
    imageUrls.length === 0 ||
    sizes.every(size => size.price <= 0) ||
    categories.every(category => !category.name) ||
    name === '' ||
    description === '' ||
    about === '';

  console.log(isButtonDisabled);
  const onSubmit = async (data: FieldValues) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        about: data.about,
        imageUrl: imageUrls.join(','),
        sizes: sizes.filter(size => size.price > 0),
        stock: 100,
        categoryId: selectedCategory.id,
      };
      console.log(payload);
      await dispatch(createProduct(payload));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CreateProductContainer>
      <RowView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowBackSVG width={20} height={20} color={'#382E1E'} />
        </TouchableOpacity>
        <StyledText color="#382E1E" fontSize={25} fontWeight="bold" ml={15}>
          Create Product
        </StyledText>
      </RowView>
      <StyledText
        color="#382E1E"
        fontSize={18}
        fontWeight="bold"
        mt={20}
        mb={10}>
        Name
      </StyledText>
      <ControlledInput
        name={'name'}
        control={control}
        placeholder={'Name'}
        max={20}
      />
      <StyledText
        color="#382E1E"
        fontSize={18}
        fontWeight="bold"
        mt={20}
        mb={10}>
        Description
      </StyledText>
      <ControlledInput
        name={'description'}
        control={control}
        placeholder={'With chocolate...'}
        max={48}
      />
      <StyledText
        color="#382E1E"
        fontSize={18}
        fontWeight="bold"
        mt={20}
        mb={10}>
        About
      </StyledText>
      <ControlledInput
        placeholder={'About'}
        name={'about'}
        control={control}
        multiline
        max={150}
      />
      <StyledText
        color="#382E1E"
        fontSize={18}
        fontWeight="bold"
        mt={20}
        mb={10}>
        Sizes
      </StyledText>
      <RowView justifyContent="space-between">
        {sizes.map(s => (
          <ColumnView width={'30%'} key={s.size}>
            <SizePill selected={s.price > 0}>
              <StyledText color={s.price > 0 ? 'white' : '#382E1E'}>
                {s.size}
              </StyledText>
            </SizePill>
            <ControlledInput
              numeric
              name={s.size}
              control={control}
              placeholder="0.00"
              max={6}
            />
          </ColumnView>
        ))}
      </RowView>
      <StyledText
        color="#382E1E"
        fontSize={18}
        fontWeight="bold"
        mt={20}
        mb={10}>
        Select Category
      </StyledText>
      <Categories
        onCategoryPress={category => {
          setSelectedCategory(category);
        }}
        categories={categories}
        selectedCategory={selectedCategory}
      />
      <UploadButton onPress={handleImagePicker}>
        <UploadSVG color={'#00512D'} width={15} height={15} />
        <StyledText color="#00512D" fontSize={15} fontWeight="bold">
          Upload Images
        </StyledText>
      </UploadButton>
      {isLoadingImage && <ActivityIndicator size="large" color="#D9D9D9" />}
      <StyledFlatList
        ItemSeparatorComponent={ItemSeparator}
        horizontal
        data={imageUrls}
        renderItem={({item}) => <ImagePreview src={item as string} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <CreateProductButton
        isDisabled={isButtonDisabled}
        onPress={handleSubmit(onSubmit)}
        disabled={isButtonDisabled}>
        <StyledText color="white" fontSize={20} fontWeight="bold">
          Create Product
        </StyledText>
      </CreateProductButton>
    </CreateProductContainer>
  );
};

export default CreateProduct;
