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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative w-full h-full"
    >
      {/* Full-screen Media */}
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={project.mediaUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />
        
        {/* Trending Badge - Top Left */}
        {project.isTrending && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-bold text-xs">TRENDING</span>
          </motion.div>
        )}
        
        {/* Right Side - Reactions */}
        <div className="absolute right-3 bottom-24 flex flex-col gap-4">
          <EmojiReactions
            reactions={project.reactions}
            onReact={(type) => onReact(project.id, type)}
          />
          
          {/* Remix Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRemix}
            className="flex flex-col items-center gap-1 p-2"
          >
            <div className="w-12 h-12 rounded-full bg-muted/80 backdrop-blur-sm flex items-center justify-center">
              <GitFork className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">Remix</span>
          </motion.button>
        </div>
        
        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 space-y-3">
          {/* Creator */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onClick={() => navigate(`/profile/${project.creator}`)}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src={project.creatorAvatar}
              alt={project.creator}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white">@{project.creator}</p>
              <p className="text-xs text-white/70">{project.timestamp}</p>
            </div>
          </motion.div>
          
          {/* Title & Description */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-1 pr-16"
          >
            <h2 className="font-bold text-lg text-white leading-tight">
              {project.title}
            </h2>
            <p className="text-sm text-white/90 leading-snug line-clamp-2">
              {project.description}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
