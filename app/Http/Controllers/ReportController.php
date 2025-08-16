<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function totalInvestedByStudent()
    {
        return Enrollment::selectRaw('students.name, SUM(enrollments.price_paid) as total_invested')
            ->join('students', 'students.id', '=', 'enrollments.student_id')
            ->groupBy('students.id', 'students.name')
            ->get();
    }

    public function topCourses()
    {
        return Enrollment::selectRaw('courses.name, COUNT(*) as total_students')
            ->join('courses', 'courses.id', '=', 'enrollments.course_id')
            ->groupBy('courses.id', 'courses.name')
            ->orderByDesc('total_students')
            ->get();
    }

    public function revenueByCourse()
    {
        return Enrollment::selectRaw('courses.name, SUM(enrollments.price_paid) as total_revenue')
            ->join('courses', 'courses.id', '=', 'enrollments.course_id')
            ->groupBy('courses.id', 'courses.name')
            ->get();
    }
}