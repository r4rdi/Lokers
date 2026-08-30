import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { email, token } = await request.json();

        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll: () => cookieStore.getAll(),
                    setAll: (cookiesToSet) => {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    },
                },
            }
        );

        // Verifikasi Token OTP Email
        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'signup',
        });

        if (error) {
            return NextResponse.json({ error: 'Kode verifikasi tidak valid atau telah kedaluwarsa.' }, { status: 400 });
        }

        // Inisialisasi profil pengguna ke tabel user_profiles
        if (data.user) {
            await supabase.from('user_profiles').insert({
                user_id: data.user.id,
                full_name: data.user.user_metadata?.full_name || '',
            });
        }

        return NextResponse.json({ message: 'Verifikasi berhasil! Akun Anda telah aktif.' });
    } catch (err: any) {
        return NextResponse.json({ error: 'Terjadi kesalahan: ' + err.message }, { status: 500 });
    }
}