import { create } from 'zustand'
import blogService from './services/blogs'

const useBlogStore = create((set) => ({
  blogs: [],
  user: null,
  actions: {
    initialize: (blogs) => set(() => ({ blogs })),
    setUser: (user) => set(() => ({ user })),
    create: async (blog) => {
      const updated = await blogService.create(blog)
      set((state) => ({ blogs: [...state.blogs, updated] }))
      return updated
    },
    like: async (blog) => {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      set((state) => ({
        blogs: state.blogs.map((b) =>
          b.id === blog.id ? { ...returnedBlog, user: blog.user } : b,
        ),
      }))
    },
    delBlog: async (id) => {
      await blogService.del(id)
      set((state) => ({
        blogs: state.blogs.filter((b) => b.id !== id),
      }))
    },
    addComment: async (id, comment) => {
      const updatedBlog = await blogService.comment(id, comment)
      set((state) => ({
        blogs: state.blogs.map((b) => (b.id === id ? updatedBlog : b)),
      }))
    },
  },
}))

export const useBlogArray = () =>
  useBlogStore((state) => state.blogs).sort((a, b) => b.likes - a.likes)
export const useBlogUser = () => useBlogStore((state) => state.user)
export const useBlogActions = () => useBlogStore((state) => state.actions)
