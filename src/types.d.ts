import { store } from './app/store';

declare type RootState = ReturnType<typeof store.getState>;
declare type AppDispatch = typeof store.dispatch;
