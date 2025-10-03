import { motion } from 'framer-motion';
import { Flame, X } from 'lucide-react';
import { Project } from '@/types/project';
import { useNavigate } from 'react-router-dom';

interface HotRightNowProps {
  projects: Project[];
  onClose: () => void;
}

const HotRightNow = ({ projects, onClose }: HotRightNowProps) => {
  const navigate = useNavigate();
  const topProjects = projects.filter(p => p.isTrending).slice(0, 3);

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="space-y-4 p-6 rounded-sm bg-card paper-torn border-2 border-foreground/20 shadow-xl max-w-xs rotate-[-1deg]">
        <div className="flex items-center gap-2 mb-4 justify-between bg-primary/90 p-3 rounded-sm rotate-[1deg] -mx-2">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-white" />
            <h3 className="font-bold text-xl text-white text-handwritten">
              HOT RIGHT NOW 🔥
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-sm transition-colors text-white"
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
            onClick={() => navigate(`/profile/${project.creator}`)}
            className="flex items-center gap-3 p-3 rounded-sm bg-background paper-torn hover:shadow-lg cursor-pointer group rotate-[0.5deg] hover:rotate-[1deg] transition-all"
          >
            <div className="relative">
              <img
                src={project.creatorAvatar}
                alt={project.creator}
                className="w-12 h-12 rounded-sm border-2 border-primary rotate-[-2deg]"
              />
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-sm gradient-sunset flex items-center justify-center text-xs font-bold text-white">
                {index + 1}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate group-hover:text-primary transition-colors text-handwritten">
                {project.title}
              </p>
              <p className="text-xs text-muted-foreground text-typewriter">@{project.creator}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HotRightNow;
