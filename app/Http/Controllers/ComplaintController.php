<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use App\Models\Campus;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ComplaintController extends Controller
{
    public function create()
    {
        return Inertia::render('Complaints/Create', [
            'campuses' => Campus::all(),
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'campus_id' => 'required|exists:campuses,id',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string|min:10',
            'contact_name' => 'nullable|string|max:255',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:20',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Generate a unique complaint ID
        $validated['complaint_id'] = 'COMP-' . date('Y') . '-' . Str::random(8);
        $validated['status'] = 'pending';
        $validated['date_time'] = now();

        // Handle image upload
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $imagePath = $request->file('image')->store('complaint-images', 'public');
            $validated['image_path'] = $imagePath;
        }

        $complaint = Complaint::create($validated);

        return redirect()->route('complaints.show', $complaint)
            ->with('success', 'Complaint submitted successfully. Your Complaint ID is: ' . $complaint->complaint_id);
    }

    public function show(Complaint $complaint)
    {
        return Inertia::render('Complaints/Show', [
            'complaint' => $complaint->load(['campus', 'category']),
            'image_url' => $complaint->image_path ? Storage::url($complaint->image_path) : null,
        ]);
    }

    public function index(Request $request)
    {
        $query = Complaint::query()
            ->with(['campus', 'category', 'coordinator', 'worker']);

        // Filter by status if provided
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->user() && $request->user()->isCoordinator()) {
            $query->where('campus_id', $request->user()->campus_id)
                ->where('status', 'pending');
        } elseif ($request->user() && $request->user()->isWorker()) {
            $query->where('worker_id', $request->user()->id);
        }

        $complaints = $query->latest()->paginate(10);

        // Add image URLs to the complaints collection
        $complaints->getCollection()->transform(function ($complaint) {
            $complaint->image_url = $complaint->image_path ? Storage::url($complaint->image_path) : null;
            return $complaint;
        });

        return Inertia::render('Complaints/Index', [
            'complaints' => $complaints,
            'filters' => $request->only(['status']),
        ]);
    }

    public function update(Request $request, Complaint $complaint)
    {
        // Using Gate instead of authorize method
        if (Gate::denies('update', $complaint)) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,in_progress,resolved',
            'internal_notes' => 'nullable|string',
            'worker_id' => 'nullable|exists:users,id',
        ]);

        $complaint->update($validated);

        return back()->with('success', 'Complaint updated successfully');
    }

    public function track(Request $request)
    {
        $request->validate([
            'complaint_id' => 'required|string',
        ]);

        $complaint = Complaint::where('complaint_id', $request->complaint_id)->first();

        if (!$complaint) {
            return back()->with('error', 'Complaint not found with the provided ID.');
        }

        return redirect()->route('complaints.show', $complaint);
    }
} 