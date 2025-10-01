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
    <div className="flex justify-around items-center gap-4 px-6 py-4 bg-card/50 backdrop-blur-md rounded-3xl border-2 border-border/40 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]" style={{
      borderRadius: `${25 + Math.random() * 8}px ${28 + Math.random() * 8}px ${26 + Math.random() * 8}px ${24 + Math.random() * 8}px`
    }}>
      {(Object.keys(reactionEmojis) as ReactionType[]).map((type, index) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.2, rotate: Math.random() * 20 - 10 }}
          whileTap={{ scale: 0.9, rotate: Math.random() * -20 + 10 }}
          onClick={() => handleReaction(type)}
          className="flex flex-col items-center gap-1"
          style={{ transform: `rotate(${(index % 2 === 0 ? 1 : -1) * Math.random() * 3}deg)` }}
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
