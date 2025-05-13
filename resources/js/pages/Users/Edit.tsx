import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        campus_id: number;
    };
    campuses: Array<{ id: number; name: string }>;
}

export default function Edit({ user, campuses }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        campus_id: user.campus_id.toString(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('users.update', user.id), {
            onSuccess: () => {
                toast.success('User updated successfully');
            },
            onError: () => {
                toast.error('Failed to update user');
            },
        });
    };

    return (
        <div className="py-12">
            <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit User</CardTitle>
                        <CardDescription>
                            Update the user's information below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">New Password (leave blank to keep current)</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    value={data.role}
                                    onValueChange={(value) => setData('role', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="coordinator">Coordinator</SelectItem>
                                        <SelectItem value="worker">Worker</SelectItem>
                                        <SelectItem value="manager">Manager</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && (
                                    <p className="text-sm text-red-500">{errors.role}</p>
                                )}
                            </div>

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

                            <Button type="submit" disabled={processing} className="w-full">
                                {processing ? 'Updating...' : 'Update User'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 