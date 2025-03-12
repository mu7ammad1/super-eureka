import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    // التحقق من المتغيرات البيئية
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error("Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY) are not set.");
    }

    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
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
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // جلب معلومات المستخدم
    const { data: user, error: userError } = await supabase.auth.getUser();

    // حماية المسارات التي تبدأ بـ /account/*
    if (request.nextUrl.pathname.startsWith("/account") && userError) {
      // إذا لم يكن المستخدم مصادقًا، أعده إلى صفحة تسجيل الدخول
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // السماح بالوصول لجميع الصفحات الأخرى بغض النظر عن حالة المصادقة
    return response;

  } catch (e) {
    console.error("Failed to process session:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};