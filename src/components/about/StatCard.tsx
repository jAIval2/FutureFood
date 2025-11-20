import React, { useState } from 'react';
import { motion } from 'motion/react';

interface StatCardProps {
  number: string;
  label: string;
  description: string;
}

export const StatCard: React.FC<StatCardProps> = ({ number, label, description }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl border border-accent/30 bg-white p-8 text-center transition-all hover:border-primary hover:shadow-xl"
      onHoverStart={() => setShowDescription(true)}
      onHoverEnd={() => setShowDescription(false)}
      onTapStart={() => setShowDescription(!showDescription)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="mb-2 text-primary" style={{ fontSize: '3rem' }}>{number}</div>
      <div className="mb-4">{label}</div>
      
      <motion.div
        className="overflow-hidden text-muted-foreground"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: showDescription ? 'auto' : 0,
          opacity: showDescription ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <p className="pt-4 border-t border-accent/20">{description}</p>
      </motion.div>
    </motion.div>
  );
};
