import { handleFailure, handleSuccess } from '@/lib/add-validation';

import Breadcrumbs from '../common/Breadcrumbs';
import { Buch } from '@/types/buch';
import { Button } from '../shadcn-ui/button';
import { apiPost } from '@/lib/api/api-handler';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import StarRating from '../common/StarRating';

export default function AddBook() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [formData, setFormData] = useState<Buch>({
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
        coverImage: '', // Hier wird das Bild gespeichert
        _links: { self: { href: '' } },
    });

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    coverImage: reader.result as string, // Base64-String wird gespeichert
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStarClick = (newRating: number) => {
        setFormData((prev) => ({
            ...prev,
            rating: Math.floor(newRating),
        }));
    };

    const validateForm = () => {
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

        if (formData.rating < 1 || formData.rating > 5) {
            return 'Das Rating muss zwischen 1 und 5 liegen.';
        }

        if (formData.rabatt < 0 || formData.rabatt > 100) {
            return 'Der Rabatt muss zwischen 0 und 100 liegen.';
        }

        if (!formData.datum || new Date(formData.datum).toString() === 'Invalid Date') {
            return 'Ein gültiges Datum ist erforderlich.';
        }

        if (!formData.coverImage || formData.coverImage.trim() === '') {
            return 'Ein Bild muss hochgeladen werden.';
        }

        return null;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errorMessage = validateForm();
        if (errorMessage) {
            toast({
                title: 'Ungültige Eingabe',
                description: errorMessage,
                variant: 'destructive',
            });
            return;
        }

        const formattedDate = new Date(formData.datum).toISOString().split('T')[0];

        const submissionData = {
            ...formData,
            datum: formattedDate,
            preis: parseFloat(formData.preis.toString()),
            rabatt: parseFloat(formData.rabatt.toString()),
            rating: formData.rating || undefined,
        };

        console.log('Gesendete Daten:', JSON.stringify(submissionData, null, 2));

        apiPost(
            '/api/rest',
            JSON.stringify(submissionData),
            () => handleSuccess(toast, navigate, formData),
            (status: number) => handleFailure(status, toast),
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
                        Titel: {' '}
                        <input
                            type="text"
                            name="titel.titel"
                            value={formData.titel.titel}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            required
                        />
                    </label>

                    <label className="font-medium">
                        Untertitel: {' '}
                        <input
                            type="text"
                            name="titel.untertitel"
                            value={formData.titel.untertitel}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                        />
                    </label>

                    <label className="font-medium">
                        ISBN: {' '}
                        <input
                            type="text"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            required
                        />
                    </label>

                    <label className="font-medium">
                        Datum: {' '}
                        <input
                            type="date"
                            name="datum"
                            value={formData.datum}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                        />
                    </label>

                    <label className="font-medium">
                        Preis (€): {' '}
                        <input
                            type="number"
                            name="preis"
                            value={formData.preis}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            required
                        />
                    </label>

                    <label className="font-medium">
                        Rabatt (%): {' '}
                        <input
                            type="number"
                            name="rabatt"
                            value={formData.rabatt}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                        />
                    </label>

                    <label className="font-medium">
                        Rating: {' '}
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
                        Cover Image: {' '}
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
                        Lieferbar: {' '}
                        <input
                            type="checkbox"
                            name="lieferbar"
                            checked={formData.lieferbar}
                            onChange={handleChange}
                            className="ml-2"
                        />
                    </label>

                    <label className="font-medium">
                        Schlagwörter: {' '}
                        <input
                            type="text"
                            name="schlagwoerter"
                            value={formData.schlagwoerter.join(',')}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            placeholder="Comma-separated"
                        />
                    </label>
                </div>

                <div className="col-span-2">
                    <Button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                        Buch anlegen
                    </Button>
                </div>
            </form>
        </div>
    );
}
