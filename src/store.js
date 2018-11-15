import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import mainSaga from './reducers/sagas';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mainSaga);

export default store;
