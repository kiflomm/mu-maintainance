import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface Props {
    complaints: {
        data: Array<{
            id: number;
            ticket_id: string;
            description: string;
            status: 'pending' | 'in_progress' | 'resolved';
            campus: { name: string };
            category: { name: string };
            created_at: string;
        }>;
        links: Array<{ url: string | null; label: string }>;
    };
    auth: {
        user: {
            role: string;
        };
    };
}

export default function Index({ complaints, auth }: Props) {
    const { patch } = useForm();

    const handleStatusChange = (complaintId: number, status: string) => {
        patch(route('complaints.update', complaintId), {
            status,
            onSuccess: () => {
                toast.success('Status updated successfully');
            },
            onError: () => {
                toast.error('Failed to update status');
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
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Complaints</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4">Ticket ID</th>
                                        <th className="text-left py-3 px-4">Campus</th>
                                        <th className="text-left py-3 px-4">Category</th>
                                        <th className="text-left py-3 px-4">Description</th>
                                        <th className="text-left py-3 px-4">Status</th>
                                        <th className="text-left py-3 px-4">Created</th>
                                        <th className="text-left py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complaints.data.map((complaint) => (
                                        <tr key={complaint.id} className="border-b">
                                            <td className="py-3 px-4">{complaint.ticket_id}</td>
                                            <td className="py-3 px-4">{complaint.campus.name}</td>
                                            <td className="py-3 px-4">{complaint.category.name}</td>
                                            <td className="py-3 px-4">
                                                <div className="max-w-xs truncate">
                                                    {complaint.description}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                {getStatusBadge(complaint.status)}
                                            </td>
                                            <td className="py-3 px-4">
                                                {new Date(complaint.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <Link
                                                        href={route('complaints.show', complaint.id)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        View
                                                    </Link>
                                                    {auth.user.role === 'worker' && (
                                                        <Select
                                                            value={complaint.status}
                                                            onValueChange={(value) =>
                                                                handleStatusChange(complaint.id, value)
                                                            }
                                                        >
                                                            <SelectTrigger className="w-[140px]">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="pending">
                                                                    Pending
                                                                </SelectItem>
                                                                <SelectItem value="in_progress">
                                                                    In Progress
                                                                </SelectItem>
                                                                <SelectItem value="resolved">
                                                                    Resolved
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="mt-4 flex justify-center">
                            <div className="flex space-x-2">
                                {complaints.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 py-1 rounded ${
                                            link.url
                                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 