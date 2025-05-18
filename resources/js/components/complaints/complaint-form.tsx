import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { AlertCircle, FileImage, HelpCircle, Loader2, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

interface ComplaintFormProps {
    campuses: Array<{ id: number; name: string; code: string }>;
    categories: Array<{ id: number; name: string; slug: string }>;
}

export function ComplaintForm({ campuses, categories }: ComplaintFormProps) {
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
        <Card className="shadow-lg border-muted">
            <CardHeader className="space-y-1 pb-6">
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center dark:bg-primary/20">
                        <AlertCircle className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Submit a Complaint</CardTitle>
                </div>
                <CardDescription className="text-base">
                    Please fill out the form below to submit your complaint. We will process it as soon as possible.
                </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="campus" className="font-medium">Campus</Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="max-w-xs">Select the campus where the issue occurred</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Select
                                value={data.campus_id}
                                onValueChange={(value) => setData('campus_id', value)}
                            >
                                <SelectTrigger className={errors.campus_id ? "border-destructive ring-1 ring-destructive" : ""}>
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
                                <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    <span>{errors.campus_id}</span>
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="category" className="font-medium">Category</Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="max-w-xs">Choose the category that best describes your complaint</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Select
                                value={data.category_id}
                                onValueChange={(value) => setData('category_id', value)}
                            >
                                <SelectTrigger className={errors.category_id ? "border-destructive ring-1 ring-destructive" : ""}>
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
                                <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    <span>{errors.category_id}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="description" className="font-medium">Description</Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">Be specific: include dates, times, and relevant details</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Please describe your complaint in detail..."
                            className={`min-h-[120px] resize-y ${errors.description ? "border-destructive ring-1 ring-destructive" : ""}`}
                        />
                        {errors.description && (
                            <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                                <AlertCircle className="h-3.5 w-3.5" />
                                <span>{errors.description}</span>
                            </p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="image" className="font-medium">Image (Optional)</Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">Upload a photo showing the issue if applicable</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 items-start">
                            <div>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="image" 
                                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${imagePreview ? 'border-primary/30 bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/40 bg-muted/20 hover:bg-muted/30'} transition-colors`}>
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <FileImage className="w-8 h-8 mb-2 text-muted-foreground/70" />
                                            <p className="text-xs text-muted-foreground/70 font-medium">
                                                {imagePreview ? 'Change image' : 'Click to upload'}
                                            </p>
                                        </div>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {errors.image && (
                                    <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                                        <AlertCircle className="h-3.5 w-3.5" />
                                        <span>{errors.image}</span>
                                    </p>
                                )}
                            </div>

                            {imagePreview && (
                                <div className="relative rounded-md overflow-hidden border border-muted bg-muted/10">
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        className="w-full h-32 object-cover" 
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setData('image', null);
                                            setImagePreview(null);
                                        }}
                                        className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                                        aria-label="Remove image"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 pt-2">
                        <div className="flex items-center gap-3">
                            <h3 className="text-lg font-medium">Contact Information</h3>
                            <div className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground/80">Optional</div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">Add your contact details if you'd like us to follow up with you</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <Separator />
                        
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="contact_name" className="font-medium">Name</Label>
                                <Input
                                    id="contact_name"
                                    value={data.contact_name}
                                    onChange={(e) => setData('contact_name', e.target.value)}
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contact_email" className="font-medium">Email</Label>
                                <Input
                                    id="contact_email"
                                    type="email"
                                    value={data.contact_email}
                                    onChange={(e) => setData('contact_email', e.target.value)}
                                    placeholder="your.email@example.com"
                                    className={errors.contact_email ? "border-destructive ring-1 ring-destructive" : ""}
                                />
                                {errors.contact_email && (
                                    <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                                        <AlertCircle className="h-3.5 w-3.5" />
                                        <span>{errors.contact_email}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact_phone" className="font-medium">Phone</Label>
                            <Input
                                id="contact_phone"
                                value={data.contact_phone}
                                onChange={(e) => setData('contact_phone', e.target.value)}
                                placeholder="Your phone number"
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-end pt-6">
                <Button 
                    type="submit" 
                    onClick={handleSubmit}
                    disabled={processing} 
                    className="w-full sm:w-auto"
                    size="lg"
                >
                    {processing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Complaint
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
} 