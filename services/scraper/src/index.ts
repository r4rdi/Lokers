import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { extractSkillsFromText } from './extractors/skills.extractor';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

async function runManualIngestion() {
  console.log('[Scraper] Memulai proses sinkronisasi lowongan...');

  // Contoh payload scraping dari spider
  const sampleScrapedData = [
    {
      source_platform: 'Jobstreet',
      source_url: 'https://jobstreet.co.id/job/sample-201',
      company_name: 'PT Inovasi Media Cloud',
      job_title: 'Cloud DevOps Engineer',
      location: 'Jakarta (Remote)',
      salary_range: 'Rp10.000.000 - Rp15.000.000',
      raw_description: 'Mencari Cloud Engineer yang menguasai Docker, Kubernetes, CI/CD pipeline, AWS, dan automasi Linux bash script.',
    }
  ];

  for (const item of sampleScrapedData) {
    const skills = extractSkillsFromText(item.raw_description);

    const { error } = await supabase
      .from('scraped_jobs')
      .upsert(
        {
          ...item,
          required_skills: skills,
          scraped_at: new Date().toISOString(),
        },
        { onConflict: 'source_url' } // Deduplication berdasarkan source_url
      );

    if (error) {
      console.error(`[Scraper] Gagal menyimpan ${item.job_title}:`, error.message);
    } else {
      console.log(`[Database] Berhasil sinkronisasi: ${item.job_title} (${skills.join(', ')})`);
    }
  }

  console.log('[Scraper] Sinkronisasi selesai!');
}

runManualIngestion();