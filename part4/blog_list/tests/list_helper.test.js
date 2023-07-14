const listHelper = require('../utils/list_helper')

const blogs = [
  {
    title: "Example Blog 1",
    author: "John Doe",
    url: "https://example.com/blog1",
    likes: 10,
  },
  {
    title: "Example Blog 2",
    author: "Jane Smith",
    url: "https://example.com/blog2",
    likes: 5,
  },
  {
    title: "Example Blog 3",
    author: "Sam Johnson",
    url: "https://example.com/blog3",
    likes: 8,
  },
  {
    title: "Example Blog 4",
    author: "Sam Johnson",
    url: "https://example.com/blog4",
    likes: 15,
  },
  {
    title: "Example Blog 5",
    author: "Alex Wilson",
    url: "https://example.com/blog5",
    likes: 3,
  },
];

test('dummy returns 1', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(blogs.filter(blog => blog.author === "Alex Wilson"))).toBe(3)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(41)
  })
})

describe('favorite blog', () => {
  test('of empty list is empty object', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.favoriteBlog(blogs.filter(blog => blog.author === "Alex Wilson"))).toEqual(blogs.filter(blog => blog.author === "Alex Wilson")[0])
  })

  test('of a bigger list is given right', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: "Example Blog 4",
      author: "Sam Johnson",
      url: "https://example.com/blog4",
      likes: 15,
    })
  })
})

describe('most blogs', () => {
  test('of empty list is empty object', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test('when list has only one blog equals that only author', () => {
    expect(listHelper.mostBlogs(blogs.filter(blog => blog.author === "Alex Wilson"))).toEqual({author:"Alex Wilson", blogs: 1})
  })

  test('of a bigger list is given right', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({author:"Sam Johnson", blogs: 2})
  })
})

describe('most likes', () => {
  test('of empty list is empty object', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })

  test('when list has only one blog equals that only author', () => {
    expect(listHelper.mostLikes(blogs.filter(blog => blog.author === "Alex Wilson"))).toEqual({author:"Alex Wilson", likes: 3})
  })

  test('of a bigger list is given right', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({author:"Sam Johnson", likes: 23})
  })
})