import { Card, Row } from "antd";
import React from "react";
import { useAppSelector } from "../../../../shared/hooks/useAppSelector";
import { storiesSelectors } from '../../model'
import { Link } from "react-router-dom";
import { dateConverter } from "../../../../shared/helpers";

interface IStoryCardProps {
  storyId: number,
}

const StoryCard: React.FC<IStoryCardProps> = ({ storyId }) => {
  const story = useAppSelector(storiesSelectors.getStoryById(storyId));

  if (!story) return null;

  const title = <Link to={`/story/${story.id}`}>{story.title}</Link>;
  const author = `Автор: ${story.by}`

  return <Card className='story-card' title={title} extra={author} role='listitem'>
    <Row>Рейтинг: {story.score}</Row>
    <Row>Опубликовано: {dateConverter(story.time)}</Row>
  </Card>
}

export default React.memo(StoryCard);
