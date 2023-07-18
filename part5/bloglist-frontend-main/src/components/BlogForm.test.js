import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('input values are assigned correctly in the form', () => {
  const addBlogMock = jest.fn()
  const setTitleMock = jest.fn()
  const setAuthorMock = jest.fn()
  const setUrlMock = jest.fn()

  const component = render(
    <BlogForm
      addBlog={addBlogMock}
      title=""
      setTitle={setTitleMock}
      author=""
      setAuthor={setAuthorMock}
      url=""
      setUrl={setUrlMock}
    />
  )

  const titleInput = component.container.querySelector('input#title')
  const authorInput = component.container.querySelector('input#author')
  const urlInput = component.container.querySelector('input#url')
  const form = component.container.querySelector('form')

  // Set input values using onChange handlers directly
  fireEvent.change(titleInput, { target: { value: 'Test Blog Title' } })
  fireEvent.change(authorInput, { target: { value: 'Test Author' } })
  fireEvent.change(urlInput, { target: { value: 'https://example.com' } })

  fireEvent.submit(form)

  // Check if the setTitle, setAuthor, and setUrl functions are called with the correct values
  expect(addBlogMock).toHaveBeenCalledTimes(1)
  expect(setTitleMock).toHaveBeenCalledWith('Test Blog Title')
  expect(setAuthorMock).toHaveBeenCalledWith('Test Author')
  expect(setUrlMock).toHaveBeenCalledWith('https://example.com')
})