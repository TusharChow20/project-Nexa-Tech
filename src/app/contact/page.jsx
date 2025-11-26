"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Store,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill in all required fields");
      return;
    }
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+880-12345678", "+0991232112333"],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["support@nexatech.com", "sales@nexatech.com"],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: ["Badda Link Road", "Dhaka,Bangladesh "],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: [
        "Mon - Fri: 9:00 AM - 8:00 PM",
        "Sat - Sun: 10:00 AM - 6:00 PM",
      ],
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Have questions? We would love to hear from you. Send us a message
            and we will respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Info Cards555 */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white mb-3`}
                >
                  {info.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-sm opacity-70">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content - Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
                Send Us a Message
              </h2>

              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Your Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Email Address *
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880-12383632432"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Subject *</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select a subject</option>
                    <option value="product">Product Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="order">Order Status</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Message *</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className="textarea textarea-bordered h-32 w-full"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="btn btn-primary w-full"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-6">
            <div className="card bg-base-200 shadow-xl overflow-hidden">
              <div className="card-body p-0">
                <div className="w-full h-96">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5821385476544!2d90.42458631543303!3d23.780537793390774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7d8542314f9%3A0x9f9a8e8e7e8e7e8e!2sBadda%20Link%20Road%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="NexaTech Location"
                  />
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">
                  Need Immediate Help?
                </h3>

                <div className="space-y-3">
                  <a
                    href="tel:+15551234567"
                    className="btn btn-outline w-full justify-start"
                  >
                    <Headphones className="w-5 h-5 mr-2" />
                    Call Support Now
                  </a>

                  <button className="btn btn-outline btn-primary w-full justify-start">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Live Chat Support
                  </button>

                  <a
                    href="/products"
                    className="btn btn-outline btn-secondary w-full justify-start"
                  >
                    <Store className="w-5 h-5 mr-2" />
                    Visit Our Store
                  </a>
                </div>

                <div className="divider"></div>

                <div className="text-sm opacity-70">
                  <p className="font-semibold mb-2">Average Response Time:</p>
                  <p>• Email: Within 24 hours</p>
                  <p>• Phone: Immediate</p>
                  <p>• Live Chat: Within 5 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-base-200 py-12 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="opacity-70 mb-8">
            Can't find what you're looking for? Contact us directly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="font-bold">Shipping Info</h3>
                <p className="text-sm opacity-70">
                  Learn about our delivery options and tracking
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="font-bold">Returns Policy</h3>
                <p className="text-sm opacity-70">
                  30-day hassle-free returns on all products
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="font-bold">Warranty Info</h3>
                <p className="text-sm opacity-70">
                  Extended warranty options available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
