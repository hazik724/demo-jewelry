import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "sonner";
import PageWrapper from "@/components/PageWrapper";
function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div>

        <Navbar/>
        <Toaster
  position="bottom-right"
  toastOptions={{
    style: {
      background: "#000",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.2)",
      padding: "16px 20px",
      fontSize: "12px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
    },
  }}
/>
        <main><PageWrapper>{children}</PageWrapper></main>
        <Footer/>
  </div>
    )
}
export default Layout;