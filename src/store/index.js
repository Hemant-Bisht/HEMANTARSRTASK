import { createStore } from "redux";
import rootReducer from "../js/reducers/index";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
// const store = createStore(rootReducer);

//to prevent the state lose of redux
const persistConfig = {
    // key: 'authType',
    key : 'root',
    storage: storage,
    stateReconciler: hardSet,
    blacklist: ['auth']
    // blacklist: ['firebase_db']// which reducer want to store
  };
  
  
  const pReducer = persistReducer(persistConfig, rootReducer); 
  
  
  const store = createStore(
    pReducer, //above combine state in redux
    {},
  )
  
  const persistor = persistStore(store)

  // store.subscribe(()=>saveToLocalStorage(store.getState()))
  
  export { persistor,store }