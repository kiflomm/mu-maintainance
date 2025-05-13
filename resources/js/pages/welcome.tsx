import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Campus, Category } from '@/types';

interface Props {
    campuses: Campus[];
    categories: Category[];
}

export default function Welcome({ campuses, categories }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        campus_id: '',
        category_id: '',
        description: '',
        contact_info: {
            name: '',
            email: '',
            phone: '',
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('complaints.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                            Submit a Complaint
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="campus" className="block text-sm font-medium text-gray-700">
                                    Campus
                                </label>
                                <select
                                    id="campus"
                                    value={data.campus_id}
                                    onChange={e => setData('campus_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="">Select a campus</option>
                                    {campuses.map(campus => (
                                        <option key={campus.id} value={campus.id}>
                                            {campus.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.campus_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.campus_id}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-medium text-gray-900">Contact Information (Optional)</h3>
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.contact_info.name}
                                            onChange={e => setData('contact_info', { ...data.contact_info, name: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.contact_info.email}
                                            onChange={e => setData('contact_info', { ...data.contact_info, email: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.contact_info.phone}
                                            onChange={e => setData('contact_info', { ...data.contact_info, phone: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    {processing ? 'Submitting...' : 'Submit Complaint'}
                                </button>
                        </div>
                        </form>
                        </div>
                </div>
            </div>
        </div>
    );
}
