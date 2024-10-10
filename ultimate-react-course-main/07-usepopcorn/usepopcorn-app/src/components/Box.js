import List from './List';

export default function Box({movies, open, onOpen}) {
  return (
    <div className="box">
      <Button open={open}  onOpen={onOpen}/>
      <List open={open} movies={movies} />
    </div>
  )
}

function Button({open, onOpen}) {
  return (
    <button
      className="btn-toggle"
      onClick={() => onOpen((open) => !open)}
    >
      {open ? "–" : "+"}
    </button>
  )
}
