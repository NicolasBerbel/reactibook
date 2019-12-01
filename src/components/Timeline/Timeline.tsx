import React, { useState, useEffect } from 'react';
import api from '../../services/api.service';

const Timeline: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    console.log( 1 )
    api.get('posts').then( ({data}) => {
      console.log( data );
      setPosts(data)
    })
    return () => {};
  }, [])

  return (
    <div>
      {!!posts.length && (
        posts.map((post, i) => {
          return (
            <div key={i}>
              <h3>
                { post.author }
              </h3>
              <p>
                <strong>Created at:</strong>
                { post.createdAt }
              </p>
              <p>
                <strong>Edited at:</strong>
                { post.updatedAt }
              </p>
              <pre>
              { post.content }
              </pre>
            </div>
          )
        })
      )}
    </div>
  );
}

export default Timeline;