import { Button } from "@/components/ui/button"
import { Shield, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleDownload = () => {
    console.log('Download SafeBrowse triggered')
    // TODO: remove mock functionality - replace with actual download logic
  }

  const handleDemo = () => {
    console.log('Request Demo triggered')
    // TODO: remove mock functionality - replace with actual demo request
  }

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">SafeBrowse</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-features">
              Features
            </a>
            <a href="#technology" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-technology">
              Technology
            </a>
            <a href="#safety" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-safety">
              Safety
            </a>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={handleDemo} data-testid="button-demo">
              Request Demo
            </Button>
            <Button onClick={handleDownload} data-testid="button-download">
              Download SafeBrowse
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-features-mobile">
                Features
              </a>
              <a href="#technology" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-technology-mobile">
                Technology
              </a>
              <a href="#safety" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-safety-mobile">
                Safety
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" onClick={handleDemo} data-testid="button-demo-mobile">
                  Request Demo
                </Button>
                <Button onClick={handleDownload} data-testid="button-download-mobile">
                  Download SafeBrowse
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}