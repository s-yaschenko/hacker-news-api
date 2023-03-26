import React from "react";
import { Layout } from "antd";
import CommentItem from "./CommentItem";

interface ICommentsListProps {
  commentsIds: number[];
}

const CommentsList: React.FC<ICommentsListProps> = ({ commentsIds }) => {
  return (
    <Layout className='comments-list'>
      {commentsIds.map((id) => {
        return <CommentItem key={id} commentId={id} />
      })}
    </Layout>
  );
}

export default CommentsList;
