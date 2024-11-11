<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;

class DemCompany implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $stateCity = Http::get('http://42.1.112.39/api/Wrapper/Book/StateCityNew')->json();
        if (!empty($stateCity)) {
            $newKeyTo = array_column($stateCity, 'newKey');
            $newKeyFrom = array_column($stateCity, 'newKey');
            $companyCount = 0;
            foreach ($newKeyTo as $keyTo => $valueTo) {
                foreach ($newKeyFrom as $keyFrom => $valueFrom) {
                    $response = Http::post('http://42.1.112.39/api/Wrapper/Book/RouteStatistic', [
                        "newKeyFrom" => $valueFrom,
                        "newKeyTo" => $valueTo,
                        "date" => "12-11-2024",
                        "timeMin" => "00:00",
                        "timeMax" => "23:59",
                        "sort" => "time:asc"
                    ])->json();
                    
                    
                    if (!empty($response['data']['companies']['data'])) {
                        $companyCount += count($response['data']['companies']['data']);
                    }
                }
            }
            file_put_contents('company_count.txt', $companyCount);
        }
    }
}
