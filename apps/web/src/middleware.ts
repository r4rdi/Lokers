import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server'; // Ubah 'next' menjadi 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: { headers: request.headers },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    response = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    // Rute privat yang membutuhkan proteksi login
    const protectedRoutes = ['/dashboard', '/jobs', '/upload', '/review', '/customize'];
    const isProtectedRoute = protectedRoutes.some(path => request.nextUrl.pathname.startsWith(path));

    if (isProtectedRoute && !user) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return response;
}

export const config = {
    matcher: ['/dashboard/:path*', '/jobs/:path*', '/upload/:path*', '/review/:path*', '/customize/:path*'],
};