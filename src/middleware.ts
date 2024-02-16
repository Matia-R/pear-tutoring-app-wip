import { authMiddleware } from "@clerk/nextjs";


export default authMiddleware({
    publicRoutes: ["/", "/api/webhooks/(.*)", "/pricing", "/become-a-tutor"],
})

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};