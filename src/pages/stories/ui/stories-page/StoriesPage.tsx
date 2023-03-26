import { Button, Row, Spin, Typography } from "antd";
import { actionsStories, StoriesList, storiesSelectors } from "../../../../entities/story";
import { useAppSelector } from "../../../../shared/hooks/useAppSelector";
import { useActionCreators } from "../../../../shared/hooks/useActionCreators";
import { useEffect } from "react";
import { useIsTopBlock } from "../../../../shared/hooks/useIsTopBlock";
import { INTERVAL_AUTO_UPDATE_STORIES } from "../../../../constants";

const StoriesPage = () => {
  const storiesActions = useActionCreators(actionsStories);
  const isLoading = useAppSelector(storiesSelectors.getIsLoading);
  const isShowNewStories = useAppSelector(storiesSelectors.getIsShowNewStories);
  const [storiesListRef, isTopList] = useIsTopBlock<HTMLElement>();

  const handleUpdate = () => {
    if (isLoading) return;
    storiesActions.clear();
    storiesActions.fetchStoriesInPortions({ portionsSize: 10 });
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      storiesActions.backgroundUpdateStories();
    }, INTERVAL_AUTO_UPDATE_STORIES);
    storiesActions.fetchStoriesInPortions({ portionsSize: 10 });

    return () => {
      clearInterval(timerId);
      storiesActions.clear();
    }
  }, []);

  useEffect(() => {
    if (!isTopList || !isShowNewStories) return;
    storiesActions.showNewStories();
  }, [isTopList, isShowNewStories]);

  return (
    <>
      <Row align='middle' justify='space-between'>
        <Typography.Title>Hacker News</Typography.Title>
        <Button onClick={handleUpdate} disabled={isLoading}>Обновить</Button>
      </Row>

      {(isLoading || (isTopList && isShowNewStories)) && (
        <Row justify='center'>
          <Spin tip='Загрузка...' size='large' />
        </Row>
      )}
      <StoriesList ref={storiesListRef} />
    </>
  )
};

export default StoriesPage;
