import {createSlice} from '@reduxjs/toolkit';
import {login, logout} from '../actions/loginActions';

type User = {
  sub: string | undefined;
  givenName: string;
  nickname: string;
  name: string;
  picture: string;
  email: string;
  emailVerified: boolean;
};
interface InitialStateTYpes {
  user: User | null;
  error: string | null;
  loading: boolean;
  token: string | null;
}
const initialState: InitialStateTYpes = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.accessToken;
        state.user = action.payload.userInfo as User;
        console.log(state);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(logout.pending, state => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.token = null;
        state.user = null;
        console.log(state);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default userSlice.reducer;
