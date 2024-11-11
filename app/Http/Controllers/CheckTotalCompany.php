<?php

namespace App\Http\Controllers;

use App\Jobs\DemCompany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CheckTotalCompany extends Controller
{
    public function index()
    {
        $response = Http::withToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXAiOjEsImlkIjoxMTY5NjgsInVzciI6ImRhaWx5dmUuYWRtaW5AZ21haWwuY29tIiwiYWd0Ijo1MDUzNCwiY3BuIjoxLCJpc192eHJfYWNjb3VudCI6ZmFsc2UsImV4cCI6MTczMTMwMTMyNX0.dJgZ8fQv6Y-GeWHZA7gWnoKS9UUeszfVyztn9vjdKuk')
        ->get('https://api.vexere.com/v3/company/all')->json();

        return count($response['data']);
        // dispatch(new DemCompany());
    }
}
