import React from "react";
import Header from "./Header";

export default function MainLayout({
  notBanner,
  children,
}: {
  notBanner?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="dark">
      <Header notBanner={notBanner} />
      {children}
    </div>
  );
}
