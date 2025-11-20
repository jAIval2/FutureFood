import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { LoadingAnimation } from '../components/about/LoadingAnimation';
import { StatCard } from '../components/about/StatCard';
import { RestaurantShowcase } from '../components/about/RestaurantShowcase';
import { useData } from '../contexts/DataContext';
import { Sprout, ArrowDown, Mail } from 'lucide-react';

export const About: React.FC = () => {
  const { restaurants } = useData();
  const [showLoading, setShowLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Prevent scroll during loading
    if (showLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showLoading]);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (showLoading) {
    return <LoadingAnimation onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-sage/10 to-sand"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <Sprout className="h-10 w-10 text-white" />
          </motion.div>

          <motion.h1
            className="mb-6 text-charcoal"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Buy. Give. Nourish.
          </motion.h1>

          <motion.h2
            className="mb-12 text-muted-foreground mx-auto max-w-3xl"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            A simple, regenerative way to support local kitchens and feed someone in need.
          </motion.h2>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <button
              onClick={() => scrollToSection('idea-section')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              See How It Works
              <ArrowDown className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollToSection('partner-section')}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-8 py-4 text-primary transition-all hover:bg-primary hover:text-white"
            >
              Partner as a restaurant
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="h-6 w-6 text-primary" />
        </motion.div>
      </motion.section>

      {/* Idea Description Section */}
      <section id="idea-section" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-8 text-center text-primary">Our Regenerative Idea</h3>
            
            <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-white to-sage/5 p-8 md:p-12 shadow-xl">
              <p className="mb-8 leading-relaxed text-foreground/90" style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
                We've built a lightweight software initiative that centralizes meal donations — and it costs you nothing extra. 
                When a customer buys a meal, they can choose to add a second meal to donate. That donated meal becomes available 
                for a person in need to claim. This simple feature gives ordinary people an effortless, everyday way to do good. 
                For restaurants, it means incremental revenue per order, clearer community impact, and a practical way to help 
                neighbours get a warm meal.
              </p>

              <div className="border-t border-accent/20 pt-6">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 mt-0.5 shrink-0" />
                  <p className="text-sm leading-relaxed">
                    Emails collected are used only to send donation photos. We will never share or sell personal data.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-sand/30 to-sage/20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-4 text-center text-primary">See the difference you can make</h3>
            <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
              Every meal shared creates a ripple effect of positive change in our community
            </p>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              <StatCard
                number="1,248"
                label="Meals donated"
                description="Each donated meal is prepared by a partner and claimed locally."
              />
              <StatCard
                number="976"
                label="People reached"
                description="Real people in our community receiving warm, nutritious meals."
              />
              <StatCard
                number="3"
                label="Partner restaurants"
                description="Local kitchens committed to sustainability and community support."
              />
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => scrollToSection('showcase-section')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
              >
                Start Supporting
                <ArrowDown className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Restaurant Showcase */}
      <section id="showcase-section" className="bg-white">
        <RestaurantShowcase restaurants={restaurants} />
      </section>

      {/* Partner CTA Section */}
      <section id="partner-section" className="py-20 md:py-32 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg">
              <Sprout className="h-8 w-8 text-white" />
            </div>

            <h3 className="mb-6 text-primary">Join Our Network</h3>
            
            <p className="mb-12 leading-relaxed text-foreground/80" style={{ fontSize: '1.125rem' }}>
              Want to partner? Add your kitchen to our network to increase per-order revenue and feed your community. 
              Together, we can create a more sustainable and supportive food system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
                Become a Partner
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-8 py-4 text-primary transition-all hover:bg-primary hover:text-white">
                Contact Support
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};