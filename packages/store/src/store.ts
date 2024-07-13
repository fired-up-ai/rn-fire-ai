import { configureStore, Middleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import RootReducer from './features/rootReducer';

const logger: Middleware = (store) => (next) => (action) => {
    console.log('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    return result;
}

const store = configureStore({
    reducer: {
        root: RootReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;