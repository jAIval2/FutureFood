import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  author: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
}

const messages: Message[] = [
  {
    id: 1,
    text: "Thank you so much! This meal made my day. Bless you all.",
    author: "Sarah M.",
    position: { top: '10%', left: '5%' },
    delay: 0,
  },
  {
    id: 2,
    text: "I was really struggling today. This kindness means everything.",
    author: "James K.",
    position: { top: '20%', right: '8%' },
    delay: 0.3,
  },
  {
    id: 3,
    text: "Amazing food and amazing hearts. Thank you!",
    author: "Maria L.",
    position: { bottom: '25%', left: '10%' },
    delay: 0.6,
  },
  {
    id: 4,
    text: "My kids loved the meal. Thank you for caring about us.",
    author: "David T.",
    position: { bottom: '15%', right: '12%' },
    delay: 0.9,
  },
  {
    id: 5,
    text: "This brought tears to my eyes. Faith in humanity restored!",
    author: "Elena R.",
    position: { top: '45%', left: '3%' },
    delay: 1.2,
  },
  {
    id: 6,
    text: "Hot, fresh, delicious. I'm so grateful for this community.",
    author: "Ahmed S.",
    position: { top: '60%', right: '5%' },
    delay: 1.5,
  },
];

export const DonationMessages: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          className="absolute hidden lg:block"
          style={message.position}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            delay: message.delay,
            ease: "easeOut"
          }}
        >
          <motion.div
            className="relative max-w-[280px] rounded-2xl bg-white/95 backdrop-blur-sm p-4 shadow-lg border border-sage/20"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(26, 92, 78, 0.15)" }}
            transition={{ duration: 0.2 }}
            animate={{
              y: [0, -8, 0],
            }}
            style={{
              transition: "all 0.3s ease",
            }}
          >
            {/* Heart Icon */}
            <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-accent flex items-center justify-center shadow-md">
              <Heart className="h-4 w-4 text-white fill-current" />
            </div>

            {/* Message Text */}
            <p className="text-sm leading-relaxed text-foreground/90 mb-3 italic">
              "{message.text}"
            </p>

            {/* Author */}
            <p className="text-xs text-primary font-medium">
              — {message.author}
            </p>

            {/* Decorative Corner */}
            <div className="absolute bottom-0 right-0 w-12 h-12 opacity-5">
              <Heart className="w-full h-full text-primary" />
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
