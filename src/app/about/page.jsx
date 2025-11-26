import React from "react";
import {
  Target,
  Eye,
  Award,
  Users,
  TrendingUp,
  Heart,
  Shield,
  Zap,
  Globe,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "10K+",
      label: "Happy Customers",
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "500+",
      label: "Products Available",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: "50+",
      label: "Brands Partners",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "5+",
      label: "Years of Excellence",
    },
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Assurance",
      description:
        "We guarantee 100% authentic products from authorized distributors with official warranties.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We provide 24/7 support and hassle-free shopping experience.",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description:
        "We bring you the latest technology products and cutting-edge gadgets from around the world.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "Trust & Reliability",
      description:
        "Built on transparency and integrity, we've earned the trust of thousands of tech enthusiasts.",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const team = [
    {
      name: "Tushar Chowdhury",
      role: "Founder & CEO",
      image: "👩‍💼",
      description: "Tech entrepreneur with 15+ years of industry experience",
    },
    {
      name: "Tushar Chowdhury",
      role: "Head of Operations",
      image: "👨‍💼",
      description: "Expert in supply chain and logistics management",
    },
    {
      name: "Tushar Chowdhury",
      role: "Customer Success Lead",
      image: "👩‍💻",
      description:
        "Passionate about delivering exceptional customer experiences",
    },
    {
      name: "Tushar Chowdhury",
      role: "Tech Specialist",
      image: "👨‍🔧",
      description: "Product expert and technical advisor",
    },
  ];

  const milestones = [
    {
      year: "2019",
      event: "NexaTech Founded",
      description: "Started with a vision to revolutionize tech retail",
    },
    {
      year: "2020",
      event: "First Milestone",
      description: "Reached 1,000 satisfied customers",
    },
    {
      year: "2021",
      event: "Expansion",
      description: "Partnered with 20+ international brands",
    },
    {
      year: "2022",
      event: "Award Winner",
      description: "Best E-commerce Platform Award",
    },
    {
      year: "2023",
      event: "10K Customers",
      description: "Celebrated serving 10,000+ happy customers",
    },
    {
      year: "2024",
      event: "Going Strong",
      description: "Continuing to innovate and grow",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About NexaTech
            </span>
          </h1>
          <p className="text-lg opacity-70 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in technology. We bring you the latest gadgets,
            electronics, and tech products with unmatched quality and service
            since 2019.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center py-6">
                <div className="text-primary mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-sm opacity-70">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card bg-gradient-to-br from-primary to-primary/80 text-white shadow-xl">
            <div className="card-body">
              <Target className="w-12 h-12 mb-4" />
              <h2 className="card-title text-2xl mb-3">Our Mission</h2>
              <p className="leading-relaxed">
                To empower individuals and businesses with cutting-edge
                technology products at competitive prices, while providing
                exceptional customer service and building lasting relationships
                based on trust and reliability.
              </p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-secondary to-secondary/80 text-white shadow-xl">
            <div className="card-body">
              <Eye className="w-12 h-12 mb-4" />
              <h2 className="card-title text-2xl mb-3">Our Vision</h2>
              <p className="leading-relaxed">
                To become the leading tech retail destination in Bangladesh,
                recognized for our commitment to quality, innovation, and
                customer satisfaction, while making technology accessible to
                everyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-base-200 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="opacity-70 max-w-2xl mx-auto">
              The principles that guide everything we do at NexaTech
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="card-body">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white mb-4`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="card-title text-xl mb-2">{value.title}</h3>
                  <p className="opacity-70">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story / Timeline */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="opacity-70 max-w-2xl mx-auto">
            From a small startup to a trusted name in tech retail
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <div className="badge badge-primary badge-lg mb-3">
                  {milestone.year}
                </div>
                <h3 className="font-bold text-lg mb-2">{milestone.event}</h3>
                <p className="text-sm opacity-70">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-base-200 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="opacity-70 max-w-2xl mx-auto">
              Dedicated professionals committed to your satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="card-body items-center text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="card-title text-lg">{member.name}</h3>
                  <div className="badge badge-primary badge-sm mb-3">
                    {member.role}
                  </div>
                  <p className="text-sm opacity-70">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="card bg-gradient-to-br from-primary to-secondary text-white shadow-xl">
          <div className="card-body text-center py-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose NexaTech?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Authentic Products</h3>
                <p className="text-sm opacity-90">
                  100% genuine products with official warranty
                </p>
              </div>
              <div>
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Best Prices</h3>
                <p className="text-sm opacity-90">
                  Competitive pricing with regular deals
                </p>
              </div>
              <div>
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
                <p className="text-sm opacity-90">
                  Quick and secure delivery across Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-base-200 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="opacity-70 mb-8">
            Join thousands of satisfied customers who trust NexaTech
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products" className="btn btn-primary btn-lg">
              Shop Now
            </a>
            <a href="/contact" className="btn btn-outline btn-lg">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
