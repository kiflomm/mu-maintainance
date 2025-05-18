import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Props {
    complaint: {
        id: number;
        ticket_id: string;
        description: string;
        status: 'pending' | 'in_progress' | 'resolved';
        campus: { name: string };
        category: { name: string };
        contact_name: string | null;
        contact_email: string | null;
        contact_phone: string | null;
        internal_notes: string | null;
        created_at: string;
        updated_at: string;
        image_path: string | null;
    };
    image_url: string | null;
    auth: {
        user: {
            role: string;
        };
    };
}

export default function Show({ complaint, image_url, auth }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        status: complaint.status,
        internal_notes: complaint.internal_notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('complaints.update', complaint.id), {
            onSuccess: () => {
                toast.success('Complaint updated successfully');
            },
            onError: () => {
                toast.error('Failed to update complaint');
            },
        });
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            pending: 'bg-yellow-500',
            in_progress: 'bg-blue-500',
            resolved: 'bg-green-500',
        };

        return (
            <Badge className={variants[status as keyof typeof variants]}>
                {status.replace('_', ' ').toUpperCase()}
            </Badge>
        );
    };

    return (
        <div className="py-12">
            <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>Complaint Details</CardTitle>
                                <CardDescription>
                                    Ticket ID: {complaint.ticket_id}
                                </CardDescription>
                            </div>
                            {getStatusBadge(complaint.status)}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Campus</h3>
                                    <p className="mt-1">{complaint.campus.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                                    <p className="mt-1">{complaint.category.name}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                                <p className="mt-1 whitespace-pre-wrap">{complaint.description}</p>
                            </div>

                            {image_url && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Attached Image</h3>
                                    <div className="mt-2">
                                        <img 
                                            src={image_url} 
                                            alt="Attached image" 
                                            className="max-h-80 object-contain rounded-md border border-gray-200"
                                        />
                                    </div>
                                </div>
                            )}

                            {(complaint.contact_name || complaint.contact_email || complaint.contact_phone) && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                                    <div className="mt-1 space-y-1">
                                        {complaint.contact_name && (
                                            <p>Name: {complaint.contact_name}</p>
                                        )}
                                        {complaint.contact_email && (
                                            <p>Email: {complaint.contact_email}</p>
                                        )}
                                        {complaint.contact_phone && (
                                            <p>Phone: {complaint.contact_phone}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Timeline</h3>
                                <div className="mt-1 space-y-1">
                                    <p>Created: {new Date(complaint.created_at).toLocaleString()}</p>
                                    <p>Last Updated: {new Date(complaint.updated_at).toLocaleString()}</p>
                                </div>
                            </div>

                            {(auth.user.role === 'worker' || auth.user.role === 'coordinator') && (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium text-gray-500">Update Status</h3>
                                        <Select
                                            value={data.status}
                                            onValueChange={(value) => setData('status', value as 'pending' | 'in_progress' | 'resolved')}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="in_progress">In Progress</SelectItem>
                                                <SelectItem value="resolved">Resolved</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && (
                                            <p className="text-sm text-red-500">{errors.status}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium text-gray-500">Internal Notes</h3>
                                        <Textarea
                                            value={data.internal_notes}
                                            onChange={(e) => setData('internal_notes', e.target.value)}
                                            placeholder="Add internal notes about this complaint..."
                                            className="min-h-[100px]"
                                        />
                                        {errors.internal_notes && (
                                            <p className="text-sm text-red-500">{errors.internal_notes}</p>
                                        )}
                                    </div>

                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Complaint'}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 