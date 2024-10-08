import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
  FLUSH, PAUSE,
  PERSIST, persistReducer, PURGE,
  REGISTER, REHYDRATE
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const initialState = {
  isAuthenticated: false,
  userInfo: {},
  userExpenses: {},
  userIncomes: {},
  userInvestments: {},
  userCash: {},
  userLoans: {}
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
      state.userCash = action.payload.cash;
      state.userLoans = action.payload.loans;

    },
    logout(state) {
      state.isAuthenticated = false;
      state.userInfo = {};
      state.userExpenses = {};
      state.userIncomes = {};
      state.userInvestments = {};
      state.userCash = {};
      state.userLoans = {};
    },
    updateLoans(state, action) {
      const payLoad = action.payload;
      const name = payLoad["name"];
      state.userLoans = { ...state.userLoans, [name]: payLoad };
    },
    updateExpenses(state, action) {
      const payLoad = action.payload;
      const name = payLoad["name"];
      state.userExpenses = { ...state.userExpenses, [name]: payLoad };
    },
    updateIncomes(state, action) {
      const payLoad = action.payload;
      const name = payLoad["name"];
      state.userIncomes = { ...state.userIncomes, [name]: payLoad };
    },
    updateCash(state, action) {
      const payLoad = action.payload;
      const name = payLoad["name"];
      state.userCash = { ...state.userCash, [name]: payLoad };
    },
    deleteInvestment(state, action) {
      const name = action.payload;
      delete state.userInvestments[name];
    },
    deleteIncome(state, action) {
      const name = action.payload;
      delete state.userIncomes[name];
    },
    deleteExpense(state, action) {
      const name = action.payload;
      delete state.userExpenses[name];
    },
    deleteCash(state, action){
      const name = action.payload;
      delete state.userCash[name];
    },
    deleteLoan(state, action){
      const name = action.payload;
      delete state.userLoans[name];
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
