import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Firebase integration will be added here
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 section-glow" />
      <div className="container mx-auto max-w-3xl relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-12 sm:mb-16 text-center animate-fade-in">
          <span className="text-gradient">
            Get In Touch
          </span>
        </h2>
        <div className="glass-effect border border-border/50 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-elegant hover-glow animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-3">
                Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="glass-effect border-border/50 h-12 focus:border-primary focus:shadow-glow transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-3">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="glass-effect border-border/50 h-12 focus:border-primary focus:shadow-glow transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-3">
                Message
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="glass-effect border-border/50 resize-none focus:border-primary focus:shadow-glow transition-all"
                placeholder="Tell me about your project..."
              />
            </div>
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-primary-foreground font-bold text-lg rounded-xl hover:scale-[1.02]"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
