import { signIn } from "./auth";
import type { NextAuthConfig, Session, User } from "next-auth";
import { NextRequest, NextResponse } from "./node_modules/next/server";
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/dashboard/login'
    },
    callbacks: {
        authorized({auth, request}:{auth:Session | null , request:NextRequest}) {
            const isLoggedIn = !!auth?.user
            const isOnDashBoard = request.nextUrl.pathname.startsWith('/dashboard')
            if (request.nextUrl.pathname == "dashboard/login" && isLoggedIn) {
                return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
            }
            return true
        }
    },
    providers: [

    ]
}