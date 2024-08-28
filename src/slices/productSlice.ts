import {createSlice} from '@reduxjs/toolkit';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByCategoryId,
  updateProduct,
} from '../actions/productActions';
export type SizeType = {
  id: string;
  size: string;
  price: number;
};
export type ProductType = {
  name: string;
  description: string;
  about: string;
  stock: number;
  categoryId: string;
  id: string | undefined;
  createdAt: Date | undefined;
  imageUrl: string | undefined;
  sizes: SizeType[] | undefined;
};
type InitialStateType = {
  products: ProductType[];
  product: ProductType | undefined;
  isLoading: boolean;
  error: string | undefined;
};
//also omit sizes id
export type ProductPostType = Omit<
  ProductType,
  'id' | 'createdAt' | 'sizes'
> & {
  sizes: {
    size: string;
    price: number;
  }[];
};
export type ProductUpdateType = Partial<ProductType>;
const initialState: InitialStateType = {
  products: [],
  product: undefined,
  isLoading: false,
  error: undefined,
};
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getAllProducts.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getProductById.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getProductsByCategoryId.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getProductsByCategoryId.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getProductsByCategoryId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          product => product.id !== action.payload,
        );
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(deleteProduct.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.product = action.payload;
        state.products = state.products.map(product => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });
      })
      .addCase(updateProduct.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
