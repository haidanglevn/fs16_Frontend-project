import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { User } from "../../types/generalTypes";

const savedAccessToken = localStorage.getItem("access_token");
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export interface UserState {
  allUsers: User[];
  user: User | null;
  access_token: string | null;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: UserState = {
  allUsers: [],
  user: null,
  access_token: savedAccessToken ? savedAccessToken : null,
  loading: false,
  error: null,
};

export interface LoginResponse {
  access_token: string;
}

// Async Thunk to handle login
export interface LoginPayload {
  email: string;
  password: string;
}

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAll",
  async (_, thunkAPI) => {
    const access_token = (thunkAPI.getState() as RootState).user.access_token;
    if (!access_token) {
      return thunkAPI.rejectWithValue("No access token found");
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    const access_token = (thunkAPI.getState() as RootState).user.access_token;
    if (!access_token) {
      return thunkAPI.rejectWithValue("No access token found");
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(response.data);
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
      const response = await axios.post(`${API_BASE_URL}/users/login`, payload);
      toast.success("Log in successfully");
      return response.data;
    } catch (error) {
      // Type assertion for AxiosError
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "An error occurred");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // Handle user logout
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.access_token = "";
      localStorage.setItem("access_token", "");
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
            state.error = "Fulfilled but undefined payload";
          } else {
            state.loading = false;
            state.access_token = action.payload.access_token;
          }
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.error = `Error when logging in, please check your email & password again.`;
        state.loading = false;
      })

      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        // localStorage.removeItem("access_token");
        // state.user = null;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.allUsers = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = `Error fetching all users. Cannot validate registering email`;
        state.loading = false;
      });
  },
});

export const selectError = (state: RootState) => state.user.error;
export const selectAllUsers = (state: RootState) => state.user.allUsers;
export const selectUser = (state: RootState) => state.user.user;
export const selectAccessToken = (state: RootState) => state.user.access_token;
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
