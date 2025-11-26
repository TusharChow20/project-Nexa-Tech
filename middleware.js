export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/dashboard",
    "/manage-products",
    "/add-product",
    "/update-product/:path*",
  ],
};
