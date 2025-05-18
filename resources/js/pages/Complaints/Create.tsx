import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useState } from 'react';

interface Props {
    campuses: Array<{ id: number; name: string; code: string }>;
    categories: Array<{ id: number; name: string; slug: string }>;
}

export default function Create({ campuses, categories }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        campus_id: '',
        category_id: '',
        description: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        image: null as File | null,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('complaints.store'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Complaint submitted successfully');
                reset();
                setImagePreview(null);
            },
            onError: () => {
                toast.error('Failed to submit complaint');
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Submit a Complaint </CardTitle>
                        <CardDescription>
                            Please fill out the form below to submit your complaint. We will process it as soon as possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="campus">Campus</Label>
                                <Select
                                    value={data.campus_id}
                                    onValueChange={(value) => setData('campus_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select campus" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {campuses.map((campus) => (
                                            <SelectItem key={campus.id} value={campus.id.toString()}>
                                                {campus.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.campus_id && (
                                    <p className="text-sm text-red-500">{errors.campus_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={data.category_id}
                                    onValueChange={(value) => setData('category_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category_id && (
                                    <p className="text-sm text-red-500">{errors.category_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Please describe your complaint in detail..."
                                    className="min-h-[100px]"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Image (Optional)</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="cursor-pointer"
                                />
                                {errors.image && (
                                    <p className="text-sm text-red-500">{errors.image}</p>
                                )}
                                {imagePreview && (
                                    <div className="mt-2 relative">
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            className="w-full max-h-60 object-contain rounded-md" 
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                            onClick={() => {
                                                setData('image', null);
                                                setImagePreview(null);
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Contact Information (Optional)</h3>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="contact_name">Name</Label>
                                    <Input
                                        id="contact_name"
                                        value={data.contact_name}
                                        onChange={(e) => setData('contact_name', e.target.value)}
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact_email">Email</Label>
                                    <Input
                                        id="contact_email"
                                        type="email"
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.contact_email && (
                                        <p className="text-sm text-red-500">{errors.contact_email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact_phone">Phone</Label>
                                    <Input
                                        id="contact_phone"
                                        value={data.contact_phone}
                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                        placeholder="Your phone number"
                                    />
                                </div>
                            </div>

                            <Button type="submit" disabled={processing} className="w-full">
                                {processing ? 'Submitting...' : 'Submit Complaint'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 