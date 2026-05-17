const { test, expect, beforeEach, describe } = require('@playwright/test')
const { error } = require('node:console')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await page.goto('/')
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Admin User',
                username: 'admin',
                password: 'admin123'
            }
        })
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByLabel('username').fill('admin')
            await page.getByLabel('password').fill('admin123')
            await page.getByRole('button', { name: 'Login' }).click()
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
})