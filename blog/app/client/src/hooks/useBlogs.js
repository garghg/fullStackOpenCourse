import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useContext } from 'react'
import BlogContext from '../BlogContext'
import { useNavigate } from 'react-router-dom'

export const useBlogs = () => {
  const queryClient = useQueryClient()
  const { setAlert } = useContext(BlogContext)
  const navigate = useNavigate()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })

  const addMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setAlert({ message: `Added ${newBlog.title}`, type: 'success' })
      setTimeout(() => setAlert(null), 5000)
    },
    onError: () => {
      setAlert({ message: 'Something went wrong', type: 'error' })
      setTimeout(() => setAlert(null), 5000)
    },
  })

  const likeMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: (returnedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) =>
          b.id === returnedBlog.id ? { ...returnedBlog, user: b.user } : b,
        ),
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: blogService.del,
    onSuccess: (_, id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((b) => b.id !== id),
      )
      setAlert({ message: 'Blog deleted', type: 'success' })
      setTimeout(() => setAlert(null), 5000)
      navigate('/')
    },
  })

  return {
    blogs: result.data?.toSorted((a, b) => b.likes - a.likes),
    isPending: result.isPending,
    addBlog: (blog) => addMutation.mutate(blog),
    likeBlog: (blog) =>
      likeMutation.mutate({
        id: blog.id,
        updatedBlog: { ...blog, likes: blog.likes + 1 },
      }),
    deleteBlog: (id) => {
      if (window.confirm('Are you sure you want to delete this blog?')) {
        deleteMutation.mutate(id)
      }
    },
  }
}
