import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pago Exitoso - Mi Primer Trabajo Corporate",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
