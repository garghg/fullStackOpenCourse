const { test, after, beforeEach, before, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('invalid input', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        for (const user of helper.initialUsers) {
            await api
                .post('/api/users')
                .send(user)
        }
    })

    const invalid_check = async (newUser) => {
        const post_response = await api
                        .post('/api/users')
                        .send(newUser)
        
        assert.strictEqual(post_response.status, 400)

        const get_response = await api.get('/api/users')
        assert.strictEqual(get_response.body.length, helper.initialUsers.length)
    }

    test('invalid username', async () => {
        const newUser = {
            username: 'bs',
            name: 'Bob Smith',
            password: 'bob123'
        }

        await invalid_check(newUser)

    })

    test('invalid password', async () => {
        const newUser = {
            username: 'bobsmith',
            name: 'Bob Smith',
            password: 'bs'
        }

        await invalid_check(newUser)
    })

    test('duplicate username', async () => {
        const newUser = {
            username: 'janedoe',
            name: 'Jane Doe',
            password: 'jane123'
        }

        await invalid_check(newUser)
    })

})

after(async () => {
  await mongoose.connection.close()
})