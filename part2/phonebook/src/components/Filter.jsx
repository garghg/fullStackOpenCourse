const Filter = ({ searchVal, handleSearch }) => {
  return (
    <form>
      <div>
        Search Name: <input value={searchVal} onChange={handleSearch}/>
      </div>
    </form>
  )
}

export default Filter