<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use App\Models\Campus;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        ]);

        $complaint = Complaint::create($validated);

        return redirect()->route('complaints.show', $complaint)
            ->with('success', 'Complaint submitted successfully. Your ticket ID is: ' . $complaint->ticket_id);
    }

    public function show(Complaint $complaint)
    {
        return Inertia::render('Complaints/Show', [
            'complaint' => $complaint->load(['campus', 'category']),
        ]);
    }

    public function index(Request $request)
    {
        $query = Complaint::query()
            ->with(['campus', 'category', 'coordinator', 'worker']);

        if ($request->user()->isCoordinator()) {
            $query->where('campus_id', $request->user()->campus_id)
                ->where('status', 'pending');
        } elseif ($request->user()->isWorker()) {
            $query->where('worker_id', $request->user()->id);
        }

        $complaints = $query->latest()->paginate(10);

        return Inertia::render('Complaints/Index', [
            'complaints' => $complaints,
        ]);
    }

    public function update(Request $request, Complaint $complaint)
    {
        $this->authorize('update', $complaint);

        $validated = $request->validate([
            'status' => 'required|in:pending,in_progress,resolved',
            'internal_notes' => 'nullable|string',
            'worker_id' => 'nullable|exists:users,id',
        ]);

        $complaint->update($validated);

        return back()->with('success', 'Complaint updated successfully');
    }
} 