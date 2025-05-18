import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function ComplaintGuide() {
    return (
        <Card className="shadow-lg border-muted sticky top-4">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-medium text-xs">1</div>
                    <div>
                        <h4 className="font-medium">Complete the Form</h4>
                        <p className="text-muted-foreground">Provide details about your complaint including location and category.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-medium text-xs">2</div>
                    <div>
                        <h4 className="font-medium">Submit Your Complaint</h4>
                        <p className="text-muted-foreground">Click the submit button to send your complaint to our team.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-medium text-xs">3</div>
                    <div>
                        <h4 className="font-medium">Track Progress</h4>
                        <p className="text-muted-foreground">If you provided contact details, we'll keep you updated on the progress.</p>
                    </div>
                </div>
                <Separator />
                <div className="bg-muted/40 p-3 rounded-md dark:bg-muted/10">
                    <h4 className="font-medium mb-1">Privacy Assurance</h4>
                    <p className="text-muted-foreground text-xs">All complaints are handled confidentially. Your personal information will only be used to address your concerns.</p>
                </div>
            </CardContent>
        </Card>
    );
} 