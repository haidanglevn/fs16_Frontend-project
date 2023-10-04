import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../store";
import { User } from "../../types/types";
import { toast } from "react-toastify";

const savedAccessToken = localStorage.getItem("access_token");
const savedRefreshToken = localStorage.getItem("refresh_token");

const initialState = {
  user: null as User | null,
  access_token: savedAccessToken ? savedAccessToken : ("" as string),
  refresh_token: savedRefreshToken ? savedRefreshToken : ("" as string),
  isAuthenticated: false,
  loading: false,
  error: null as string | null | undefined,
};

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

// Async Thunk to handle login
interface LoginPayload {
  email: string;
  password: string;
}

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      return thunkAPI.rejectWithValue("No access token found");
    }
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        payload
      );
      toast.success("Log in successfully");
      return response.data;
    } catch (error) {
      // Type assertion for AxiosError
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "An error occurred");
    }
  }
);

// User slice
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // Handle user logout
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.access_token = "";
      state.refresh_token = "";
      toast.success("Log out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          if (action.payload === undefined) {
            console.log("Fulfilled but undefined payload");
          } else {
            state.isAuthenticated = true;
            state.loading = false;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
          }
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.error = `Error when logging in, please check your email & password again.`;
        state.loading = false;
      })

      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        localStorage.removeItem("access_token");
        state.isAuthenticated = false;
      });
  },
});

export const selectError = (state: RootState) => state.user.error;
export const selectUser = (state: RootState) => state.user.user;
export const selectAccessToken = (state: RootState) => state.user.access_token;
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
