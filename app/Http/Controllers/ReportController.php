<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function totalInvestedByStudent()
    {
        $data = DB::table('enrollments')
            ->join('students', 'enrollments.student_id', '=', 'students.id')
            ->select('students.name', DB::raw('SUM(enrollments.price_paid) as total_invested'))
            ->groupBy('students.id', 'students.name')
            ->get();

        return response()->json($data);
    }

    public function topCourses()
    {
        $data = DB::table('enrollments')
            ->join('courses', 'enrollments.course_id', '=', 'courses.id')
            ->select('courses.name', DB::raw('COUNT(enrollments.id) as total_students'))
            ->groupBy('courses.id', 'courses.name')
            ->orderByDesc('total_students')
            ->get();

        return response()->json($data);
    }

    public function revenueByCourse()
    {
        $data = DB::table('enrollments')
            ->join('courses', 'enrollments.course_id', '=', 'courses.id')
            ->select('courses.name', DB::raw('SUM(enrollments.price_paid) as total_revenue'))
            ->groupBy('courses.id', 'courses.name')
            ->get();

        return response()->json($data);
    }
}
