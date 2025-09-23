import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Heart, Users, CheckCircle, ArrowRight } from "lucide-react"

const safetyFeatures = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "All content analysis happens locally on your device. We never store or transmit your child's browsing data.",
    highlight: "Zero Data Collection"
  },
  {
    icon: Lock,
    title: "Secure by Design",
    description: "Military-grade encryption protects all settings and configurations from tampering or unauthorized access.",
    highlight: "Bank-Level Security"
  },
  {
    icon: Heart,
    title: "Child Psychology Focused",
    description: "Developed with child psychologists to ensure protection doesn't interfere with healthy digital development.",
    highlight: "Expert Approved"
  },
  {
    icon: Users,
    title: "Family Centered",
    description: "Designed for busy parents who want comprehensive protection without complex setup or ongoing maintenance.",
    highlight: "Parent Friendly"
  }
]

const stats = [
  { number: "50,000+", label: "Families Protected", icon: Users },
  { number: "99.8%", label: "Accuracy Rate", icon: CheckCircle },
  { number: "24/7", label: "Real-time Protection", icon: Shield },
  { number: "0", label: "False Positives", icon: Lock }
]

export default function Safety() {
  const handleGetStarted = () => {
    console.log('Get started triggered')
    // TODO: remove mock functionality - replace with actual onboarding flow
  }

  const handleContactSupport = () => {
    console.log('Contact support triggered')
    // TODO: remove mock functionality - replace with actual support contact
  }

  return (
    <section id="safety" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-safety">
            Trusted Protection
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="text-safety-title">
            Built for Families,
            <span className="block text-primary">Trusted by Parents</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-safety-subtitle">
            Every feature of SafeBrowse is designed with your family's safety, privacy, and peace of mind as our top priority.
          </p>
        </div>

        {/* Safety Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {safetyFeatures.map((feature, index) => (
            <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-safety-${index}`}>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs" data-testid={`badge-safety-highlight-${index}`}>
                    {feature.highlight}
                  </Badge>
                </div>
                <CardTitle className="text-xl" data-testid={`text-safety-title-${index}`}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed" data-testid={`text-safety-description-${index}`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-background rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8" data-testid="text-stats-title">
            Protecting Families Worldwide
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2" data-testid={`stat-${index}`}>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mx-auto">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary" data-testid={`stat-number-${index}`}>
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground" data-testid={`stat-label-${index}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary to-primary/80 rounded-lg p-12 text-white">
          <h3 className="text-3xl font-bold mb-4" data-testid="text-cta-title">
            Ready to Protect Your Family?
          </h3>
          <p className="text-xl mb-8 text-blue-100" data-testid="text-cta-subtitle">
            Join thousands of families who trust SafeBrowse to keep their children safe online.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-white text-primary hover:bg-white/90"
              data-testid="button-get-started"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleContactSupport}
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur"
              data-testid="button-contact-support"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}