import Container from "@/src/components/UI/Container";
import Sidebar from "@/src/components/UI/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div className="my-3 flex w-full gap-12 flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-2/5">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-4/5">{children}</div>
      </div>
    </Container>
  );
}
