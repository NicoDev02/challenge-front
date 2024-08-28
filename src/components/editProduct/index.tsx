import React, {useEffect, useState} from 'react';
import {
  CreateProductButton,
  CreateProductContainer,
  DeleteButton,
  ImagePreview,
  ImagePreviewContainer,
  SizePill,
  StyledFlatList,
  StyledInput,
  UploadButton,
} from '../createProduct/styles';
import {Control, FieldValues, useController, useForm} from 'react-hook-form';
import {ColumnView, RowView, StyledText} from '../../globalStyles';

import UploadSVG from '../../assets/Upload.svg';
import ArrowBackSVG from '../../assets/ArrowBack.svg';
import DeleteSVG from '../../assets/DeleteBin.svg';
import Categories from '../categories';
import {CategoryType} from '../../slices/categorySlice';
import {ItemSeparator} from '../home/styles';
import {
  ActivityIndicator,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import apiClient from '../../axios';
import ImagePicker from 'react-native-image-crop-picker';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAllCategories} from '../../actions/categoryActions';
import {updateProduct} from '../../actions/productActions';
import {SizeType} from '../../slices/productSlice';
import {HomeScreenNavigationProp} from '../../screens/types';
interface ControlledInputProps {
  name: string;
  control: Control;
  multiline?: boolean;
  placeholder: string;
  numeric?: boolean;
  max?: number;
  defaultValue?: string;
}
const ControlledInput = ({
  name,
  control,
  multiline = false,
  placeholder,
  numeric = false,
  max,
  defaultValue = '',
}: ControlledInputProps) => {
  const {field} = useController({name, control, defaultValue});
  return (
    <StyledInput
      maxLength={max}
      placeholder={placeholder}
      value={
        numeric ? field.value.toString().replace(/[^0-9.]/g, '') : field.value
      }
      keyboardType={numeric ? 'numeric' : 'default'}
      onChangeText={field.onChange}
      multiline={multiline}
    />
  );
};

const ImageItem = ({
  image,
  handleDelete,
}: {
  image: string;
  handleDelete: (path: string) => void;
}) => {
  return (
    <ImagePreviewContainer>
      <ImagePreview src={image} />
      <DeleteButton onPress={() => handleDelete(image)}>
        <DeleteSVG width={18} height={18} fill="red" />
      </DeleteButton>
    </ImagePreviewContainer>
  );
};

interface UpdateSize {
  id?: string;
  size: string;
  price: number;
}

const EditProduct = ({navigation}: {navigation: HomeScreenNavigationProp}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.category.categories);
  const {product, isLoading} = useAppSelector(state => state.product);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>();
  const {control, handleSubmit, watch} = useForm();
  const [sizes, setSize] = useState<UpdateSize[] | undefined>([]);

  const description = watch('description');
  const name = watch('name');
  const about = watch('about');
  useEffect(() => {
    dispatch(getAllCategories(null));
  }, [dispatch]);
  const handleImagePicker = async () => {
    try {
      setIsLoadingImage(true);
      const image = await ImagePicker.openPicker({
        width: 750,
        height: 750,
        cropping: true,
        mediaType: 'photo',
        includeBase64: true,
      });
      if (image) {
        const response = await apiClient.post('/cloudinary/upload', {
          image: image.data,
        });
        setImageUrls([...imageUrls, response.data.url]);
      } else {
        throw new Error('Error selecting image');
      }
      setIsLoadingImage(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (product) {
      let initialSizes: UpdateSize[] = [
        {
          size: 'Small',
          price: 0,
        },
        {
          size: 'Medium',
          price: 0,
        },
        {
          size: 'Large',
          price: 0,
        },
      ];
      if (product.sizes) {
        product.sizes.map((size: SizeType, i) => {
          if (size.size === initialSizes[i].size) {
            initialSizes[i].price = size.price;
            initialSizes[i].id = size.id;
          } else {
            initialSizes[i].price = 0;
          }
        });
        console.log(initialSizes);
        setSize(initialSizes);
      }
      if (categories) {
        setSelectedCategory(
          categories.find(category => category.id === product.categoryId) ||
            categories[0],
        );
      }
      setImageUrls(product.imageUrl?.split(',') || []);
    }
  }, [product, categories]);

  const isButtonDisabled =
    isLoadingImage ||
    imageUrls.length === 0 ||
    sizes?.every(size => size.price <= 0) ||
    categories.every((category: CategoryType) => !category.name) ||
    name === '' ||
    description === '' ||
    about === '';

  const onSubmit = async (data: FieldValues) => {
    try {
      const filteredSizes = sizes?.filter(size => size.price > 0);
      await Promise.all(
        deletedImages.map(async id => {
          await apiClient.delete(`/cloudinary/delete/${id}`);
        }),
      );
      const payload = {
        id: product?.id,
        name: data.name,
        description: data.description,
        about: data.about,
        imageUrl: imageUrls.join(','),
        sizes: filteredSizes?.map(size => ({
          id: size.id,
          size: size.size,
          price: parseFloat(size.price.toString()),
        })) as SizeType[],
        stock: 100,
        categoryId: selectedCategory?.id,
      };
      console.log(payload);
      await dispatch(updateProduct(payload));
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (path: string) => {
    const parts = path.split('/');
    const fileId = parts[parts.length - 1].split('.')[0];
    setDeletedImages([...deletedImages, fileId]);
    setImageUrls(imageUrls.filter(image => image !== path));
  };
  const renderItem: ListRenderItem<string> = ({item}) => (
    <ImageItem image={item} handleDelete={() => handleDelete(item)} />
  );
  return (
    <CreateProductContainer>
      <RowView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowBackSVG width={20} height={20} color={'#382E1E'} />
        </TouchableOpacity>
        <StyledText color="#382E1E" fontSize={25} fontWeight="bold" ml={15}>
          Edit Product
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
        defaultValue={product?.name}
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
        defaultValue={product?.description}
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
        defaultValue={product?.about}
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
        {sizes?.map(s => (
          <ColumnView width={'30%'} key={s.size}>
            <SizePill selected={s.price > 0}>
              <StyledText color={s.price > 0 ? 'white' : '#382E1E'}>
                {s.size}
              </StyledText>
            </SizePill>
            <StyledInput
              defaultValue={s.price.toString()}
              keyboardType="numeric"
              placeholder="0.00"
              maxLength={6}
              onChangeText={text => {
                if (text === '') {
                  setSize(prev => {
                    if (prev) {
                      return prev.map(p => {
                        if (p.size === s.size) {
                          return {...p, price: 0};
                        }
                        return p;
                      });
                    }
                  });
                }

                const price = parseFloat(
                  text.toString().replace(/[^0-9.]/g, ''),
                );
                if (!isNaN(price)) {
                  setSize(prev => {
                    if (prev) {
                      return prev.map(p => {
                        if (p.size === s.size) {
                          return {...p, price};
                        }
                        return p;
                      });
                    }
                  });
                }
              }}
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
        data={[...imageUrls] as string[]}
        //@ts-ignore
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#D9D9D9" />
      ) : (
        <CreateProductButton
          isDisabled={isButtonDisabled}
          onPress={handleSubmit(onSubmit)}
          disabled={isButtonDisabled}>
          <StyledText color="white" fontSize={20} fontWeight="bold">
            Save Product
          </StyledText>
        </CreateProductButton>
      )}
    </CreateProductContainer>
  );
};

export default EditProduct;
