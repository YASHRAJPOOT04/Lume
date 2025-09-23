import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowRight, Play } from "lucide-react"
import heroImage from "@assets/generated_images/Family_safely_using_technology_together_7a95292a.png"

export default function Hero() {
  const handleJoinWaitlist = () => {
    console.log('Join Waitlist triggered from hero')
    // TODO: remove mock functionality - replace with actual waitlist logic
  }

  const handleWatchDemo = () => {
    console.log('Watch Demo triggered')
    // TODO: remove mock functionality - replace with actual demo video
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Family safely using technology together" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30" data-testid="badge-ai-powered">
            <Shield className="w-4 h-4 mr-2" />
            AI-Powered Protection
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" data-testid="text-hero-headline">
            Protect Your Child's
            <span className="block text-blue-200">Digital Innocence</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
            Advanced AI monitors content in real-time, preventing children from accessing harmful material 
            including pornography, gambling, and violence. Our extensive knowledge database and intelligent 
            assessment work together to keep kids safe online.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              onClick={handleJoinWaitlist}
              className="bg-white text-primary hover:bg-white/90 border-white/20"
              data-testid="button-join-waitlist-hero"
            >
              Join Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleWatchDemo}
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur"
              data-testid="button-watch-demo"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-200 text-sm">
            <div className="flex items-center gap-2" data-testid="text-trust-families">
              <Shield className="w-4 h-4" />
              Trusted by 50,000+ families
            </div>
            <div className="hidden sm:block w-px h-4 bg-blue-200/30" />
            <div className="flex items-center gap-2" data-testid="text-trust-accuracy">
              <Shield className="w-4 h-4" />
              99.8% content filtering accuracy
            </div>
            <div className="hidden sm:block w-px h-4 bg-blue-200/30" />
            <div className="flex items-center gap-2" data-testid="text-trust-realtime">
              <Shield className="w-4 h-4" />
              Real-time protection
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}