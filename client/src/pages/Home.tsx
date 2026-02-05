/* Design: Kinetic Expressionism
 * - Diagonal compositions with angled section breaks
 * - Layered depth with floating cards and shadows
 * - Motion-driven interactions with elastic easing
 * - Gradient accents from electric blue to cyan
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  Award,
  BarChart3,
  Building2,
  CheckCircle2,
  Cloud,
  Globe,
  Layers,
  Rocket,
  ShoppingCart,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent! I'll respond within 24 hours.");
    (e.target as HTMLFormElement).reset();
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/Z8YHM18BnVZRZKa2YmBQhA-img-1_1770302064000_na1fn_aGVyby1iYWNrZ3JvdW5k.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9aN3IyREZLSWZaV3lVd3hOaVlOcC9zYW5kYm94L1o4WUhNMThCblZaUlpLYTJZbUJRaEEtaW1nLTFfMTc3MDMwMjA2NDAwMF9uYTFmbl9hR1Z5YnkxaVlXTnJaM0p2ZFc1ay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=k5xocQ-afXxGj-crCi0YChcACo5vKC9qXDodOkBOhDoNVjP-hPLAuvnctOmko~qxI1uPgsCWDh5mQWbq2bcKvDPnA70qJAd4dcJUuTgdHsRbtdi89QLMBfb1bdlQN6CLAnJWHNjkmVzicbcC00Bzr3~vlpTfpsxGjzPKubVHF-r485QZhzrSUOmf0j5atIJL-5pZTeWKyyI-~jA2f4xbmQZYcsvdwEozuhiUdHSYBAN6YtY9nRWppBwJhZvE0XTWhjcWC2DpkiPV90TdQQuiy7NbIjPtqv0smIYG1Ys6mBUoOPG0Xr4aN7UhK8LtJxg3wEiw-MdZHA9IJUySBf9nCw__')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/80 via-foreground/60 to-transparent"></div>
        <div className="container relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-extrabold text-background leading-tight">
              Digital Growth Strategist |{" "}
              <span className="gradient-text">
                eCommerce & Marketplace Expert
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-background/90 max-w-3xl mx-auto">
              Transforming businesses through data-driven digital commerce
              strategies across LATAM, Europe & North America
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8 py-6"
              >
                Schedule Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const element = document.getElementById("clients");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-background/10 backdrop-blur-sm border-background/30 text-background hover:bg-background/20 text-lg px-8 py-6"
              >
                View Case Studies
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-background/90 text-sm md:text-base pt-8">
              <div className="flex items-center gap-2">
                <Award className="text-secondary" size={20} />
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="text-secondary" size={20} />
                <span>100+ Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="text-secondary" size={20} />
                <span>Global Clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        data-animate
        className={`py-24 bg-background relative ${
          isVisible["about"] ? "animate-fade-in-up" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/Z8YHM18BnVZRZKa2YmBQhA-img-2_1770302075000_na1fn_YWJvdXQtc2VjdGlvbi1hY2NlbnQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9aN3IyREZLSWZaV3lVd3hOaVlOcC9zYW5kYm94L1o4WUhNMThCblZaUlpLYTJZbUJRaEEtaW1nLTJfMTc3MDMwMjA3NTAwMF9uYTFmbl9ZV0p2ZFhRdGMyVmpkR2x2YmkxaFkyTmxiblEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=QiNN-pWlLwwzo6fBpfgPrXaoH97LwYwtZbQt7g5DPy2Hor3eyLEVnadhk8FoO3Yw5cSP~ZPWoh34vAQP8M37J4tV5hv2UwJdr04C3kE1e6ySr9bSPKeh9-PNCnQ0eVDN5XtofT0oeuvS56NAV9m4H2DEsslQEVUW-YvWiOPIhpT2hUQjlLCvmgKOkpu3Tgm3qzD-2EN4VdjraNcg6ypc4ggNEumOqiAYIS2T5n-ZaAL3SLuqpxQEoqUWESSc1a7-cv~2IgRCN~n34J8n0u7r9mRT-PZ7QHEqYH50B2W4kL0IHV-Y9aCetWcB-LLahQHJSHFjElfHiRSSQ6PiYCHRBg__')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              About <span className="gradient-text">Juan Pablo</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A seasoned digital commerce expert with deep expertise in VTEX,
              global project leadership, and B2B/B2C strategy execution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="floating-card bg-card/80 backdrop-blur-sm border-2">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Target className="text-background" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Strategic Leadership</h3>
                <p className="text-muted-foreground">
                  Expert in team management, project execution, and
                  cross-functional collaboration across global markets
                </p>
              </CardContent>
            </Card>

            <Card className="floating-card bg-card/80 backdrop-blur-sm border-2">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Layers className="text-background" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Technical Excellence</h3>
                <p className="text-muted-foreground">
                  Platform integration, solution architecture, and seamless ERP
                  connectivity for enterprise clients
                </p>
              </CardContent>
            </Card>

            <Card className="floating-card bg-card/80 backdrop-blur-sm border-2">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <TrendingUp className="text-background" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Results-Driven</h3>
                <p className="text-muted-foreground">
                  Conversion optimization, growth hacking, and data-driven
                  strategies that deliver measurable ROI
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="floating-card bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed mb-6">
                  With over 15 years of experience in digital commerce, I
                  specialize in transforming businesses through strategic
                  eCommerce implementations and marketplace development. My
                  expertise spans the entire digital commerce ecosystem, from
                  platform selection and integration to conversion optimization
                  and growth strategy.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  As a former Product Manager and Partner Success leader at
                  VTEX, I've led global B2B lead generation initiatives across
                  16 sites in 9 languages, managed POC budgets for Tier 1/2
                  clients in the US and Europe, and built thriving partner
                  ecosystems across Latin America. My technical background
                  enables me to bridge the gap between business objectives and
                  technical implementation, ensuring seamless integration with
                  legacy systems and modern cloud infrastructure.
                </p>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Globe size={20} className="text-primary" />
                    <span className="font-semibold text-foreground">
                      Location:
                    </span>
                    Bogotá, Colombia
                  </div>
                  <div className="hidden md:block">|</div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-secondary" />
                    <span className="font-semibold text-foreground">
                      Available globally (remote)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        data-animate
        className={`diagonal-section py-24 bg-foreground text-background relative ${
          isVisible["services"] ? "animate-fade-in-up" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/Z8YHM18BnVZRZKa2YmBQhA-img-3_1770302061000_na1fn_c2VydmljZXMtYmFja2dyb3VuZA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9aN3IyREZLSWZaV3lVd3hOaVlOcC9zYW5kYm94L1o4WUhNMThCblZaUlpLYTJZbUJRaEEtaW1nLTNfMTc3MDMwMjA2MTAwMF9uYTFmbl9jMlZ5ZG1salpYTXRZbUZqYTJkeWIzVnVaQS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=uKMYZYH-HY1fy9sCHO1pxc7bE2VHWSCt8npY-7iLXtc5cyuoM-Baw~Diuw7mQK3w6BQooAdik6UoTZyiNgBWXyumkVQN4rkjEmBMePVDGIvKCU~SzVDGYEG7NuNSF0B30t68FNzCyx4yM-YHaVtqYZmTZyF~UtSLPLbLeYQecT0rWM671U-~FjJg2d~YHxTEJVN-VGvOhuXT9u2oOaBghximsNHYicjEHjy67JjhowGVX6slcMafJH9TXiW2FAE7umd4QZ8FNRnUUU3-pSTB-XjJ1AuHSSz6P3YflaL6IDDBC74vDWoUcoMcXJB11iJg-o1dNK8e55mAVmnzdU-GQw__')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Services & <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-xl text-background/80 max-w-3xl mx-auto">
              Comprehensive digital commerce solutions tailored to your business
              needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingCart,
                title: "eCommerce Strategy & Implementation",
                description:
                  "End-to-end eCommerce solutions using VTEX, Magento, and headless architectures. From platform selection to go-live support.",
              },
              {
                icon: TrendingUp,
                title: "Digital Growth & Lead Generation",
                description:
                  "B2B demand generation, conversion rate optimization, and data-driven growth strategies that scale your business.",
              },
              {
                icon: Cloud,
                title: "Platform Integration & Architecture",
                description:
                  "Seamless ERP, OMS, and cloud infrastructure integration. Expert in connecting legacy systems with modern platforms.",
              },
              {
                icon: Building2,
                title: "Marketplace Development & Management",
                description:
                  "Build and optimize multi-vendor marketplaces. Strategy, implementation, and ongoing management for D2C and B2B models.",
              },
              {
                icon: Users,
                title: "Partner Ecosystem Building",
                description:
                  "Develop strategic partnerships, manage implementation partners, and build thriving ecosystems across regions.",
              },
              {
                icon: BarChart3,
                title: "CRO & Performance Optimization",
                description:
                  "Conversion rate optimization, A/B testing, analytics implementation, and performance tuning for maximum ROI.",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="floating-card bg-background/10 backdrop-blur-md border-background/20 text-background"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="w-14 h-14 mb-4 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <service.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-background/80 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        data-animate
        className={`py-24 bg-background relative ${
          isVisible["experience"] ? "animate-fade-in-up" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/Z8YHM18BnVZRZKa2YmBQhA-img-4_1770302061000_na1fn_ZXhwZXJpZW5jZS10aW1lbGluZS1hY2NlbnQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9aN3IyREZLSWZaV3lVd3hOaVlOcC9zYW5kYm94L1o4WUhNMThCblZaUlpLYTJZbUJRaEEtaW1nLTRfMTc3MDMwMjA2MTAwMF9uYTFmbl9aWGh3WlhKcFpXNWpaUzEwYVcxbGJHbHVaUzFoWTJObGJuUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ZzzDFF4bxLwoWJuMpc9lbe06X52Ie~NjqSjFGxl5UvJ2MgzRUIEP4sKh~6aDow9ekFFm8Rjz--Ng6QTeRjDdCQ2-clbe7HyfLnQnJsy4rh~MiI8-0FiyhynhrfPRG1~hckbsJ-qZOLbeuhXi0hxuQwi3XaE9oy41YqjsHrSN7z2dDB8GpjMCNiiE6dAsFZZOO87j~3Jx0-jR3I7eG3B35oVchmlsIkSBh24xBxkcjSIa86R8UBkBzg9ScIdTIACobw1LK-Mui3ztsNnwZQszl0~a0RFFwNitgLRE6rNXSgYq2y0jd3clSK9Erxhmb2uYuZoOkq1sHwLkFRLFydEA7Q__')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Experience <span className="gradient-text">Highlights</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven track record of delivering results for global enterprise
              clients
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {[
              {
                company: "VTEX",
                role: "Product Manager & Partner Success",
                achievements: [
                  "Led global B2B lead generation channel (16 sites, 9 languages)",
                  "Managed POC budget for Tier 1/2 clients across US & Europe",
                  "Built partner ecosystem across Colombia, Ecuador, Panama",
                ],
              },
              {
                company: "Panamericana",
                role: "Head of eCommerce",
                achievements: [
                  "Integrated VTEX with legacy ERPs for Fortune 500 clients",
                  "Drove 200% YoY revenue growth through conversion optimization",
                  "Led digital transformation initiatives across retail operations",
                ],
              },
              {
                company: "Tita Media",
                role: "Solution Architect",
                achievements: [
                  "Architected headless commerce solutions for enterprise clients",
                  "Implemented multi-channel strategies across web, mobile, and in-store",
                  "Optimized cloud infrastructure reducing costs by 40%",
                ],
              },
            ].map((experience, index) => (
              <Card
                key={index}
                className="floating-card bg-card/80 backdrop-blur-sm border-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1">
                        {experience.company}
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        {experience.role}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          className="text-primary flex-shrink-0 mt-1"
                          size={20}
                        />
                        <span className="text-foreground/90">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section
        id="clients"
        data-animate
        className={`diagonal-section py-24 bg-muted relative ${
          isVisible["clients"] ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Notable <span className="gradient-text">Clients & Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Trusted by leading brands across LATAM, Europe & North America
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="floating-card bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {[
                    "VTEX Global",
                    "Groupe Casino",
                    "OBI Germany",
                    "La Comer",
                    "BeautyCounter",
                    "Whirlpool",
                    "KitchenAid",
                    "Panamericana",
                  ].map((client, index) => (
                    <div
                      key={index}
                      className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <p className="font-semibold text-foreground">{client}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center pt-6 border-t">
                  <p className="text-lg font-semibold text-foreground mb-2">
                    Trusted by companies across LATAM, Europe & North America
                  </p>
                  <p className="text-muted-foreground">
                    From startups to Fortune 500 enterprises, delivering
                    measurable results and long-term growth
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Expertise & Skills Section */}
      <section
        id="expertise"
        data-animate
        className={`py-24 bg-background ${
          isVisible["expertise"] ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Expertise & <span className="gradient-text">Skills</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="floating-card bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Cloud className="text-primary" size={24} />
                  Platforms & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "VTEX",
                    "Magento",
                    "Shopify",
                    "AWS Cloud",
                    "Headless Commerce",
                    "API Integration",
                  ].map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="floating-card bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ShoppingCart className="text-primary" size={24} />
                  Commerce Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "B2B eCommerce",
                    "B2C eCommerce",
                    "Marketplace",
                    "D2C",
                    "CRO",
                    "Omnichannel",
                  ].map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="floating-card bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Layers className="text-primary" size={24} />
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Solution Architecture",
                    "API Integration",
                    "ERP/OMS Integration",
                    "DevOps",
                    "Cloud Infrastructure",
                  ].map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="floating-card bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="text-primary" size={24} />
                  Marketing & Growth
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "SEO/SEM",
                    "Google Ads",
                    "Meta Ads",
                    "Demand Generation",
                    "Lead Nurturing",
                  ].map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto mt-8">
            <Card className="floating-card bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="text-primary" size={24} />
                  Languages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold">Spanish</p>
                    <p className="text-sm text-muted-foreground">Native</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold">English</p>
                    <p className="text-sm text-muted-foreground">C1 (Advanced)</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold">Portuguese</p>
                    <p className="text-sm text-muted-foreground">B2 (Upper Intermediate)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section
        id="certifications"
        data-animate
        className={`py-24 bg-muted ${
          isVisible["certifications"] ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Certifications & <span className="gradient-text">Credentials</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="floating-card bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Award className="text-background" size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Digital Commerce Expert
                </h3>
                <p className="text-muted-foreground">Eicom UK</p>
              </CardContent>
            </Card>

            <Card className="floating-card bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Award className="text-background" size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Google Digital Marketing & E-commerce
                </h3>
                <p className="text-muted-foreground">Google</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        data-animate
        className={`diagonal-section py-24 bg-foreground text-background relative ${
          isVisible["contact"] ? "animate-fade-in-up" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/Z8YHM18BnVZRZKa2YmBQhA-img-5_1770302070000_na1fn_Y29udGFjdC1zZWN0aW9uLWJhY2tncm91bmQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9aN3IyREZLSWZaV3lVd3hOaVlOcC9zYW5kYm94L1o4WUhNMThCblZaUlpLYTJZbUJRaEEtaW1nLTVfMTc3MDMwMjA3MDAwMF9uYTFmbl9ZMjl1ZEdGamRDMXpaV04wYVc5dUxXSmhZMnRuY205MWJtUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=lEv7e8KtzdSnz6-qjdRMdwfWznw8nApA99BEkLzgt94BXvfSKdURfKCE5ySi7YmRvRE-JupuVIrO~Su7BHEi47rHPRcRNiup0NXWErjFc8ErNWuqEamnVh39FCUE2kPJtLyfRcJZHiyKJD5g1IValWZ4xsBr8z1hq-FI06AYBs3AsElXngNoFVUXIM9vhAlnf196-nd79pGu83zKb9JFYikW~NJuxlEnoRnhWNjlbOe74Lc5Q~3FpwwyXujrNnUlktfPRGkxs0SUbVdWa~LBAidDO7pTADKQyKEqdqupnic-IpesGN0NVmEDGLKjuSfUZe-mxj4lauLNG~ioTSVzhw__')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-xl text-background/80 max-w-3xl mx-auto">
              Ready to transform your digital commerce strategy? Get in touch
              for a consultation.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="floating-card bg-background/10 backdrop-blur-md border-background/20">
              <CardContent className="pt-6">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-background">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="bg-background/20 border-background/30 text-background placeholder:text-background/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-background">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-background/20 border-background/30 text-background placeholder:text-background/50"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-background">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      className="bg-background/20 border-background/30 text-background placeholder:text-background/50"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service" className="text-background">
                      Service Interest *
                    </Label>
                    <Select name="service" required>
                      <SelectTrigger className="bg-background/20 border-background/30 text-background">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ecommerce">
                          eCommerce Strategy & Implementation
                        </SelectItem>
                        <SelectItem value="growth">
                          Digital Growth & Lead Generation
                        </SelectItem>
                        <SelectItem value="integration">
                          Platform Integration & Architecture
                        </SelectItem>
                        <SelectItem value="marketplace">
                          Marketplace Development
                        </SelectItem>
                        <SelectItem value="partner">
                          Partner Ecosystem Building
                        </SelectItem>
                        <SelectItem value="cro">
                          CRO & Performance Optimization
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-background">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="bg-background/20 border-background/30 text-background placeholder:text-background/50"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    size="lg"
                  >
                    Send Message
                  </Button>
                  <p className="text-sm text-background/70 text-center">
                    I'll respond within 24 hours
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="floating-card bg-background/10 backdrop-blur-md border-background/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-background">
                    Direct Contact
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <Globe size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-background">Email</p>
                        <a
                          href="mailto:juanpablo321@gmail.com"
                          className="text-background/80 hover:text-background transition-colors"
                        >
                          juanpablo321@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <Globe size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-background">Phone</p>
                        <a
                          href="tel:+573235812748"
                          className="text-background/80 hover:text-background transition-colors"
                        >
                          +57 323 581 2748
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <Globe size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-background">LinkedIn</p>
                        <a
                          href="https://linkedin.com/in/juanpablo321"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-background/80 hover:text-background transition-colors"
                        >
                          linkedin.com/in/juanpablo321
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <Globe size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-background">Location</p>
                        <p className="text-background/80">
                          Bogotá D.C., Colombia
                        </p>
                        <p className="text-sm text-background/70">
                          Available globally (remote)
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="floating-card bg-background/10 backdrop-blur-md border-background/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-background">
                    Schedule a Consultation
                  </h3>
                  <p className="text-background/80 mb-4">
                    Book a 30-minute consultation to discuss your digital
                    commerce needs and explore how I can help accelerate your
                    growth.
                  </p>
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    size="lg"
                  >
                    Schedule 30-min Consultation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
