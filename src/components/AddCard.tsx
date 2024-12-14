import { Card, CardContent, CardFooter } from './ui/card';

import { Plus } from 'lucide-react';

export default function AddCard({ className }: { className: string }) {
  return (
    <Card
      className={`flex items-center flex-col w-40 ${className} cursor-pointer hover:shadow-lg transition-shadow`}
      style={{ margin: '10px' }}
      onClick={() => console.log('Book Added!')}
      role="button"
    >
      <CardContent className="flex flex-item grow items-center">
        <Plus className="flex-item grow" size={70} />
      </CardContent>
      <CardFooter className="flex-item">
        <p>Add Book</p>
      </CardFooter>
    </Card>
  );
}
