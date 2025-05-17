<?php

namespace App\Policies;

use App\Models\Complaint;
use App\Models\User;

class ComplaintPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isCoordinator() || $user->isWorker() || $user->isStudentServiceDirector();
    }

    public function view(User $user, Complaint $complaint): bool
    {
        if ($user->isStudentServiceDirector()) {
            return true;
        }

        if ($user->isCoordinator()) {
            return $complaint->campus_id === $user->campus_id;
        }

        if ($user->isWorker()) {
            return $complaint->worker_id === $user->id;
        }

        return false;
    }

    public function update(User $user, Complaint $complaint): bool
    {
        if ($user->isCoordinator()) {
            return $complaint->campus_id === $user->campus_id && $complaint->status === 'pending';
        }

        if ($user->isWorker()) {
            return $complaint->worker_id === $user->id;
        }

        return false;
    }
} 