import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 10,
  }

  const component = render(<Blog blog={blog} user="Current User" />)

  // Assert that the title and author are visible, but URL and likes are not
  expect(component.container.querySelector('.blog-title')).toHaveTextContent(blog.title)
  expect(component.container.querySelector('.blog-author')).toHaveTextContent(blog.author)
  expect(component.container.querySelector('.blog-url')).not.toBeInTheDocument()
  expect(component.container.querySelector('.blog-likes')).not.toBeInTheDocument()
})

test('URL and likes are shown when "view" button is clicked', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 10,
  }

  const component = render(<Blog blog={blog} user="Current User" />)

  // The details should not be visible initially
  expect(component.container.querySelector('.blog-url')).not.toBeInTheDocument()
  expect(component.container.querySelector('.blog-likes')).not.toBeInTheDocument()

  // Click the "view" button
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  // The details should now be visible
  expect(component.container.querySelector('.blog-url')).toHaveTextContent(blog.url)
  expect(component.container.querySelector('.blog-likes')).toHaveTextContent(`likes ${blog.likes}`)
})

test('likeBlog handler is called twice when "like" button is clicked twice', () => {
  const blog = {
    id: 1,
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 10,
  }

  // Mock the likeBlog handler
  const likeBlogMock = jest.fn()

  const component = render(<Blog blog={blog} user="Current User" likeBlog={likeBlogMock} />)

  // Click the "view" button to reveal the "like" button
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  // Click the "like" button twice
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  // The likeBlog handler should be called twice
  expect(likeBlogMock).toHaveBeenCalledTimes(2)
})




