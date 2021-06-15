import { useState } from 'react';
import axios from 'axios';

const CreateComment = ({ postId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });
    setContent('');
  };
  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="">New Comment</label>
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Comment
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
