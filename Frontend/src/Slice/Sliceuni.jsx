import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch user by token
export const fetchuserbyToken = createAsyncThunk(
    'user/fetchuserbyToken',
    async (token, { rejectWithValue }) => {
        try {
            console.log("Fetching user with token:", token);
            const response = await axios.get("http://localhost:4000/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Response data:", response.data.user);
            return response.data?.user;
        } catch (err) {
            console.error("Error fetching user:", err);
            return rejectWithValue(err.response?.data?.message || "Failed to fetch user");
        }
    }
);

// Update user
export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ token, userData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                "http://localhost:4000/student/user/update",
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response?.data?.updatedUser;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update user"
            );
        }
    }
);

// Redux slice
const UserSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch user cases
            .addCase(fetchuserbyToken.pending, (state) => { 
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchuserbyToken.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchuserbyToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update user cases
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload; // updated user info
                state.loading = false;
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;
