import { ChevronsUpDown, Search } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../shadcn-ui/collapsible';
import { RadioGroup, RadioGroupItem } from '../shadcn-ui/radio-group';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../shadcn-ui/select';

import { Button } from '../shadcn-ui/button';
import { Checkbox } from '../shadcn-ui/checkbox';
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

    const setCheckboxParam = (key: string, checked: string) => {
        searchParams[key] = searchParams[key] === checked ? '' : checked;
        setSearchParams(searchParams);
    };

    return (
        <Collapsible>
            <div className="flex items-center md:w-2/3 mb-4">
                {/* Suchfeld für Titel */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 md:w-2/3 gap-x-4 gap-y-4 md:gap-y-1 border rounded-lg p-2 border-gray-300">
                    {/* Dropdown für Kategorie */}
                    <div className="col-span-1 col-start-1">
                        <SearchLabel>Buchkategorie</SearchLabel>
                        <Select
                            onValueChange={(e) => setSelectParam('art', e)}
                            defaultValue="NULL"
                        >
                            <SelectTrigger className="w-full text-base">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem
                                        value="NULL"
                                        className="text-base"
                                    >
                                        Alle Buchkategorien
                                    </SelectItem>
                                    <SelectItem
                                        value="EPUB"
                                        className="text-base"
                                    >
                                        Epub
                                    </SelectItem>
                                    <SelectItem
                                        value="HARDCOVER"
                                        className="text-base"
                                    >
                                        Hardcover
                                    </SelectItem>
                                    <SelectItem value="PAPERBACK">
                                        Paperback
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Eingabefeld für ISBN */}
                    <div className="col-span-1 col-start-1">
                        <SearchLabel>ISBN</SearchLabel>
                        <SearchInput
                            searchKey="isbn"
                            placeholder="Nach ISBN suchen..."
                            type="text"
                            searchParams={searchParams}
                            setSearchParam={setSearchParam}
                            handleKeyDown={handleKeyDown}
                            className={'flex-item flex-auto mr-1'}
                        />
                    </div>
                    {/* Eingabefeld für Preis */}
                    <div className="col-span-1 col-start-1">
                        <SearchLabel>Preis</SearchLabel>
                        <SearchInput
                            searchKey="preis"
                            placeholder="Nach exaktem Preis suchen..."
                            type="number"
                            searchParams={searchParams}
                            setSearchParam={setSearchParam}
                            handleKeyDown={handleKeyDown}
                            className={'flex-item flex-auto mr-1'}
                        />
                    </div>
                    {/* Eingabefeld für Rabatt */}
                    <div className="col-span-1 col-start-1">
                        <SearchLabel>Rabatt</SearchLabel>
                        <SearchInput
                            searchKey="rabatt"
                            placeholder="Nach exaktem Rabatt suchen..."
                            type="number"
                            searchParams={searchParams}
                            setSearchParam={setSearchParam}
                            handleKeyDown={handleKeyDown}
                            className={'flex-item flex-auto mr-1'}
                        />
                    </div>
                    {/* Radiogroup für Nur Lieferbar */}
                    <div className="col-span-1 col-start-1 md:col-start-2 row-span-2 md:row-start-1 self-center space-y-2">
                        <Label className="text-lg md:text-base">
                            Lieferbar
                        </Label>
                        <RadioGroup
                            defaultValue=""
                            onValueChange={(e) =>
                                setSearchParam('lieferbar', e)
                            }
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="" id="r1" />
                                <Label className="text-base">
                                    Lieferbare/Nicht Lieferbare
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="1" id="r2" />
                                <Label className="text-base">
                                    Nur Lieferbare
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="0" id="r3" />
                                <Label className="text-base">
                                    Nur nicht Lieferbare
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {/* Checkboxen für Schlagwörter */}
                    <div className="col-span-1 col-start-1 md:col-start-2 row-span-2 md:row-start-3 self-center space-y-2">
                        <Label className="text-lg md:text-base">
                            Schlagwörter
                        </Label>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                onCheckedChange={() =>
                                    setCheckboxParam('javascript', 'true')
                                }
                            />
                            <Label className="text-base">Javascript</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                onCheckedChange={() =>
                                    setCheckboxParam('typescript', 'true')
                                }
                            />
                            <Label className="text-base">Typescript</Label>
                        </div>
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}

function SearchLabel({ children }: { children: string }) {
    return <Label className="text-lg md:text-base">{children}</Label>;
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
