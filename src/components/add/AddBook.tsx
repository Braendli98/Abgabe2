import { handleFailure, handleSuccess } from '@/lib/api/add-response-handler';

import { AxiosResponse } from 'axios';
import Breadcrumbs from '../common/Breadcrumbs';
import { Buch } from '@/types/buch';
import { Button } from '../shadcn-ui/button';
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
}

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
                className="grid grid-cols-1 md:grid-cols-2 gap-8 border rounded-lg shadow-lg p-8 bg-white"
            >
                <div className="flex flex-col space-y-4">
                    <label className="font-medium">
                        Titel<span className="text-red-500">*</span>:{' '}
                        <input
                            type="text"
                            name="titel.titel"
                            value={formData.titel.titel}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            placeholder="Der Herr der Ringe"
                            required
                        />
                    </label>

                    <label className="font-medium">
                        Untertitel:{' '}
                        <input
                            type="text"
                            name="titel.untertitel"
                            value={formData.titel.untertitel}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            placeholder="Die Gefährten"
                        />
                    </label>

                    <label className="font-medium">
                        ISBN<span className="text-red-500">*</span>:{' '}
                        <input
                            type="text"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            placeholder="978-3-86680-192-9"
                            required
                        />
                    </label>

                    <label className="font-medium">
                        Datum<span className="text-red-500">*</span>:{' '}
                        <input
                            type="date"
                            name="datum"
                            value={formData.datum}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            onKeyDown={(e) => e.preventDefault()}
                        />
                    </label>

                    <label className="font-medium">
                        Preis (€)<span className="text-red-500">*</span>:{' '}
                        <input
                            type="text"
                            name="preis"
                            value={formData.preis}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            required
                        />
                    </label>

                    <label className="font-medium">
                        Rabatt (%):{' '}
                        <input
                            type="number"
                            name="rabatt"
                            value={formData.rabatt}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                        />
                    </label>

                    <label className="font-medium">
                        Rating:{' '}
                        <div className="mt-2">
                            <StarRating
                                rating={formData.rating}
                                onClick={(newRating: number) =>
                                    handleStarClick(newRating)
                                }
                            />
                        </div>
                    </label>

                    <label className="font-medium">
                        Cover Image:{' '}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="border rounded-md p-2 w-full"
                        />
                    </label>
                </div>

                <div className="flex flex-col space-y-4">
                    <span className="font-medium">Art:</span>
                    <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="art"
                                value="EPUB"
                                checked={formData.art === 'EPUB'}
                                onChange={handleChange}
                            />
                            <span>EPUB</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="art"
                                value="HARDCOVER"
                                checked={formData.art === 'HARDCOVER'}
                                onChange={handleChange}
                            />
                            <span>HARDCOVER</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="art"
                                value="PAPERBACK"
                                checked={formData.art === 'PAPERBACK'}
                                onChange={handleChange}
                            />
                            <span>PAPERBACK</span>
                        </label>
                    </div>

                    <label className="font-medium">
                        Lieferbar:{' '}
                        <input
                            type="checkbox"
                            name="lieferbar"
                            checked={formData.lieferbar}
                            onChange={handleChange}
                            className="ml-2"
                        />
                    </label>

                    <label className="font-medium">
                        Schlagwörter:{' '}
                        <input
                            type="text"
                            name="schlagwoerter"
                            value={formData.schlagwoerter.join(',')}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            placeholder="Fantasy, Abenteuer"
                        />
                    </label>
                </div>

                <div className="col-span-2">
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
};
