import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Props {
    campuses: Array<{ id: number; name: string }>;
}

export default function Create({ campuses }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
        campus_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => {
                toast.success('User created successfully');
            },
            onError: () => {
                toast.error('Failed to create user');
            },
        });
    };

    return (
        <div className="py-12">
            <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New User</CardTitle>
                        <CardDescription>
                            Fill out the form below to create a new user account.
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
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
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
                                {processing ? 'Creating...' : 'Create User'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 