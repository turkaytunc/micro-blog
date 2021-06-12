const CommentList = ({ comments }) => {
  const commentArr = comments?.map((comment) => {
    let content;
    switch (comment.status) {
      case 'pending': {
        content = 'This comment is pending moderation';
        break;
      }
      case 'approved': {
        content = comment.content;
        break;
      }
      case 'rejected': {
        content = 'This comment has been rejected';
        break;
      }
      default: {
        content = 'Unknown Error';
      }
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{commentArr}</ul>;
};

export default CommentList;
