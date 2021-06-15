import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateComment from './CreateComment';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const response = await axios.get('http://posts.com/posts');
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const rendPosts = Object.values(posts).map((post) => (
    <div key={post.id} className="card">
      <div className="card-body">
        <h3>{post.title}</h3>
        <CommentList comments={post.comments} />
        <hr />
        <CreateComment postId={post.id} />
      </div>
    </div>
  ));

  return <div>{rendPosts}</div>;
};

export default PostList;
