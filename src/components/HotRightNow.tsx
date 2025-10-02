import { motion } from 'framer-motion';
import { Flame, X } from 'lucide-react';
import { Project } from '@/types/project';

interface HotRightNowProps {
  projects: Project[];
  onClose: () => void;
}

const HotRightNow = ({ projects, onClose }: HotRightNowProps) => {
  const topProjects = projects.filter(p => p.isTrending).slice(0, 3);

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="space-y-4 p-6 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl max-w-xs">
        <div className="flex items-center gap-2 mb-4 justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-primary animate-pulse-glow" />
            <h3 className="font-display font-bold text-xl text-glow-orange">
              HOT RIGHT NOW
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {topProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer group"
          >
            <div className="relative">
              <img
                src={project.creatorAvatar}
                alt={project.creator}
                className="w-12 h-12 rounded-full border-2 border-primary"
              />
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full gradient-sunset flex items-center justify-center text-xs font-bold">
                {index + 1}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-sm truncate group-hover:text-primary transition-colors">
                {project.title}
              </p>
              <p className="text-xs text-foreground/70">@{project.creator}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HotRightNow;
