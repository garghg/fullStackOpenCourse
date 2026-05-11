const { test, describe } = require('node:test');
const assert = require('node:assert');
const list_helper = require('../utils/list_helper');

describe('most...', () => {
    const blogs = [
                    {
                        title: "Learning MongoDB with Mongoose",
                        author: "John Doe",
                        blogs: 2,
                        likes: 10
                    },
                    {
                        title: "Understanding JavaScript Closures",
                        author: "Jane Smith",
                        blogs: 4,
                        likes: 25
                    },
                    {
                        title: "Node.js Best Practices",
                        author: "Michael Brown",
                        blogs: 3,
                        likes: 30
                    }
                ];

    test('...blogs', () => {
        assert.deepStrictEqual(list_helper.mostBlogs(blogs), blogs[1])
    })
    test('...likes', () => {
        assert.deepStrictEqual(list_helper.mostLikes(blogs), blogs[2])
    })
})