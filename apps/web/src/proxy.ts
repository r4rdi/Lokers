import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // Inisialisasi Supabase Client untuk Server Edge
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Verifikasi Sesi Pengguna dari Supabase Auth
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Daftar rute yang memerlukan Autentikasi Login
    const protectedRoutes = [
        '/dashboard',
        '/jobs',
        '/upload',
        '/review',
        '/customize',
        '/builder',
    ];

    const isProtectedRoute = protectedRoutes.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );

    // Pengalihan otomatis ke halaman signin jika belum terautentikasi
    if (isProtectedRoute && !user) {
        const redirectUrl = new URL('/signin', request.url);
        redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Mengecualikan file statis dan aset media dari proses eksekusi Proxy
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};