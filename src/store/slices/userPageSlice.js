import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HOST_URL, PORT } from "../../util/hostDetails";
import {
    addUserToLocalStorage,
    getUserFromLocalStorage,
    removeUserFromLocalStorage,
} from "../../util/localStorage";
import socket from "../../util/socket.io";


const localStorageUser = getUserFromLocalStorage();

const initialState = {
    isLogedIn: localStorageUser.token ? true : false,
    user: localStorageUser.user || {},
    //   user: {},
};


export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (user, thunkAPI) => {
        try {
            const resp = await axios.post(
                `${HOST_URL}:${PORT}/api/auth/sign-up`,
                user
            );
            return resp.data;
        } catch (error) {
            if(error.response.data){
                return thunkAPI.rejectWithValue(error.response.data);
            }
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (user, thunkAPI) => {
        // return console.log(`logged in user ${JSON.stringify(user)}`);
        try {
            console.log("running");
            const resp = await axios.post(
                `${HOST_URL}:${PORT}/api/auth/sign-in`,
                user
            );
            return resp.data;
        } catch (error) {
            if(error.response.data){
                return thunkAPI.rejectWithValue(error.response.data);
            }
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setLogIn: (state) => {
            state.isLogedIn = true;
        },
        setLogInFalse: (state) => {
            state.isLogedIn = false;
        },
        logOutUser: (state) => {
            state.isLogedIn = false;
            state.user = {};
            removeUserFromLocalStorage();
            socket.disconnect();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.isLogedIn = true;
                state.user = payload.user;
                addUserToLocalStorage(payload);
                toast.success("Welcome " + payload.user.userName, {
                    position: "bottom-right"
                })
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                let error;
                if(typeof payload === "object"){
                    //do something on error json
                    error = payload[Object.keys(payload)[0]];
                }
                else{
                    error = payload;
                }
                toast.error(error, {
                    position: "bottom-right"
                });
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.isLogedIn = true;
                state.user = payload.user;
                removeUserFromLocalStorage();
                addUserToLocalStorage(payload);
                toast.success("Welcome " + payload.user.userName, {
                    position: "bottom-right"
                });
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                let error;
                if(typeof payload === "object"){
                    //do something on error json
                    error = payload[Object.keys(payload)[0]];
                }
                else{
                    error = payload;
                }
                toast.error(error, {
                    position: "bottom-right"
                });
            });
    },
});

export const { setLogIn, setLogInFalse, logOutUser } = userSlice.actions;

export default userSlice.reducer;
