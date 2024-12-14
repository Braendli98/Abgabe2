import AddCard from './AddCard';
import BookCard from './BookCard';

export default function Overview({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  fetch('localhost:3000/rest', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => {
    if (r.ok) {
      r.json().then((response) => console.log('response: {}', response));
    }
  });

  return (
    <div className="content">
      <h1>Books</h1>
      <div className="flex flex-wrap">
        <BookCard className="flex-item" setPage={setPage}></BookCard>
        <BookCard className="flex-item" setPage={setPage}></BookCard>
        <BookCard className="flex-item" setPage={setPage}></BookCard>
        <BookCard className="flex-item" setPage={setPage}></BookCard>
        <BookCard className="flex-item" setPage={setPage}></BookCard>
        <BookCard className="flex-item" setPage={setPage}></BookCard>
        <BookCard className="flex-item" setPage={setPage}></BookCard>
        <AddCard className="flex-item"></AddCard>
      </div>
    </div>
  );
}
