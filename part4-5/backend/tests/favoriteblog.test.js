const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favourite blog', () => {

    const blogs = [
                    {
                        title: "Learning MongoDB with Mongoose",
                        author: "John Doe",
                        url: "https://example.com/learning-mongoose",
                        likes: 10
                    },
                    {
                        title: "Understanding JavaScript Closures",
                        author: "Jane Smith",
                        url: "https://example.com/js-closures",
                        likes: 25
                    },
                    {
                        title: "Node.js Best Practices",
                        author: "Michael Brown",
                        url: "https://example.com/node-best-practices",
                        likes: 30
                    }
                ];

    test('is', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2])
    })

})