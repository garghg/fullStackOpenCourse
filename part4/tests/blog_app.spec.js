const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginHelper , addInitialBlog} = require('./helper')
const { execPath } = require('node:process')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Admin User',
                username: 'admin',
                password: 'admin123'
            }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginHelper(page, 'admin', 'admin123')
            await expect(page.getByText('Admin User')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByLabel('username').fill('wrong')
            await page.getByLabel('password').fill('wrong')
            await page.getByRole('button', { name: 'Login' }).click()
            const errorDiv = page.locator('.error')
            await expect(errorDiv).toContainText('Invalid username or password')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginHelper(page, 'admin', 'admin123')
        })

        test('a new blog can be created', async ({ page }) => {
            await addInitialBlog(page)
            const successDiv = page.locator('.success')
            await expect(successDiv).toContainText('Added Adding blog from testing')
            await expect(page.getByText('Adding blog from testing', { exact: true })).toBeVisible()
            await expect(page.getByText("Haardik Garg")).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            await addInitialBlog(page)
            await page.getByRole('button', { name: 'Show Details' }).click()
            await page.getByRole('button', { name: 'Like' }).click()
            const likeDiv = page.locator('#likes')
            await expect(likeDiv).toContainText('1');
        })
    })
})