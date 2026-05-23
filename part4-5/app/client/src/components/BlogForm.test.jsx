import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('blog form checks', () => {

  let mockHandler

  beforeEach(() => {
    mockHandler = vi.fn()
    render (
      <BlogForm
        setAlert={() => {}}
        setBlogs={() => {}}
        blogs={[]}
        testAdd={mockHandler}
      />
    )
  })

  test('create new blog', async () => {
    const user = userEvent.setup()
    const createButton = screen.getByText('Create new blog')
    await user.click(createButton)

    const titleField = screen.getByPlaceholderText('Enter Blog Title')
    const urlField = screen.getByPlaceholderText('Enter Blog URL')
    const authorField = screen.getByPlaceholderText('Enter Blog Author')
    const addButton = screen.getByText('Add Blog')

    await user.type(titleField, 'Adding New Blog Test')
    await user.type(urlField, 'www.example.com')
    await user.type(authorField, 'Haardik Garg')
    await user.click(addButton)

    expect(mockHandler.mock.calls[0][0].title).toBe('Adding New Blog Test')
    expect(mockHandler.mock.calls[0][0].url).toBe('www.example.com')
    expect(mockHandler.mock.calls[0][0].author).toBe('Haardik Garg')
  })
})