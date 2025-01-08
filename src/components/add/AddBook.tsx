import { RadioGroup, RadioGroupItem } from '../shadcn-ui/radio-group';
import { handleFailure, handleSuccess } from '@/lib/api/add-response-handler';

import { AxiosResponse } from 'axios';
import Breadcrumbs from '../common/Breadcrumbs';
import { Buch } from '@/types/buch';
import { Button } from '../shadcn-ui/button';
import { Checkbox } from '../shadcn-ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Input } from '../shadcn-ui/input';
import { Label } from '../shadcn-ui/label';
import StarRating from '../common/StarRating';
import { apiPost } from '@/lib/api/api-handler';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Standardformulardaten
const defaultFormData = {
    id: '',
    titel: { titel: '', untertitel: '' },
    isbn: '',
    preis: 0,
    rating: 0,
    art: 'EPUB',
    lieferbar: false,
    rabatt: 0,
    datum: '',
    schlagwoerter: [],
    coverImage: '',
    _links: { self: { href: '' } },
};

/**
 * Rendert eine React Komponente, die das Hinzufügen von Büchern erlaubt.
 *
 * @returns Komponente zum Hinzufügen von Büchern
 */
export default function AddBook() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [formData, setFormData] = useState<Buch>(defaultFormData);

    // Funktion die Formulardaten aktualisiert
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        let fieldValue: string | boolean | string[] = value;

        if (type === 'checkbox') {
            fieldValue = checked;
        } else if (name === 'schlagwoerter') {
            fieldValue = value.split(',');
        }

        if (name.startsWith('titel.')) {
            const field = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                titel: {
                    ...prev.titel,
                    [field]: fieldValue,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: fieldValue,
            }));
        }
    };

    const handleCheckboxChange = (value: CheckedState) => {
        if (value !== 'indeterminate') {
            setFormData((prev) => ({
                ...prev,
                lieferbar: value,
            }));
        }
    };

    const handleTypeChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            art: value,
        }));
    };

    // Funktion die das Einbandbild in den Formulardaten aktualisiert
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    coverImage: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Funktion die die Bewertung in den Formulardaten aktualisiert
    const handleStarClick = (newRating: number) => {
        setFormData((prev) => ({
            ...prev,
            rating: Math.floor(newRating),
        }));
    };

    // Funktion die die Formulardaten ans Backend schickt
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errorMessage = validateForm(formData);
        if (errorMessage) {
            toast({
                title: 'Ungültige Eingabe',
                description: errorMessage,
                variant: 'destructive',
            });
            return;
        }

        const formattedDate = new Date(formData.datum)
            .toISOString()
            .split('T')[0];

        const submissionData = {
            ...formData,
            datum: formattedDate,
            preis: parseFloat(formData.preis.toString()),
            rabatt: parseFloat(formData.rabatt.toString()) / 100,
        };

        apiPost(
            '/api/rest',
            JSON.stringify(submissionData),
            () => handleSuccess(toast, navigate, formData),
            (response: AxiosResponse) => handleFailure(response, toast),
            {
                noCache: false,
                token: true,
            },
        );
    };

    return (
        <div className="content max-w-screen-lg mx-auto">
            <Breadcrumbs path={[{ base: '' }, { base: 'add' }]} />
            <h2 className="text-4xl font-extrabold mb-6">Buch anlegen</h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-4 gap-x-16 border rounded-lg shadow-lg p-8 bg-white"
            >
                {/* Eingabe für den Titel */}
                <Label className="text-lg col-span-2 md:col-span-1">
                    Titel<span className="text-red-500">*</span>
                    <Input
                        type="text"
                        name="titel.titel"
                        value={formData.titel.titel}
                        onChange={handleChange}
                        className="border rounded-md p-2 w-full"
                        placeholder="Der Herr der Ringe"
                        required
                    />
                </Label>

                {/* Eingabe für Untertitel */}
                <Label className="text-lg col-span-2 md:col-span-1">
                    Untertitel
                    <Input
                        type="text"
                        name="titel.untertitel"
                        value={formData.titel.untertitel}
                        onChange={handleChange}
                        className="border rounded-md p-2 w-full"
                        placeholder="Die Gefährten"
                    />
                </Label>

                {/* Eingabe für ISBN */}
                <Label className="text-lg col-span-2 md:col-span-1">
                    ISBN<span className="text-red-500">*</span>
                    <Input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        className="border rounded-md p-2 w-full"
                        placeholder="978-3-86680-192-9"
                        required
                    />
                </Label>

                {/* Preis festlegen */}
                <div className="grid grid-cols-2 gap-4 col-span-2 md:col-span-1">
                    <Label className="text-lg col-span-1">
                        Preis (€)<span className="text-red-500">*</span>
                        <Input
                            type="text"
                            name="preis"
                            value={formData.preis}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            required
                        />
                    </Label>

                    {/* Rabatt festlegen */}
                    <Label className="text-lg col-span-1">
                        Rabatt (%)
                        <Input
                            type="number"
                            name="rabatt"
                            value={formData.rabatt}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                        />
                    </Label>
                </div>

                {/* Datum festlegen */}
                <Label className="text-lg col-span-2 md:col-span-1 md:w-2/3">
                    Datum<span className="text-red-500">*</span>
                    <input
                        type="date"
                        name="datum"
                        value={formData.datum}
                        onChange={handleChange}
                        className="border rounded-md p-2 w-full"
                        onKeyDown={(e) => e.preventDefault()}
                    />
                </Label>

                {/* Checkbox ob Buch Lieferbar ist */}
                <Label className="text-lg col-span-1 md:row-start-1 md:col-start-2">
                    Verfügbarkeit
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="terms"
                            onCheckedChange={handleCheckboxChange}
                        />
                        <Label className="text-base">Lieferbar</Label>
                    </div>
                </Label>
                {/* Auswahl der Buchart */}
                <div className="space-y-2 col-span-2 md:col-span-1 row-span-2 md:row-start-2 md:col-start-2">
                    <Label className="text-lg">Art</Label>
                    <RadioGroup
                        defaultValue="EPUB"
                        onValueChange={handleTypeChange}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="EPUB" id="r1" />
                            <Label className="text-base">EPUB</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="HARDCOVER" id="r2" />
                            <Label className="text-base">Hardcover</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="PAPERBACK" id="r3" />
                            <Label className="text-base">Paperback</Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Eingabe von Schlagwörtern */}
                <Label className="text-lg col-span-2 md:col-span-1 md:row-start-4 md:col-start-2">
                    Schlagwörter
                    <Input
                        type="text"
                        name="schlagwoerter"
                        value={formData.schlagwoerter.join(',')}
                        onChange={handleChange}
                        className="border rounded-md p-2 w-full"
                        placeholder="Fantasy, Abenteuer"
                    />
                </Label>

                {/* Eingabe des Ratings */}
                <Label className="text-lg col-span-2 md:col-span-1 md:row-start-5 md:col-start-2">
                    Rating
                    <div className="mt-2">
                        <StarRating
                            rating={formData.rating}
                            onClick={(newRating: number) =>
                                handleStarClick(newRating)
                            }
                        />
                    </div>
                </Label>

                {/* Eingabe des Einbandbilds*/}
                <Label className="text-lg col-span-2 md:col-span-1">
                    Einband
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border rounded-md p-2 w-full text-base"
                    />
                </Label>

                {/* Button um Buch zu erstellen */}
                <div className="col-span-2 md:w-1/4 md:justify-self-end mt-8">
                    <Button
                        variant="custom"
                        type="submit"
                        className="w-full py-2 px-4"
                    >
                        Buch anlegen
                    </Button>
                </div>
            </form>
        </div>
    );
}

// Funktion die die Formulardaten validiert
function validateForm(formData: Buch) {
    if (!formData.titel.titel || formData.titel.titel.trim() === '') {
        return 'Titel ist erforderlich.';
    }

    if (!formData.isbn || formData.isbn.trim() === '') {
        return 'ISBN ist erforderlich.';
    }

    if (!/^\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d+$/.test(formData.isbn)) {
        return 'Die ISBN ist ungültig. Sie muss dem Format "978-1-56619-909-6" entsprechen.';
    }

    if (formData.preis <= 0) {
        return 'Der Preis muss größer als 0 sein.';
    }

    if (formData.rabatt < 0 || formData.rabatt > 100) {
        return 'Der Rabatt muss zwischen 0 und 100 liegen.';
    }

    if (!formData.datum || formData.datum.trim() === '') {
        return 'Ein Datum ist erforderlich.';
    }

    if (new Date(formData.datum).toString() === 'Invalid Date') {
        return 'Ein gültiges Datum ist erforderlich.';
    }

    return null;
}
