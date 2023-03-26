import { Button, Col, Row, Typography } from "antd";
import React from "react";
import { useAppSelector } from "../../../../shared/hooks/useAppSelector";
import { commentsSelectors, actionsComments } from '../../model';
import { dateConverter } from "../../../../shared/helpers";
import { useActionCreators } from "../../../../shared/hooks/useActionCreators";
import CommentsList from "./CommentsList";

interface ICommentItemProps {
  commentId: number;
}

const CommentItem: React.FC<ICommentItemProps> = ({ commentId }) => {
  const commentsActions = useActionCreators(actionsComments);
  const comment = useAppSelector(commentsSelectors.getCommentById(commentId));

  const handleLoadSubComments = () => {
    if (!comment.kids) return;
    commentsActions.fetchCommentsByIds({ commentsIds: comment.kids, isFirstLevel: false });
  }

  if (!comment) return null;

  return (
    <>
      <Col className='comment-item'>
        <Row align='middle' justify='space-between'>
          <Col>Автор: {comment.by} {commentId}</Col>
          <Col>Опубликовано: {dateConverter(comment.time)}</Col>
        </Row>
        <p dangerouslySetInnerHTML={{ __html: comment.text }} />
        {comment.kids?.length && (
          <>
            <Button onClick={handleLoadSubComments} size='small'>Посмотреть ответы</Button>
            <br/>
            <br/>
            <Col className='sum-comments-list'>
              <CommentsList commentsIds={comment.kids} />
            </Col>
          </>
        )}

        <hr />
      </Col>
    </>
  );
};

export default CommentItem;
