import { useNavigate, useLoaderData } from "react-router-dom";
import { Badge, Button, Row, Spin, Typography } from "antd";
import { IStory } from "../../../../shared/api";
import { dateConverter } from "../../../../shared/helpers";
import { useEffect } from "react";
import { useActionCreators } from "../../../../shared/hooks/useActionCreators";
import { actionsComments, CommentsList, commentsSelectors } from "../../../../entities/comment";
import { useAppSelector } from "../../../../shared/hooks/useAppSelector";
import { INTERVAL_AUTO_UPDATE_COMMENTS } from "../../../../constants";


const StoryPage = () => {
  const navigate = useNavigate();
  const commentsActions = useActionCreators(actionsComments);
  const commentsIds = useAppSelector(commentsSelectors.getFirstLevelCommentsIds);
  const isLoadingComments = useAppSelector(commentsSelectors.getIsLoading);
  const story = useLoaderData() as IStory;

  const handleUpdateComments = () => {
    if (isLoadingComments) return;
    commentsActions.clear();
    commentsActions.updateCommentsByStoryId({ storyId: story.id });
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      commentsActions.updateCommentsByStoryId({ storyId: story.id });
    }, INTERVAL_AUTO_UPDATE_COMMENTS);
    return () => {
      clearInterval(timerId);
      commentsActions.clear();
    }
  }, []);

  useEffect(() => {
    if (!story.kids) return;
    commentsActions.fetchCommentsByIds({ commentsIds: story.kids, isFirstLevel: true });
  }, [story.kids]);

  return (
    <>
      <Button onClick={() => navigate(-1)}>Back</Button>

      <br/>
      <br/>

      <Typography.Title>{story.title}</Typography.Title>
      <Row>Автор: {story.by}</Row>
      <Row>Опубликовано: {dateConverter(story.time)}</Row>
      <a href={story.url} target='_blank'>Подробнее</a>

      <br/>
      <br/>

      <Row justify='space-between' align='middle'>
        <Typography.Title level={4}>Комментарии: <Badge count={story.descendants}></Badge></Typography.Title>
        <Button onClick={handleUpdateComments} disabled={isLoadingComments}>Обновить комментарии</Button>
      </Row>

      {isLoadingComments && (
        <Row justify='center'>
          <Spin tip='Загрузка...' size='default' />
        </Row>
      )}
      <CommentsList commentsIds={commentsIds} />
    </>
  )
};


export default StoryPage;
