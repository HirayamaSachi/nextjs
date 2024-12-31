// import type { NextAuthConfig, Session, User } from "./next-auth";
import type { NextAuthConfig, Session } from "../node_modules/next-auth/index";
import { redirect } from "../node_modules/next/navigation";
import { NextRequest, NextResponse } from "../node_modules/next/server";
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/dashboard/login'
    },
    callbacks: {
        authorized({auth, request}:{auth:Session | null , request:NextRequest}) {
            const isLoggedIn = !!auth?.user
            if (request.nextUrl.pathname == "/dashboard/login" && isLoggedIn) {
                return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
            }
            if(request.nextUrl.pathname == "/dashboard") {
                if(isLoggedIn) {
                    return true
                } else {
                    return NextResponse.redirect(new URL('/dashboard/login', request.nextUrl))
                }
            }
            return true
        }
    },
    providers: [

    ]
}