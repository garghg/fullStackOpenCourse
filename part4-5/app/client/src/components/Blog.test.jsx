import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { MemoryRouter } from 'react-router-dom'

const users = [
  {
    username: 'admin',
    id: '123',
  },

  {
    username: 'janedoe',
    id: '456',
  },
]

describe('blog element checks', () => {
  beforeEach(() => {
    const blog = {
      title: 'React Testing Library',
      url: 'www.example.com',
      likes: 3,
      author: 'Haardik Garg',
      user: { id: '123' },
    }

    render(
      <MemoryRouter>
        <Blog blog={blog} user={null} blogs={[]} setBlogs={() => {}} />
      </MemoryRouter>,
    )
  })

  describe('unauthenticated users', () => {
    test('blog title rendering', () => {
      screen.getByText('React Testing Library')
    })

    test('blog author rendering', () => {
      screen.getByText('Haardik Garg')
    })

    test('blog url rendering', () => {
      screen.getByText('www.example.com')
    })

    test('blog likes rendering', () => {
      screen.getByText('3')
    })

    test('likes button not rendering', () => {
      const element = screen.queryByText('Like')
      expect(element).toBeNull()
    })

    test('delete button not rendering', () => {
      const element = screen.queryByText('Delete')
      expect(element).toBeNull()
    })
  })
})

describe('authenticated users', () => {
  test('non-creator users only see like button', () => {
    const blog = {
      title: 'React Testing Library',
      url: 'www.example.com',
      likes: 3,
      author: 'Haardik Garg',
      user: { id: '123' },
    }

    render(
      <MemoryRouter>
        <Blog blog={blog} user={users[1]} blogs={[]} setBlogs={() => {}} />
      </MemoryRouter>,
    )
    const likeButton = screen.queryByText('Like')
    expect(likeButton).toBeVisible()
    const delButton = screen.queryByText('Delete')
    expect(delButton).toBeNull()
  })

  test('creator users see like and delete button', () => {
    const blog = {
      title: 'React Testing Library',
      url: 'www.example.com',
      likes: 3,
      author: 'Haardik Garg',
      user: { id: '123' },
    }

    render(
      <MemoryRouter>
        <Blog blog={blog} user={users[0]} blogs={[]} setBlogs={() => {}} />
      </MemoryRouter>,
    )
    const likeButton = screen.queryByText('Like')
    expect(likeButton).toBeVisible()
    const delButton = screen.queryByText('Delete')
    expect(delButton).toBeVisible()
  })
})
