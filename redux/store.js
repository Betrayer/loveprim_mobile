import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { user } from "./reducers";
import thunk from "redux-thunk";
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

const rootReducer = combineReducers({ user });

const persistConfig = {
  key: "root",
  // storage,
  storage: AsyncStorage,
  whitelist: ["user"],
  blacklist: ["_persist"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
    thunk,
  }),
});

export const persistor = persistStore(store);
