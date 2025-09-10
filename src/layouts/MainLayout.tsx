import React from "react";
type MainLayoutProps = {
  children: React.ReactNode;
};
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
     
      <main className="flex-1">{children}</main>
    </div>
  );
}
