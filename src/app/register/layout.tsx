import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrarse - Mi Primer Trabajo Corporate",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
