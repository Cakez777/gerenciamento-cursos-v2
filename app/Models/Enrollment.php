<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'course_id', 'start_date', 'price_paid', 'status'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    protected $casts = [
        'start_date' => 'date',
        'price_paid' => 'decimal:2',
        'status' => 'string'
    ];
}