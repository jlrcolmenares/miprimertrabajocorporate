import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrarse - Incorporate",
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
