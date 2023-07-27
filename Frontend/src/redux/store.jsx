import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import postReducer from "./reducers/postReducer";
import categoryReducer from "./reducers/categoryReducer";
import priceReducer from "./reducers/priceReducer";
import acreaReducer from "./reducers/acreaReducer";
import getUserReducer from "./reducers/userReducer"
import localStorage from "redux-persist/es/storage";
const persitConfig = {
  key: "auth",
  storage: localStorage,
  whitelist: ['auth'],
  stateReconciler: autoMergeLevel2,
};
const authConfig = {
  key: 'auth',
  storage: localStorage,
  whitelist: ['token', 'isLogin']
}


const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  post: postReducer,
  category: categoryReducer,
  price: priceReducer,
  acrea: acreaReducer,
  user: getUserReducer
});
const persistedReducer = persistReducer(persitConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
