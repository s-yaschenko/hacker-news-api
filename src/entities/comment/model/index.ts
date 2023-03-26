import { commentsActions } from './slice';
import * as thunks from './thunks';

export const actionsComments = {
  ...commentsActions,
  ...thunks,
}

export { commentsReducer } from './slice';
export * as commentsSelectors from './selectors';
