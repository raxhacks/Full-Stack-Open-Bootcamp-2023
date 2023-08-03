import blogService from '../services/blogs'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateLikes } from '../reducers/blogReducer'

const SingleBlog = () => {
  const { id } = useParams() // Get the id parameter from the URL
  const [blog, setBlog] = useState(null)
  const [likes, setLikes] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(id)
    blogService.getBlog(id) // Pass the id to the userService method
      .then((blogData) => {setBlog(blogData);setLikes(blogData.likes)})
      .catch(() => console.log('NOT BLOG'))
  }, []) // Add the id as a dependency to fetch the user whenever it changes

  const blogs = useSelector(state => state.blogs)

  const likeBlog = (id) => {
    dispatch(updateLikes(id,blogs))
  }
  
  return (
    <>
      {blog=== null ? <>loading...</> :
        <>
          <h2>blog app</h2>
          <h2>{blog.title}</h2>
          <p>{blog.url}</p>
          <p>{likes} likes <button onClick={() => {likeBlog(blog.id);setLikes(likes+1)}}>like</button></p>
          <p>added by {blog.author}</p>
        </>
      }
    </>
  )
}

export default SingleBlog