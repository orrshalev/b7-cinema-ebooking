import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"
// export { default } from "next-auth/middleware"

export default withAuth(
    function middleware (req: NextRequest) {
        console.log(req.url)
        return NextResponse.rewrite(new URL("/browse/admin", req.url))
    },
    {
        callbacks: {
            authorized({token}){
                console.log(token?.isAdmin)
                return token?.isAdmin === true
            },
        },
    }
)

export const config = {matcher: ['/browse/admin'] }