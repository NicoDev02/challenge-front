import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../axios';
import type {
  CategoryPostType,
  CategoryPutType,
  CategoryType,
} from '../slices/categorySlice';
import axios from 'axios';

export const getAllCategories = createAsyncThunk<
  CategoryType[],
  null,
  {
    rejectValue: {message: string};
  }
>('category/getAllCategories', async (_, {rejectWithValue}) => {
  try {
    const response = await apiClient.get('/categories');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || {message: error.message});
    }
    return rejectWithValue({message: 'Error fetching categories'});
  }
});

export const getCategoryById = createAsyncThunk<
  CategoryType,
  string,
  {
    rejectValue: {message: string};
  }
>('category/getCategoryById', async (id, {rejectWithValue}) => {
  try {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || {message: error.message});
    }
    return rejectWithValue({message: 'Error fetching category'});
  }
});

export const createCategory = createAsyncThunk<
  CategoryType,
  CategoryPostType,
  {
    rejectValue: {message: string};
  }
>('category/createCategory', async (categoryData, {rejectWithValue}) => {
  try {
    const createdCategory = await apiClient.post('/categories', categoryData);
    return createdCategory.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || {message: error.message});
    }
    return rejectWithValue({message: 'Error creating category'});
  }
});

export const deleteCategory = createAsyncThunk<
  string,
  string,
  {
    rejectValue: {message: string};
  }
>('category/deleteCategory', async (id, {rejectWithValue}) => {
  try {
    await apiClient.delete(`/categories/${id}`);
    return id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || {message: error.message});
    }
    return rejectWithValue({message: 'Error celeting Category'});
  }
});

export const updateCategory = createAsyncThunk<
  CategoryType,
  CategoryPutType,
  {
    rejectValue: {message: string};
  }
>('category/updateCategory', async (data, {rejectWithValue}) => {
  try {
    const updatedCategory = await apiClient.put(`/categories/${data.id}`, data);
    return updatedCategory.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || {message: error.message});
    }
    return rejectWithValue({message: 'Error updating category'});
  }
});
