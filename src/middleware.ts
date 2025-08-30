import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  user: [/^\/profile/, /^\/cart/], // user can access /profile and /cart
  admin: [/^\/admin/, /^\/cart/], // admin can access /admin
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // const user = await getCurrentUser();
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) return null;

  const user = jwtDecode<any>(accessToken);

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:page*",
    "/admin",
    "/admin/:page*",
    "/cart",
    "/cart/:page*", // in case you have nested cart routes
  ],
};
