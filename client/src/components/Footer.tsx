import { Shield } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleLinkClick = (section: string) => {
    console.log(`Footer link clicked: ${section}`)
    // TODO: remove mock functionality - replace with actual navigation
  }

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">SafeBrowse</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-footer-description">
              AI-powered parental control browser that protects children from harmful online content 
              while preserving their digital innocence.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold" data-testid="text-footer-product">Product</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <button 
                onClick={() => handleLinkClick('features')} 
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-footer-features"
              >
                Features
              </button>
              <button 
                onClick={() => handleLinkClick('technology')} 
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-footer-technology"
              >
                Technology
              </button>
              <button 
                onClick={() => handleLinkClick('security')} 
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-footer-security"
              >
                Security
              </button>
              <button 
                onClick={() => handleLinkClick('pricing')} 
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-footer-pricing"
              >
                Pricing
              </button>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold" data-testid="text-footer-support">Support</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <button 
                onClick={() => handleLinkClick('help')} 
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-footer-help"
              >
                Help Center
              </button>
              <button 
                onClick={() => handleLinkClick('contact')} 
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-footer-contact"
              >
                Contact Us
              </button>
              <button 
                onClick={() => handleLinkClick('community')} 
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-footer-community"
              >
                Community
              </button>
              <button 
                onClick={() => handleLinkClick('status')} 
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-footer-status"
              >
                System Status
              </button>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold" data-testid="text-footer-legal">Legal</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <button 
                onClick={() => handleLinkClick('privacy')} 
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-footer-privacy"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleLinkClick('terms')} 
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-footer-terms"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => handleLinkClick('cookies')} 
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-footer-cookies"
              >
                Cookie Policy
              </button>
              <button 
                onClick={() => handleLinkClick('compliance')} 
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-footer-compliance"
              >
                Compliance
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm" data-testid="text-footer-copyright">
            © {currentYear} SafeBrowse. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0" data-testid="text-footer-tagline">
            Protecting digital innocence with AI technology.
          </p>
        </div>
      </div>
    </footer>
  )
}