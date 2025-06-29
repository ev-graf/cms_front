import React, { useEffect, useState, getItem } from 'react';
import "./Home.css"
import Post from "/src/components/Post/Post.jsx"
import axios from 'axios'

export default function Home() {
  const [posts, setPosts] = useState([])

  const fetchLastPosts = () => {
      axios.get("http://127.0.0.1:8000/api/v1/data/get_last_posts").then(r => {
        setPosts(r.data.posts)
      })
      }

  useEffect(() => {fetchLastPosts()}, [])

  return (
    <>
    {posts.map(post => <Post key={post.id} {...post}/>)}
    </>
  )
}