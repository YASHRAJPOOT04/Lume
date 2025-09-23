import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Brain, Clock, Database, Users } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Real-Time Content Monitoring",
    description: "Our AI continuously scans and analyzes web content as your child browses, providing instant protection against harmful material.",
    badge: "Core Feature"
  },
  {
    icon: Brain,
    title: "Advanced AI Assessment",
    description: "Machine learning algorithms evaluate content across multiple metrics including pornography, gambling, violence, and other harmful categories.",
    badge: "AI-Powered"
  },
  {
    icon: Eye,
    title: "Comprehensive Content Analysis",
    description: "Deep content understanding analyzes text, images, videos, and website context to make intelligent filtering decisions.",
    badge: "Multi-Modal"
  },
  {
    icon: Database,
    title: "Extensive Knowledge Database",
    description: "Our constantly updated database of harmful content patterns ensures the latest threats are identified and blocked.",
    badge: "Always Updated"
  },
  {
    icon: Clock,
    title: "Instant Protection",
    description: "Zero-delay filtering means harmful content is blocked before it reaches your child's screen, maintaining their digital innocence.",
    badge: "Lightning Fast"
  },
  {
    icon: Users,
    title: "Family-Friendly Dashboard",
    description: "Easy-to-use parental controls and detailed reports help you understand and manage your child's online activities.",
    badge: "Parent Tools"
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-features">
            Comprehensive Protection
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="text-features-title">
            Advanced AI Protection
            <span className="block text-primary">For Every Family</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-features-subtitle">
            Our cutting-edge technology combines artificial intelligence with comprehensive content 
            databases to create an impenetrable shield around your child's online experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-feature-${index}`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs" data-testid={`badge-feature-${index}`}>
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl" data-testid={`text-feature-title-${index}`}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed" data-testid={`text-feature-description-${index}`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}