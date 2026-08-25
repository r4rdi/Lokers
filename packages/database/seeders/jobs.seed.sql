INSERT INTO scraped_jobs (source_platform, source_url, company_name, job_title, location, salary_range, required_skills, raw_description)
VALUES
-- Software Development
('Jobstreet', 'https://jobstreet.co.id/job/101', 'PT Teknologi Nusantara Digital', 'Junior Backend Developer', 'Jakarta (Hybrid)', 'Rp6.000.000 - Rp8.500.000', 
 ARRAY['Node.js', 'PostgreSQL', 'REST API', 'Git', 'Docker'], 
 'Membangun scalable backend API menggunakan Node.js dan Express, mengoptimasi relational database PostgreSQL, dan integrasi caching Redis.'),

('Glints', 'https://glints.com/id/opportunities/jobs/102', 'PT Digital Kreatif Solusindo', 'Frontend Developer', 'Yogyakarta (Onsite)', 'Rp5.000.000 - Rp7.500.000', 
 ARRAY['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Git'], 
 'Mengembangkan user interface modern dan responsif menggunakan React, TypeScript, dan Tailwind CSS, serta mengoptimalkan web vitals.'),

('Jobstreet', 'https://jobstreet.co.id/job/103', 'PT Inovasi Finansial Asia', 'Fullstack Web Engineer', 'Bandung (Remote)', 'Rp8.000.000 - Rp12.000.000', 
 ARRAY['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'], 
 'Mengelola siklus penuh pengembangan aplikasi web fintech, dari perancangan arsitektur database relasional hingga antarmuka pengguna.'),

-- AI & Data
('Jobstreet', 'https://jobstreet.co.id/job/104', 'PT Data Cendekia Utama', 'Junior Data Analyst', 'Jakarta', 'Rp6.500.000 - Rp9.000.000', 
 ARRAY['Python', 'SQL', 'Tableau', 'Excel', 'Data Visualization'], 
 'Mengekstraksi insight bisnis melalui querying SQL kompleks, pemodelan data prediktif sederhana dengan Python, dan visualisasi dashboard.'),

-- IoT & Embedded Systems
('Glints', 'https://glints.com/id/opportunities/jobs/105', 'PT Smart Systems Indonesia', 'IoT Firmware Engineer', 'Surabaya (Onsite)', 'Rp5.500.000 - Rp8.000.000', 
 ARRAY['ESP32', 'C/C++', 'MQTT', 'Python', 'Arduino'], 
 'Mengembangkan firmware microcontroller ESP32/STM32, integrasi protokol MQTT ke cloud server, dan perancangan sensor board monitoring.'),

-- UI/UX Design
('Jobstreet', 'https://jobstreet.co.id/job/106', 'PT Kreasi Solusi Antarmuka', 'UI/UX Designer', 'Jakarta Selatan', 'Rp5.500.000 - Rp7.500.000', 
 ARRAY['Figma', 'Prototyping', 'User Research', 'Design System', 'Wireframing'], 
 'Merancang user flow, wireframe, high-fidelity UI design, serta mengelola design system terpadu untuk aplikasi mobile dan web.');