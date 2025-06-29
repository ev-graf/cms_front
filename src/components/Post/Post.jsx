import React from 'react'
import "./Post.css"

function Post(props) {
  return (
    <div className="post">
      <img
        className="post-image"
        src={props.src}
        alt={props.text}
      />
      <p className="post-text">{props.text}</p>
    </div>
  )
}

export default Post
