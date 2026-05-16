import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('blog element checks', () => {

  beforeEach(() => {
    const blog = {
      title: 'React Testing Library',
      url: 'www.example.com',
      likes: 0,
      author: 'Haardik Garg',
      user: { id: '123' }
    }

    const user = { id: '123' }
    render(
      <Blog blog={blog} user={user} blogs={[]} setBlogs={() => {}}/>
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
})
