import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export default function BookCard({className}: { className: string}) {
    return (
        <Card className={className} style={{ margin: '10px'}}>
        <CardHeader>
        <CardTitle>Alpha</CardTitle>
        <CardDescription>Alpha</CardDescription>
        </CardHeader>
        <CardContent>
        <p>Content and such</p>
        </CardContent>
        <CardFooter>
            <p>Buch</p>
        </CardFooter>
</Card>
    );
}