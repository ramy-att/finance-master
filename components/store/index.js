import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const initialState = {
  isAuthenticated: false,
  userInfo: {},
  userExpenses: {},
  userIncomes: {},
};

const authenSlice = createSlice({
  name: "Authentication",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userInfo = action.payload.userInfo;
      state.userExpenses = action.payload.expenses;
      state.userIncomes = action.payload.incomes;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userInfo = {};
      state.userExpenses = {};
      state.userIncomes = {};
    },
    updateExpenses(state, action) {
      state.userExpenses = action.payload;
    },
    updateIncomes(state, action) {
      state.userIncomes = action.payload;
    },
    updateUserData(state, action) {
      state.userExpenses = action.payload.expenses;
      state.userIncomes = action.payload.incomes;
    },
  },
});

const persistConfig = {
  timeout: 1, //Set the timeout function to 2 seconds
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authenSlice.reducer);

const store = configureStore({
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
