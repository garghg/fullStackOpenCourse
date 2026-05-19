const loginHelper = async (page, username, password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}

const addInitialBlog = async (page, title, url, author) => {
    await page.getByRole('link', { name: 'Create Blog' }).click()
    await page.getByRole('button', { name: 'Create new blog' }).click()
    await page.getByPlaceholder('Enter Blog Title')
        .fill(title)
    await page.getByPlaceholder('Enter Blog URL')
        .fill(url)
    await page.getByPlaceholder('Enter Blog Author')
        .fill(author)
    await page.getByRole('button', { name: 'Add Blog' }).click()
    await page.getByRole('link', { name: title }).waitFor()
}

export { loginHelper, addInitialBlog }