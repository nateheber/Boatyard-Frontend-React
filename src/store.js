import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import mainSaga from './reducers/sagas';
import reducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['managements']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
export const persistor = persistStore(store);

sagaMiddleware.run(mainSaga);

export default store;
