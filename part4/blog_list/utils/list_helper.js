const dummy = (blogs) => {
  // ...
  return 1;
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const total = blogs.reduce((accumulator, blog) => {
    return accumulator + blog.likes;
  }, 0);

  return total;
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}; // or any suitable value to indicate no blogs
  }

  const mostLikedBlog = blogs.reduce((maxLikedBlog, currentBlog) => {
    return currentBlog.likes > maxLikedBlog.likes ? currentBlog : maxLikedBlog;
  }, blogs[0]);

  return mostLikedBlog;
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const blogCounts = {};
  let maxAuthor = '';
  let maxCount = 0;

  blogs.forEach((blog) => {
    if (!blogCounts[blog.author]) {
      blogCounts[blog.author] = 1;
    } else {
      blogCounts[blog.author]++;
    }

    if (blogCounts[blog.author] > maxCount) {
      maxAuthor = blog.author;
      maxCount = blogCounts[blog.author];
    }
  });

  return { author: maxAuthor, blogs: maxCount };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const likesCounts = {};
  let maxAuthor = '';
  let maxCount = 0;

  blogs.forEach((blog) => {
    if (!likesCounts[blog.author]) {
      likesCounts[blog.author] = blog.likes;
    } else {
      likesCounts[blog.author]+=blog.likes;
    }

    if (likesCounts[blog.author] > maxCount) {
      maxAuthor = blog.author;
      maxCount = likesCounts[blog.author];
    }
  });

  return { author: maxAuthor, likes: maxCount };
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}