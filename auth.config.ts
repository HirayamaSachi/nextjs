import { signIn } from "./auth";
import type { NextAuthConfig } from "next-auth";
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/dashboard/login'
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            console.log("this is auth.config.ts")
            const isLoggedIn = !!auth?.user
            const isOnDashBoard = nextUrl.pathname.startsWith('/dashboard')
            if(nextUrl.pathname == "dashboard/login" && isLoggedIn) {
                console.log('aa')
                return Response.redirect(new URL('/dashboard', nextUrl))
            }
            if(isOnDashBoard) {
                if(isLoggedIn)return true
                return false
            } else if (isLoggedIn) {
                return { redirect: { destination: '/dashboard', permanent: false } }
            }
            return true
        }
    },
    providers: [

    ]
}