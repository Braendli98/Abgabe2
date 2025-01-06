import { Button } from '../shadcn-ui/button';
import { Input } from '../shadcn-ui/input';

export default function Search({
    searchParams,
    setSearchParams,
    handleKeyDown,
    handleSearch,
}: {
    searchParams: Record<string, string>;
    setSearchParams: React.Dispatch<
        React.SetStateAction<Record<string, string>>
    >;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleSearch: () => void;
}) {
    const setSearchParam = (key: string, value: string) => {
        searchParams[key] = value;
        setSearchParams(searchParams);
        console.log(searchParams);
    };

    return (
        <div className="flex items-center space-x-2 searchbar mb-4">
            {/* Suchfeld */}
            <Input
                className="flex-item flex-auto p-2 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mainColor"
                type="text"
                value={searchParams['titel']}
                onChange={(e) => setSearchParam('titel', e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nach Buchtiteln suchen..."
            />
            {/* Dropdown für Kategorie */}
            <select
                className="flex-item p-2 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mainColor"
                value={searchParams['art']}
                onChange={(e) => setSearchParam('art', e.target.value)}
            >
                <option value="">Alle Buchkategorien</option>
                <option value="EPUB">EPUB</option>
                <option value="HARDCOVER">HARDCOVER</option>
                <option value="PAPERBACK">PAPERBACK</option>
            </select>
            {/* Suchbutton */}
            <Button
                variant="custom"
                className="flex-item px-4 py-2 rounded"
                onClick={handleSearch}
            >
                Suchen
            </Button>
        </div>
    );
}
