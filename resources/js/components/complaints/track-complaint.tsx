import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Clock, ClipboardCheck, Search } from 'lucide-react';

interface ComplaintStatus {
    id: string;
    status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
    title: string;
    description: string;
    submittedAt: string;
    lastUpdated: string;
}

export function TrackComplaint() {
    const [trackingId, setTrackingId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [complaint, setComplaint] = useState<ComplaintStatus | null>(null);
    const [error, setError] = useState('');

    const handleTrackComplaint = () => {
        if (!trackingId.trim()) {
            setError('Please enter a tracking ID');
            return;
        }

        setError('');
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            // This is just an example - in a real app, you'd fetch this from your backend
            if (trackingId === 'MU-2023-1234') {
                setComplaint({
                    id: 'MU-2023-1234',
                    status: 'in-progress',
                    title: 'Maintenance Issue in Engineering Building',
                    description: 'Reported leak in the ceiling of room 301.',
                    submittedAt: '2023-10-15T09:30:00',
                    lastUpdated: '2023-10-16T14:15:00'
                });
            } else {
                setError('No complaint found with this tracking ID');
                setComplaint(null);
            }
            setIsLoading(false);
        }, 1000);
    };

    const getStatusIcon = (status: ComplaintStatus['status']) => {
        switch (status) {
            case 'pending':
                return <Clock className="h-5 w-5 text-yellow-500" />;
            case 'in-progress':
                return <Clock className="h-5 w-5 text-blue-500" />;
            case 'resolved':
                return <ClipboardCheck className="h-5 w-5 text-green-500" />;
            case 'rejected':
                return <AlertCircle className="h-5 w-5 text-red-500" />;
        }
    };

    const getStatusText = (status: ComplaintStatus['status']) => {
        switch (status) {
            case 'pending':
                return 'Pending Review';
            case 'in-progress':
                return 'In Progress';
            case 'resolved':
                return 'Resolved';
            case 'rejected':
                return 'Rejected';
        }
    };

    return (
        <Card className="shadow-lg border-muted">
            <CardHeader>
                <CardTitle className="text-xl">Track Your Complaint</CardTitle>
                <CardDescription>
                    Enter your complaint tracking ID to check its current status.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2">
                    <Input
                        placeholder="Enter tracking ID (e.g., MU-2023-1234)"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        className="flex-1"
                    />
                    <Button 
                        onClick={handleTrackComplaint} 
                        disabled={isLoading}
                        size="icon"
                    >
                        {isLoading ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                            <Search className="h-4 w-4" />
                        )}
                    </Button>
                </div>
                
                {error && (
                    <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{error}</span>
                    </p>
                )}

                {complaint && (
                    <div className="mt-6">
                        <Separator className="mb-4" />
                        
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/10">
                                    {getStatusIcon(complaint.status)}
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Status</p>
                                    <p className="text-muted-foreground text-sm">{getStatusText(complaint.status)}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">Tracking ID</p>
                                <p className="text-muted-foreground text-sm">{complaint.id}</p>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium">Title</h4>
                                <p className="text-muted-foreground">{complaint.title}</p>
                            </div>
                            
                            <div>
                                <h4 className="text-sm font-medium">Description</h4>
                                <p className="text-muted-foreground">{complaint.description}</p>
                            </div>
                            
                            <div className="flex justify-between text-sm">
                                <div>
                                    <p className="font-medium">Submitted</p>
                                    <p className="text-muted-foreground">
                                        {new Date(complaint.submittedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-muted-foreground">
                                        {new Date(complaint.lastUpdated).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-center border-t px-6 py-4 text-xs text-muted-foreground">
                <p>For assistance, contact support at support@mekeleu.edu.et</p>
            </CardFooter>
        </Card>
    );
}
