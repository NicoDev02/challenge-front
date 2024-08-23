import {createAsyncThunk} from '@reduxjs/toolkit';
import Auth0 from 'react-native-auth0';
// import apiClient from '../axios';
const auth0Config = {
  domain: 'dev-cirn7tmtos18vb5x.us.auth0.com',
  clientId: 'gIkx6LAeyuU9lrP1MuA27mdUHIu2GOee',
};
export const auth0 = new Auth0(auth0Config);

export const login = createAsyncThunk(
  'user/login',
  async (_, {rejectWithValue}) => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
        audience: 'https://challenge-devlabs-api.com',
      });
      const userInfo = await auth0.auth.userInfo({
        token: credentials.accessToken,
      });
      return {accessToken: credentials.accessToken, userInfo};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, {rejectWithValue}) => {
    try {
      await auth0.webAuth.clearSession();
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);
