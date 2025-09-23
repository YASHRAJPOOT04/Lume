import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, XCircle, ArrowRight } from "lucide-react"
import browserMockup from "@assets/generated_images/Browser_content_filtering_interface_181458f0.png"

const contentMetrics = [
  { category: "Pornographic Content", accuracy: 99.9, blocked: 2847, color: "bg-red-500" },
  { category: "Gambling Sites", accuracy: 99.5, blocked: 1234, color: "bg-orange-500" },
  { category: "Violence & Gore", accuracy: 98.8, blocked: 892, color: "bg-red-600" },
  { category: "Inappropriate Language", accuracy: 97.2, blocked: 5623, color: "bg-yellow-500" },
  { category: "Social Media Risks", accuracy: 96.8, blocked: 1567, color: "bg-blue-500" },
  { category: "Malware & Phishing", accuracy: 99.7, blocked: 423, color: "bg-purple-500" }
]

export default function Technology() {
  const handleLearnMore = () => {
    console.log('Learn more about technology triggered')
    // TODO: remove mock functionality - replace with actual technology details page
  }

  return (
    <section id="technology" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-technology">
            AI Technology
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="text-technology-title">
            How Our AI
            <span className="block text-primary">Protects Your Child</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-technology-subtitle">
            Our advanced artificial intelligence analyzes content across multiple dimensions, 
            ensuring comprehensive protection while maintaining a seamless browsing experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Browser Mockup */}
          <div className="order-2 lg:order-1">
            <Card className="overflow-hidden shadow-lg" data-testid="card-browser-demo">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
                <CardTitle className="flex items-center gap-2" data-testid="text-browser-title">
                  <CheckCircle className="h-5 w-5" />
                  SafeBrowse Protection Active
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <img 
                  src={browserMockup} 
                  alt="SafeBrowse browser interface showing content filtering" 
                  className="w-full h-auto"
                  data-testid="img-browser-interface"
                />
              </CardContent>
            </Card>
          </div>

          {/* Technology Explanation */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold" data-testid="text-realtime-analysis">Real-Time Content Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every webpage, image, and video is instantly analyzed using our proprietary AI models 
                trained on millions of content samples. Our system identifies harmful material with 
                industry-leading accuracy.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold" data-testid="text-multi-layer">Multi-Layer Protection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our technology stack combines computer vision, natural language processing, and 
                behavioral analysis to create multiple protective barriers that work together seamlessly.
              </p>
            </div>

            <Button onClick={handleLearnMore} data-testid="button-learn-technology">
              Learn More About Our Technology
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Metrics */}
        <div className="bg-muted/50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8" data-testid="text-metrics-title">
            Protection Metrics Across Content Categories
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentMetrics.map((metric, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-metric-${index}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between" data-testid={`text-metric-category-${index}`}>
                    {metric.category}
                    <Badge variant="outline" className="text-xs" data-testid={`badge-accuracy-${index}`}>
                      {metric.accuracy}% accurate
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Detection Accuracy</span>
                      <span className="font-medium" data-testid={`text-accuracy-${index}`}>
                        {metric.accuracy}%
                      </span>
                    </div>
                    <Progress 
                      value={metric.accuracy} 
                      className="h-2" 
                      data-testid={`progress-accuracy-${index}`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Content Blocked</span>
                    <span className="font-medium text-primary" data-testid={`text-blocked-${index}`}>
                      {metric.blocked.toLocaleString()}+
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}