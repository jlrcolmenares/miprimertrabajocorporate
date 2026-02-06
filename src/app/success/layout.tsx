import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pago Exitoso - Incorporate",
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
