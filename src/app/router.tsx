import { createBrowserRouter, LoaderFunctionArgs } from "react-router-dom";
import { StoriesPage } from "../pages/stories";
import { StoryPage } from "../pages/story";
import { api } from '../shared/api';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StoriesPage />,
  },
  {
    path: '/story/:storyId',
    element: <StoryPage />,
    loader: async (args) => {
      if (!args.params.storyId) return;
      return api.getItemById(parseInt(args.params.storyId));
    }
  }
]);
