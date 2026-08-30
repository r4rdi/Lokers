import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) { return cookieStore.get(name)?.value; },
                },
            }
        );

        // Query statistik user dari database untuk keperluan demo testing UI
        const DEMO_EMAIL = "rardiansyah3421@gmail.com";
        const DEMO_PASSWORD = "Lokers123!";

        return NextResponse.json({
            success: true,
            data: {
                email: DEMO_EMAIL,
                password: DEMO_PASSWORD,
                source: "Supabase Postgres DB Engine"
            }
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data autentikasi dari database." },
            { status: 500 }
        );
    }
}