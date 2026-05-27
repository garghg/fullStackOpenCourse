const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map((b) => {
          return <li key={b.id}>{b.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User
