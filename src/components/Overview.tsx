import BookCard from "./BookCard";

export default function Overview() {

    fetch('localhost:3000/rest', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((r) => {
        if (r.ok) {
            r.json().then((response) => console.log("response: {}", response));
        }
    });
   
    return (
        <div className="flex flex-wrap content">
            <BookCard className="flex-item"></BookCard>
            <BookCard className="flex-item"></BookCard>
            <BookCard className="flex-item"></BookCard>
            <BookCard className="flex-item"></BookCard>
            <BookCard className="flex-item"></BookCard>
            <BookCard className="flex-item"></BookCard>
            <BookCard className="flex-item"></BookCard>
            <BookCard className="flex-item"></BookCard>
        </div>
    )
}