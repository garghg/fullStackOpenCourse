import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog element checks', () => {

  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'React Testing Library',
      url: 'www.example.com',
      likes: 0,
      author: 'Haardik Garg',
      user: { id: '123' }
    }

    const user = { id: '123' }
    mockHandler = vi.fn()
    render(
      <Blog
        blog={blog}
        user={user}
        blogs={[]}
        setBlogs={() => {}}
        testLike={mockHandler}
      />
    )
  })

  test('blog title rendering', () => {
    screen.getByText('React Testing Library')
  })

  test('blog author rendering', () => {
    screen.getByText('Haardik Garg')
  })

  test('blog url not rendering', () => {
    const element = screen.queryByText('www.example.com')
    expect(element).not.toBeVisible()
  })

  test('blog likes not rendering', () => {
    const element = screen.queryByText('0')
    expect(element).not.toBeVisible()
  })

  test('url shows after details button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show Details')
    await user.click(button)

    screen.getByText('www.example.com')
    screen.getByText('0')

  })

  test('like button clicked twice calls fn twice', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('Show Details')
    await user.click(showButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})