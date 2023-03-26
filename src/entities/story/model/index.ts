import { storiesActions } from './slice';
import * as thunks from './thunks';

export const actionsStories = {
  ...storiesActions,
  ...thunks,
}

export * as storiesSelectors from './selectors';
export { storiesReducer } from './slice';
