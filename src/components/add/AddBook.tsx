import Breadcrumbs from '../common/Breadcrumbs';
import { Buch } from '@/types/buch';
import { Button } from '../shadcn-ui/button';
import { getToken } from '@/lib/token-handling';
import { handleResponse } from '@/lib/add-validation';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

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
        coverImage: '',
        _links: { self: { href: '' } },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        let fieldValue: string | boolean | string[];

        if (type === 'checkbox') {
            fieldValue = checked;
        } else if (name === 'schlagwoerter') {
            fieldValue = value.split(',');
        } else {
            fieldValue = value;
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formattedDate = new Date(formData.datum)
            .toISOString()
            .split('T')[0];

        const submissionData = {
            ...formData,
            datum: formattedDate,
            preis: parseFloat(formData.preis.toString()),
            rabatt: parseFloat(formData.rabatt.toString()),
        };

        console.log('Gesendete Formulardaten:', submissionData);

        try {
            const response = await fetch('/api/rest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(submissionData),
            });

            await handleResponse(response, toast, navigate, formData);
        } catch (error) {
            console.error('Fehler beim Hinzufügen des Buches:', error);
        }
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
                        Titel:
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
                        Untertitel:
                        <input
                            type="text"
                            name="titel.untertitel"
                            value={formData.titel.untertitel}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                        />
                    </label>

                    <label className="font-medium">
                        ISBN:
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
                        Datum:
                        <input
                            type="date"
                            name="datum"
                            value={formData.datum}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                        />
                    </label>

                    <label className="font-medium">
                        Preis (€):
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
                        Rabatt (%):
                        <input
                            type="number"
                            name="rabatt"
                            value={formData.rabatt}
                            onChange={handleChange}
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
                        Lieferbar:
                        <input
                            type="checkbox"
                            name="lieferbar"
                            checked={formData.lieferbar}
                            onChange={handleChange}
                            className="ml-2"
                        />
                    </label>

                    <label className="font-medium">
                        Schlagwörter:
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
