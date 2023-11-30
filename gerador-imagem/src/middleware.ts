// Exemplo de configuração do middleware
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Configuração do middleware
  publicRoutes: ["/"],
});

export const config = {
  // Configuração do matcher
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
