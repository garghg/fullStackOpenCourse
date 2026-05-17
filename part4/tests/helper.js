const loginHelper = async (page, username, password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}

const addInitialBlog = async page => {
    await page.getByRole('button', { name: 'Create new blog' }).click()
    await page.getByPlaceholder('Enter Blog Title')
        .fill('Adding blog from testing')
    await page.getByPlaceholder('Enter Blog URL')
        .fill('www.example.com')
    await page.getByPlaceholder('Enter Blog Author')
        .fill('Haardik Garg')
    await page.getByRole('button', { name: 'Add Blog' }).click()
}

export { loginHelper, addInitialBlog }