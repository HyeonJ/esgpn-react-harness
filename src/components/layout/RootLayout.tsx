import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";

export function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
