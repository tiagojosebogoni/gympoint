import { persistStore } from 'redux-persist';
import createSagaMiddleare from 'redux-saga';
import createStore from './createStore';
import persistReducers from './persistReducers';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor = null; // __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleaware = createSagaMiddleare({ sagaMonitor });

const middlewares = [sagaMiddleaware];
const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleaware.run(rootSaga);

export { store, persistor };
