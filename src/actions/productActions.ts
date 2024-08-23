import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient, {ErrorAxios} from '../axios';
import {
  ProductPostType,
  ProductType,
  ProductUpdateType,
} from '../slices/productSlice';
import axios from 'axios';

export const getAllProducts = createAsyncThunk<
  ProductType[],
  null,
  {rejectValue: ErrorAxios}
>('product/getAllProducts', async (_, {rejectWithValue}) => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || {message: error.message});
    }
    return rejectWithValue({message: 'Error fetching Products'});
  }
});

export const getProductById = createAsyncThunk<
  ProductType,
  string,
  {rejectValue: ErrorAxios}
>('product/getProductById', async (id, {rejectWithValue}) => {
  try {
    const product = await apiClient.get(`/products/${id}`);
    return product.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || {message: error.message});
    }
    return rejectWithValue({message: 'Error fetching Product'});
  }
});

export const createProduct = createAsyncThunk<
  ProductType,
  ProductPostType,
  {rejectValue: ErrorAxios}
>('product/createProduct', async (productData, {rejectWithValue}) => {
  try {
    const createdProduct = await apiClient.post('/products', productData);
    console.log(createdProduct.data);
    return createdProduct.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || {message: error.message});
    }
    return rejectWithValue({message: 'Error creating Product'});
  }
});

export const deleteProduct = createAsyncThunk<
  string,
  string,
  {rejectValue: ErrorAxios}
>('product/deleteProduct', async (id, {rejectWithValue}) => {
  try {
    await apiClient.delete(`/products/${id}`);
    return id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || {message: error.message});
    }
    return rejectWithValue({message: 'Error deleting Product'});
  }
});
export const updateProduct = createAsyncThunk<
  ProductType,
  ProductUpdateType,
  {rejectValue: ErrorAxios}
>('product/updateProduct', async (data, {rejectWithValue}) => {
  try {
    const response = await apiClient.put(`/product/${data.id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || {message: error.message});
    }
    return rejectWithValue({message: 'Error updating Product'});
  }
});

export const getProductsByCategoryId = createAsyncThunk<
  ProductType[],
  string,
  {rejectValue: ErrorAxios}
>('product/getProductByCategoryId', async (id, {rejectWithValue}) => {
  try {
    const response = await apiClient.get(`/categories/${id}/products`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || {message: error.message});
    }
    return rejectWithValue({
      message: 'Error fetching Products by Category ID',
    });
  }
});
