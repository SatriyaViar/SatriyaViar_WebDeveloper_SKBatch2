<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class RecruitmentPageTest extends TestCase
{
    public function test_landing_shows_exactly_the_three_example_roles(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Recruitment/Index')
                ->has('roles', 3)
                ->where('roles.0.slug', 'frontend-developer')
                ->where('roles.1.slug', 'ui-ux-designer')
                ->where('roles.2.slug', 'quality-assurance-intern'));
    }

    public function test_each_application_route_only_shows_its_matching_role(): void
    {
        foreach ([
            'frontend-developer' => 'Frontend Developer',
            'ui-ux-designer' => 'UI/UX Designer',
            'quality-assurance-intern' => 'Quality Assurance Intern',
        ] as $slug => $title) {
            $this->get("/lamaran/{$slug}")
                ->assertOk()
                ->assertInertia(fn (Assert $page) => $page
                    ->component('Recruitment/Application')
                    ->where('role.slug', $slug)
                    ->where('role.title', $title));
        }
    }

    public function test_unknown_role_returns_not_found(): void
    {
        $this->get('/lamaran/tidak-ada')->assertNotFound();
    }

    public function test_prototype_has_no_file_serving_or_submission_routes(): void
    {
        $this->assertFalse(Route::has('storage.local.upload'));
        $this->assertFalse(Route::has('storage.local'));

        $this->put('/storage/cv.pdf')->assertNotFound();
        $this->post('/lamaran/frontend-developer')->assertMethodNotAllowed();
    }
}
