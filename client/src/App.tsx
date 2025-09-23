import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { queryClient } from "./lib/queryClient"

import Header from "./components/Header"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Technology from "./components/Technology"
import Safety from "./components/Safety"
import Footer from "./components/Footer"

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Hero />
            <Features />
            <Technology />
            <Safety />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  )
}
