import { motion } from 'framer-motion';
import { Project } from '@/types/project';
import EmojiReactions from './EmojiReactions';
import { Sparkles, GitFork } from 'lucide-react';
import { Button } from './ui/button';
import confetti from 'canvas-confetti';

interface ProjectCardProps {
  project: Project;
  onReact: (projectId: string, reactionType: string) => void;
}

const ProjectCard = ({ project, onReact }: ProjectCardProps) => {
  const handleRemix = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B35', '#F7931E', '#FDC830', '#3EECAC', '#6C63FF'],
    });
  };

  // Random rotation for organic feel
  const randomRotation = Math.random() * 4 - 2; // -2 to 2 degrees
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: randomRotation }}
      animate={{ opacity: 1, scale: 1, rotate: randomRotation }}
      exit={{ opacity: 0, scale: 0.9, rotate: 0 }}
      className="relative w-full h-full flex flex-col"
      style={{ rotate: randomRotation }}
    >
      {/* Media Container */}
      <div className="relative flex-1 rounded-[2rem] overflow-hidden border-[3px] border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.15)] transition-all" style={{ 
        borderRadius: `${30 + Math.random() * 10}px ${35 + Math.random() * 10}px ${32 + Math.random() * 10}px ${28 + Math.random() * 10}px`
      }}>
        <img
          src={project.mediaUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        
        {/* Trending Badge */}
        {project.isTrending && (
          <motion.div
            initial={{ x: -100, rotate: -5 }}
            animate={{ x: 0, rotate: Math.random() * 6 - 3 }}
            className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full gradient-sunset border-2 border-background/20"
            style={{
              transform: `rotate(${Math.random() * 4 - 2}deg)`,
              boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
            }}
          >
            <Sparkles className="w-4 h-4 animate-pulse-glow" />
            <span className="font-display font-bold text-sm tracking-wide">HOT RN</span>
          </motion.div>
        )}
        
        {/* Project Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
          {/* Creator */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <img
              src={project.creatorAvatar}
              alt={project.creator}
              className="w-12 h-12 rounded-full border-2 border-primary"
            />
            <div>
              <p className="font-display font-bold text-lg">@{project.creator}</p>
              <p className="text-sm text-foreground/70">{project.timestamp}</p>
            </div>
          </motion.div>
          
          {/* Title & Description */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <h2 className="font-display font-bold text-2xl text-glow-orange">
              {project.title}
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              {project.description}
            </p>
          </motion.div>
          
          {/* Actions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <Button
              onClick={handleRemix}
              className="flex items-center gap-2 px-6 py-6 rounded-full gradient-lime font-display font-bold text-lime-foreground hover:scale-105 hover:rotate-2 transition-all border-2 border-background/30 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
              style={{
                transform: `rotate(${Math.random() * 2 - 1}deg)`
              }}
            >
              <GitFork className="w-5 h-5" />
              remix this!
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Reactions */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4"
      >
        <EmojiReactions
          reactions={project.reactions}
          onReact={(type) => onReact(project.id, type)}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
