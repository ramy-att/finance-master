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
  userInvestments: {},
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
      state.userInvestments = action.payload.investments;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userInfo = {};
      state.userExpenses = {};
      state.userIncomes = {};
      state.userInvestments = {};
    },
    updateExpenses(state, action) {
      state.userExpenses = action.payload;
    },
    updateIncomes(state, action) {
      const payLoad = action.payload;
      const name = payLoad["name"];
      state.userIncomes = { ...state.userIncomes, [name]: payLoad };
    },
    deleteInvestment(state, action) {
      const name = action.payload;
      delete state.userInvestments[name];
    },
    deleteIncome(state, action) {
      const name = action.payload;
      delete state.userIncomes[name];
    },
    updateInvestments(state, action) {
      const payLoad = action.payload;
      const name = payLoad["name"];
      state.userInvestments = { ...state.userInvestments, [name]: payLoad };
    },
    updateUserData(state, action) {
      state.userExpenses = action.payload.expenses;
      state.userIncomes = action.payload.incomes;
    },
  },
});

const persistConfig = {
  timeout: 0.2, //Set the timeout function > 0 to prevent the website from crashing
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
