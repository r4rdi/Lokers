import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { cookies: { getAll: () => cookieStore.getAll() } }
        );

        // Kirimkan OTP untuk pemulihan akun
        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: 'Kode OTP pemulihan telah dikirim ke email Anda.' });
    } catch (err: any) {
        return NextResponse.json({ error: 'Terjadi kesalahan: ' + err.message }, { status: 500 });
    }
}