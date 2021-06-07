import { useEffect, useState } from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const response = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(response.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <ul>
      {comments?.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
