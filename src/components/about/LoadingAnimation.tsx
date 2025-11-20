import React from 'react';
import { motion } from 'motion/react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 2 }}
      onAnimationComplete={onComplete}
    >
      <div className="text-center">
        <motion.div
          className="mb-6 mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: 0,
          }}
        />
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Nourishing communities…
        </motion.p>
      </div>
    </motion.div>
  );
};
