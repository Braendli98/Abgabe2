import { ChevronsUpDown, Search } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../shadcn-ui/collapsible';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../shadcn-ui/select';

import { Button } from '../shadcn-ui/button';
import { Input } from '../shadcn-ui/input';
import { Label } from '../shadcn-ui/label';

export default function SearchComponent({
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
    };

    const setSelectParam = (key: string, value: string) => {
        searchParams[key] = value === 'NULL' ? '' : value;
        setSearchParams(searchParams);
    };

    return (
        <Collapsible className="w-full">
            <div className="flex items-center w-full md:w-2/3 mb-4">
                {/* Suchfeld */}
                <SearchInput
                    searchKey="title"
                    placeholder="Nach Buchtiteln suchen..."
                    type="text"
                    searchParams={searchParams}
                    setSearchParam={setSearchParam}
                    handleKeyDown={handleKeyDown}
                    className={'flex-item flex-auto mr-1'}
                />
                <CollapsibleTrigger asChild className="flex-item">
                    <Button
                        variant="ghost"
                        className="flex-item px-4 py-1 mr-1"
                    >
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="hidden md:flex">Erweiterte Suche</span>
                    </Button>
                </CollapsibleTrigger>
                {/* Suchbutton */}
                <Button
                    variant="custom"
                    className="flex-item px-4 py-1"
                    onClick={handleSearch}
                >
                    <Search className="h-4 w-4" />
                    <span className="hidden md:flex">Suchen</span>
                </Button>
            </div>
            <CollapsibleContent className="mb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 md:w-2/3 gap-x-4 border rounded p-2 border-gray-300">
                    {/* Dropdown für Kategorie */}
                    <div className="col-span-1 col-start-1">
                        <Label>Buchkategorie</Label>
                        <Select
                            onValueChange={(e) => setSelectParam('art', e)}
                            defaultValue="NULL"
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="NULL">
                                        Alle Buchkategorien
                                    </SelectItem>
                                    <SelectItem value="EPUB">Epub</SelectItem>
                                    <SelectItem value="HARDCOVER">
                                        Hardcover
                                    </SelectItem>
                                    <SelectItem value="PAPERBACK">
                                        Paperback
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Dropdown für Lieferbar */}
                    <div className="col-span-1 col-start-1 md:col-start-2">
                        <Label>Lieferbar</Label>
                        <Select
                            onValueChange={(e) =>
                                setSelectParam('lieferbar', e)
                            }
                            defaultValue="NULL"
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="NULL">
                                        Lieferbare/Nicht Lieferbare
                                    </SelectItem>
                                    <SelectItem value="1">
                                        Nur Lieferbare
                                    </SelectItem>
                                    <SelectItem value="0">
                                        Nur nicht Lieferbare
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}

function SearchInput({
    searchKey,
    placeholder,
    type,
    searchParams,
    setSearchParam,
    handleKeyDown,
    className,
}: {
    searchKey: string;
    placeholder: string;
    type: string;
    searchParams: Record<string, string>;
    setSearchParam: (key: string, value: string) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    className?: string;
}) {
    return (
        <Input
            className={`${className} p-2 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mainColor`}
            type={type}
            id={searchKey}
            defaultValue={searchParams[searchKey]}
            onChange={(e) => setSearchParam(searchKey, e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
        />
    );
}
