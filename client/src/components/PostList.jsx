import { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const response = await axios.get('http://localhost:4000/posts');

    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const rendPosts = Object.values(posts).map((post) => (
    <div key={post.id} className="card">
      <div className="card-body">
        <h3>{post.title}</h3>
      </div>
    </div>
  ));

  return <div>{rendPosts}</div>;
};

export default PostList;
