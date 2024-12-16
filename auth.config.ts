import type { NextAuthConfig } from "./node_modules/next-auth/index";
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login'
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user
            const isOnDashBoard = nextUrl.pathname.startsWith('/dashboard')
            if(isOnDashBoard) {
                if(isLoggedIn)return true
                return false
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }
            return true
        }
    },
    providers: [

    ]
}