import React from "react";
import { Layout } from "antd";
import StoryCard from "./StoryCard";
import { useAppSelector } from "../../../../shared/hooks/useAppSelector";
import { storiesSelectors } from '../../model'

const StoriesList = React.forwardRef<HTMLElement>( (_, ref) => {
  const storiesIds = useAppSelector(storiesSelectors.getStoriesIds);

  return (
    <Layout ref={ref} className='stories-list' role='list' >
      {storiesIds.map((storyId) => <StoryCard key={storyId} storyId={storyId} />)}
    </Layout>
  );
})

StoriesList.displayName = 'StoriesList';

export default StoriesList;
