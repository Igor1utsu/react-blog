export const URLS = {
  AuthLayout: [
    { path: "/login" },
    { path: "/phone-auth" },
    { path: "/register" },
  ],
  MainLayout: [
    { path: "/blog", requiredLogin: false },
    { path: "/favourites", requiredLogin: true },
    { path: "/bookmarks", requiredLogin: true },
    { path: "/settings", requiredLogin: true },
  ],
}
