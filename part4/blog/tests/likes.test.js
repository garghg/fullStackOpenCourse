const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {

    const no_blogs = []
    const one_blog = [
                    {
                        title: "Test",
                        author: "John Doe",
                        url: "https://example.com/learning-mongoose",
                        likes: 10
                    }
                ]
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

    test('of empty list is zero', () => {
        assert.strictEqual(listHelper.totalLikes(no_blogs), 0)
    })

    test('when a list only has one blog equals the like of that', () => {
        assert.strictEqual(listHelper.totalLikes(one_blog), 10)
    })

    test('of a bigger list is calculated right', () => {
        assert.strictEqual(listHelper.totalLikes(blogs), 65)
    })

})