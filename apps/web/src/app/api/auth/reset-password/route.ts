import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { email, token, newPassword } = await request.json();

        // Validasi Kompleksitas Password Baru
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return NextResponse.json(
                { error: 'Password baru harus minimal 8 karakter, mengandung huruf kapital, angka, dan simbol.' },
                { status: 400 }
            );
        }

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

        // 1. Verifikasi OTP untuk pemulihan password
        const { error: verifyError } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'recovery',
        });

        if (verifyError) {
            return NextResponse.json({ error: 'Kode OTP salah atau telah kadaluwarsa.' }, { status: 400 });
        }

        // 2. Perbarui Password Pengguna
        const { error: updateError } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (updateError) {
            return NextResponse.json({ error: updateError.message }, { status: 400 });
        }

        return NextResponse.json({ message: 'Password berhasil diperbarui. Silakan login kembali.' });
    } catch (err: any) {
        return NextResponse.json({ error: 'Terjadi kesalahan: ' + err.message }, { status: 500 });
    }
}