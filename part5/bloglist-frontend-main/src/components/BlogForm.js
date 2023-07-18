
const BlogForm = ({ addBlog,title,setTitle,author,setAuthor,url,setUrl }) => {
  return (
    <div className="formDiv">
      <h2>Create a new note</h2>
      <form onSubmit={addBlog}>
        title:<input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br/>
        author:<input id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <br/>
        url:<input id="url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        <br/>
        <button id="create" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm