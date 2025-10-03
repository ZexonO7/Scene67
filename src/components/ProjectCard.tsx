import { motion } from 'framer-motion';
import { Project } from '@/types/project';
import EmojiReactions from './EmojiReactions';
import { Sparkles, GitFork } from 'lucide-react';
import { Button } from './ui/button';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  onReact: (projectId: string, reactionType: string) => void;
}

const ProjectCard = ({ project, onReact }: ProjectCardProps) => {
  const navigate = useNavigate();
  
  const handleRemix = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B35', '#F7931E', '#FDC830', '#3EECAC', '#6C63FF'],
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.95, rotate: 1 }}
      className="relative w-full h-full"
    >
      {/* Scrapbook Frame */}
      <div className="relative w-full h-full overflow-hidden paper-torn rounded-sm">
        <img
          src={project.mediaUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{
            filter: 'contrast(1.05) saturate(1.1)',
          }}
        />
        
        {/* Scrapbook-style Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/30" />
        
        {/* Decorative tape on corners */}
        <div className="absolute top-4 left-4 w-16 h-8 bg-[hsl(50_30%_85%/0.8)] rotate-[-15deg] shadow-sm"></div>
        <div className="absolute top-4 right-4 w-16 h-8 bg-[hsl(50_30%_85%/0.8)] rotate-[15deg] shadow-sm"></div>
        
        {/* Trending Badge - Top Left with Scrapbook Style */}
        {project.isTrending && (
          <motion.div
            initial={{ scale: 0, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-12 left-12 flex items-center gap-1.5 px-4 py-2 bg-accent paper-torn rotate-[-3deg] z-10"
          >
            <Sparkles className="w-4 h-4" />
            <span className="font-bold text-sm text-handwritten">HOT! 🔥</span>
          </motion.div>
        )}
        
        {/* Right Side - Reactions */}
        <div className="absolute right-3 bottom-24 flex flex-col gap-4">
          <EmojiReactions
            reactions={project.reactions}
            onReact={(type) => onReact(project.id, type)}
          />
          
          {/* Remix Button with Scrapbook Style */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRemix}
            className="flex flex-col items-center gap-1 p-2"
          >
            <div className="w-12 h-12 rounded-sm bg-card paper-torn flex items-center justify-center rotate-[-2deg] border-2 border-foreground/20">
              <GitFork className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-xs font-bold text-handwritten">Remix</span>
          </motion.button>
        </div>
        
        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 space-y-3">
          {/* Creator with Scrapbook Style */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onClick={() => navigate(`/profile/${project.creator}`)}
            className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform bg-card/90 px-3 py-2 rounded-sm paper-torn rotate-[1deg]"
          >
            <img
              src={project.creatorAvatar}
              alt={project.creator}
              className="w-12 h-12 rounded-sm border-3 border-foreground rotate-[-3deg] shadow-md"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground text-lg">@{project.creator}</p>
              <p className="text-xs text-muted-foreground text-typewriter">{project.timestamp}</p>
            </div>
          </motion.div>
          
          {/* Title & Description with Handwritten Style */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-2 pr-16 bg-card/95 p-3 rounded-sm paper-torn rotate-[-0.5deg]"
          >
            <h2 className="font-bold text-2xl text-foreground leading-tight text-handwritten">
              {project.title}
            </h2>
            <p className="text-base text-foreground/80 leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
