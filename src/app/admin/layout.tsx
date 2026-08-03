export const metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Wrapper passthrough : /admin/login n'a pas de sidebar, les écrans du
  // dashboard en ont une via admin/(dashboard)/layout.tsx. La protection
  // par session est assurée par src/proxy.ts (redirection vers /admin/login).
  return <>{children}</>;
}
