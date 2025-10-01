import { useState, useRef } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Project } from '@/types/project';
import ProjectCard from './ProjectCard';

interface SwipeableStackProps {
  projects: Project[];
  onReact: (projectId: string, reactionType: string) => void;
}

const SwipeableStack = ({ projects, onReact }: SwipeableStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-300, 0, 300], [0, 1, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50; // Lowered threshold for easier swiping
    
    if (Math.abs(info.offset.y) > threshold) {
      if (info.offset.y < 0 && currentIndex < projects.length - 1) {
        // Swiped up - next project
        setDirection('up');
        y.set(0); // Reset position
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setDirection(null);
        }, 300);
      } else if (info.offset.y > 0 && currentIndex > 0) {
        // Swiped down - previous project
        setDirection('down');
        y.set(0); // Reset position
        setTimeout(() => {
          setCurrentIndex(currentIndex - 1);
          setDirection(null);
        }, 300);
      }
    } else {
      // Snap back if threshold not met
      y.set(0);
    }
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full h-full max-w-2xl mx-auto">
      <motion.div
        drag="y"
        dragElastic={0.2}
        dragConstraints={{ top: -200, bottom: 200 }}
        onDragEnd={handleDragEnd}
        style={{ y, opacity }}
        animate={
          direction
            ? {
                y: direction === 'up' ? -1000 : 1000,
                opacity: 0,
              }
            : { y: 0, opacity: 1 }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ProjectCard project={currentProject} onReact={onReact} />
      </motion.div>
      
      {/* Swipe Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-foreground/50 text-sm font-display"
        >
          ↑ Swipe for next project ↑
        </motion.div>
      </div>
      
      {/* Progress Indicator */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2">
        {projects.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 gradient-sunset'
                : 'w-1 bg-foreground/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeableStack;
