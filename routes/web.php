<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Recruitment/Index', [
    'roles' => array_values(config('recruitment.roles')),
]));

Route::get('/lamaran/{slug}', function (string $slug) {
    $role = config("recruitment.roles.{$slug}");

    abort_unless($role, 404);

    return Inertia::render('Recruitment/Application', ['role' => $role]);
});
