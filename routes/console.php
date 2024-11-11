<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

// Schedule::call(function() {
//     $stateCity = Http::get('http://42.1.112.39/api/Wrapper/Book/StateCityNew')->json();
//     $newKeyTo = array_column($stateCity, 'newKey');
//     $newKeyFrom = array_column($stateCity, 'newKey');
//     $companyCount = 0;
//     foreach ($newKeyTo as $keyTo => $valueTo) {
//         foreach ($newKeyFrom as $keyFrom => $valueFrom) {
//             $response = Http::post('http://42.1.112.39/api/Wrapper/Book/RouteStatistic', [
//                 "newKeyFrom" => $valueFrom,
//                 "newKeyTo" => $valueTo,
//                 "date" => "12-11-2024",
//                 "timeMin" => "00:00",
//                 "timeMax" => "23:59",
//                 "sort" => "time:asc"
//             ])->json();
//             $companyCount += count($response['data']['companies']['data']);
//         }
//     }
//     file_put_contents(storage_path('app/company_count.txt'), $companyCount);
// })->hourly();
