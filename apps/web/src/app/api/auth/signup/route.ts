import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { email, password, fullName } = await request.json();

        // Validasi Password
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return NextResponse.json(
                { error: 'Password harus minimal 8 karakter, mengandung huruf kapital, angka, dan simbol.' },
                { status: 400 }
            );
        }

        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { cookies: { getAll: () => cookieStore.getAll() } }
        );

        // 1. Sign Up User via Supabase Auth (Otomatis mengirimkan OTP/Token via Email)
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName },
            },
        });

        if (authError) {
            return NextResponse.json({ error: authError.message }, { status: 400 });
        }

        return NextResponse.json({
            message: 'Kode verifikasi telah dikirim ke email Anda.',
            email,
        });
    } catch (err: any) {
        return NextResponse.json({ error: 'Terjadi kesalahan server: ' + err.message }, { status: 500 });
    }
}