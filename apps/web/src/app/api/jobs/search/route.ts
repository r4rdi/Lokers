import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const location = searchParams.get('location') || '';

    // 1. Query dasar dari database Supabase
    let dbQuery = supabase
      .from('scraped_jobs')
      .select('id, job_title, company_name, location, salary_range, required_skills, raw_description, scraped_at')
      .eq('is_active', true)
      .order('scraped_at', { ascending: false });

    // Filter teks jika pengguna mengetik kata kunci pencarian
    if (query) {
      dbQuery = dbQuery.or(`job_title.ilike.%${query}%,company_name.ilike.%${query}%,raw_description.ilike.%${query}%`);
    }

    if (location) {
      dbQuery = dbQuery.ilike('location', `%${location}%`);
    }

    const { data: jobs, error } = await dbQuery;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      total: jobs?.length || 0,
      data: jobs || [],
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Terjadi kesalahan pada server saat mengambil lowongan' },
      { status: 500 }
    );
  }
}