import { motion } from 'framer-motion';
import { ReactionType, reactionEmojis } from '@/types/project';
import confetti from 'canvas-confetti';

interface EmojiReactionsProps {
  reactions: Record<ReactionType, number>;
  onReact: (type: ReactionType) => void;
}

const EmojiReactions = ({ reactions, onReact }: EmojiReactionsProps) => {
  const handleReaction = (type: ReactionType) => {
    onReact(type);
    
    // Trigger confetti
    const colors = {
      skull: ['#8B5CF6', '#6366F1'],
      cry: ['#3B82F6', '#06B6D4'],
      fire: ['#F59E0B', '#EF4444'],
      mindblown: ['#EC4899', '#F97316'],
      rainbow: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981'],
    };

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: colors[type],
      ticks: 100,
    });
  };

  return (
    <div className="flex justify-around items-center gap-4 px-6 py-4 bg-card/50 backdrop-blur-md rounded-3xl border border-border/30">
      {(Object.keys(reactionEmojis) as ReactionType[]).map((type) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9, rotate: -10 }}
          onClick={() => handleReaction(type)}
          className="flex flex-col items-center gap-1"
        >
          <motion.span
            className="text-3xl"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
            }}
          >
            {reactionEmojis[type]}
          </motion.span>
          <span className="text-xs font-bold text-foreground/80">
            {reactions[type]}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default EmojiReactions;
