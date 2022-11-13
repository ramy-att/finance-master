import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const initialState = {
  isAuthenticated: false,
  userData: {},
};

const authenSlice = createSlice({
  name: "Authentication",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userData = action.payload;
      sessionStorage.setItem("userAuth", true);
      sessionStorage.setItem("userInfo", action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userData = {};
      sessionStorage.removeItem("userAuth");
      sessionStorage.removeItem("userInfo");
    },
  },
});

// const store = configureStore({
//   reducer: { auth: authenSlice.reducer },
// });
// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// }
const persistConfig = {
  timeout: 1, //Set the timeout function to 2 seconds
  key: 'root',
  storage,
  };
const persistedReducer = persistReducer(persistConfig, authenSlice.reducer)

const store = configureStore({
    // reducer: { auth: authenSlice.reducer },
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });


export const authActions = authenSlice.actions;
export default store;
