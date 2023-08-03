
import { Link } from 'react-router-dom'

const Blog = ({ blog,  }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      {/* <div>
        <div className="blog-title">{blog.title}</div>
        <div className="blog-author">{blog.author}</div>
        <button id="visibleinfo" onClick={() => setVisible((prev) => !prev)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <div className="blog-url">{blog.url}</div>
          <br />
          <div className="blog-likes">likes {blog.likes}</div>
          <button id="likebtn" onClick={() => likeBlog(blog.id)}>like</button>
          <br />
          <div className="blog-user">{user}</div>
          <br />
          <button id="removebtn" onClick={() => removeBlog(blog.id, blog.title, blog.author)}>
            remove
          </button>
        </div>
      )} */}
    </div>
  )
}

export default Blog
