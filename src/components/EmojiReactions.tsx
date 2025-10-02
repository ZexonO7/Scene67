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

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="flex flex-col gap-4">
      {(Object.keys(reactionEmojis) as ReactionType[]).map((type) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleReaction(type)}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-12 h-12 rounded-full bg-muted/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-2xl">
              {reactionEmojis[type]}
            </span>
          </div>
          <span className="text-xs font-bold text-white drop-shadow-lg">
            {formatCount(reactions[type])}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default EmojiReactions;
