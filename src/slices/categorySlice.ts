import {createSlice} from '@reduxjs/toolkit';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../actions/categoryActions';

export type CategoryType = {
  id: string;
  name: string;
};
export type CategoryPostType = Omit<CategoryType, 'id'>;
export type CategoryPutType = Partial<CategoryType>;
type InitialStateType = {
  categories: CategoryType[];
  category: CategoryType | undefined;
  isLoading: boolean;
  error: string | undefined;
};
const initialState: InitialStateType = {
  categories: [],
  category: undefined,
  isLoading: false,
  error: undefined,
};
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getAllCategories.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getCategoryById.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(createCategory.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.categories = state.categories.map(category => {
          if (category.id === action.payload.id) {
            return action.payload;
          }
          return category;
        });
        state.category = action.payload;
      })
      .addCase(updateCategory.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          category => category.id !== action.payload,
        );
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(deleteCategory.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
