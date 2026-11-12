<?php

return [
    'roles' => [
        'frontend-developer' => [
            'slug' => 'frontend-developer',
            'title' => 'Frontend Developer',
            'department' => 'Engineering',
            'location' => 'Remote',
            'employmentType' => 'Full-time',
            'summary' => 'Membangun antarmuka website yang responsif dan aksesibel.',
            'responsibilities' => [
                'Membangun halaman web dari rancangan antarmuka.',
                'Menjaga tampilan tetap nyaman di desktop dan mobile.',
                'Memeriksa aksesibilitas dan memperbaiki masalah antarmuka.',
            ],
            'skills' => [
                'HTML dan CSS untuk struktur serta tata letak.',
                'JavaScript untuk interaksi antarmuka.',
                'Dasar aksesibilitas, termasuk navigasi keyboard.',
            ],
        ],
        'ui-ux-designer' => [
            'slug' => 'ui-ux-designer',
            'title' => 'UI/UX Designer',
            'department' => 'Product & Design',
            'location' => 'Jakarta Hybrid',
            'employmentType' => 'Full-time',
            'summary' => 'Merancang alur pengguna dan antarmuka berdasarkan kebutuhan pengguna.',
            'responsibilities' => [
                'Memetakan kebutuhan dan alur pengguna.',
                'Membuat wireframe dan prototipe di Figma.',
                'Merapikan komponen dan menjelaskan keputusan desain.',
            ],
            'skills' => [
                'Figma untuk desain antarmuka dan prototipe.',
                'User flow dan wireframe.',
                'Dasar hierarki visual dan aksesibilitas.',
            ],
        ],
        'quality-assurance-intern' => [
            'slug' => 'quality-assurance-intern',
            'title' => 'Quality Assurance Intern',
            'department' => 'Engineering',
            'location' => 'Remote',
            'employmentType' => 'Internship',
            'summary' => 'Menguji fitur website dan menulis laporan bug yang jelas.',
            'responsibilities' => [
                'Menyiapkan skenario dari kebutuhan fitur.',
                'Menguji alur normal, input tidak valid, dan kasus tepi.',
                'Mencatat langkah reproduksi serta hasil pengujian.',
            ],
            'skills' => [
                'Dasar pengujian manual.',
                'Menulis laporan bug yang runtut.',
                'Ketelitian dalam membandingkan hasil dengan kebutuhan.',
            ],
        ],
    ],
];
