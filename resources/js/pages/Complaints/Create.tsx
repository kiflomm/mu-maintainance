import { Info, MessageSquare, BookOpen, University } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ComplaintForm } from '@/components/complaints/complaint-form';
import { ComplaintGuide } from '@/components/complaints/complaint-guide';
import { LoginButton } from '@/components/complaints/login-button';
import { TrackComplaint } from '@/components/complaints/track-complaint';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';

interface Props {
    campuses: Array<{ id: number; name: string; code: string }>;
    categories: Array<{ id: number; name: string; slug: string }>;
}

export default function Create({ campuses, categories }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-muted/60 dark:from-background dark:to-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <header className="rounded-xl overflow-hidden mb-10">
                    <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary-foreground/10 p-2 rounded-full">
                                <University className="h-6 w-6" />
                            </div>
                            <div className="font-semibold text-lg">Mekele University</div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <LoginButton className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20" />
                            <Separator orientation="vertical" className="h-6 bg-primary-foreground/20" />
                            <ThemeToggle />
                        </div>
                    </div>
                    
                    <div className="bg-card p-8 border-x border-b rounded-b-xl shadow-md">
                        <div className="text-center max-w-2xl mx-auto">
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">
                                Complaint Submission Portal
                            </h1>
                            <p className="text-lg text-muted-foreground mb-4">
                                We value your feedback and are committed to addressing your concerns. Your voice matters to us.
                            </p> 
                            <div className="flex flex-wrap gap-4 justify-center">
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center dark:bg-primary/20">
                                        <MessageSquare className="h-4 w-4 text-primary" />
                                    </div>
                                    <span>Submit Issues</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center dark:bg-primary/20">
                                        <BookOpen className="h-4 w-4 text-primary" />
                                    </div>
                                    <span>Track Progress</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center dark:bg-primary/20">
                                        <Info className="h-4 w-4 text-primary" />
                                    </div>
                                    <span>Confidential</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="mb-10">
                    <Tabs defaultValue="submit" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="submit">Submit Complaint</TabsTrigger>
                            <TabsTrigger value="track">Track Status</TabsTrigger>
                        </TabsList>
                        <TabsContent value="submit">
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="md:col-span-1">
                                    <ComplaintGuide />
                                </div>
                                
                                <div className="md:col-span-2">
                                    <ComplaintForm campuses={campuses} categories={categories} />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="track">
                            <div className="max-w-lg mx-auto">
                                <TrackComplaint />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
                
                <div className="text-center mt-8 text-sm text-muted-foreground">
                    <p>Thank you for helping us improve our university. Your feedback is invaluable.</p>
                </div>
            </div>
        </div>
    );
} 