import { useState } from 'react';
import { motion } from 'framer-motion';
import SwipeableStack from '@/components/SwipeableStack';
import HotRightNow from '@/components/HotRightNow';
import { mockProjects } from '@/data/mockProjects';
import { Waves } from 'lucide-react';

const Index = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [showHotRightNow, setShowHotRightNow] = useState(true);

  const handleReact = (projectId: string, reactionType: string) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          reactions: {
            ...project.reactions,
            [reactionType]: project.reactions[reactionType as keyof typeof project.reactions] + 1,
          },
        };
      }
      return project;
    }));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Beach-themed Animated Background */}
      <div className="absolute inset-0 bg-background">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(185 65% 55% / 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, hsl(15 85% 65% / 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 20%, hsl(155 45% 55% / 0.3) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>

      {/* Scrapbook Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-10 p-6"
      >
        <div className="flex items-center justify-center gap-3">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl"
          >
            🏖️
          </motion.div>
          <div className="paper-torn bg-card px-6 py-3 rounded-sm rotate-[-1deg] shadow-md">
            <h1 className="font-bold text-4xl md:text-5xl text-primary text-handwritten" style={{
              textShadow: '3px 3px 0px hsl(15 85% 65% / 0.2)'
            }}>
              ScrapTok
            </h1>
            <p className="text-center text-muted-foreground mt-1 text-typewriter tracking-wide">
              ☀️ ride the summer of making ☀️
            </p>
          </div>
        </div>
      </motion.header>

      {/* Hot Right Now Sidebar */}
      {showHotRightNow && (
        <HotRightNow projects={projects} onClose={() => setShowHotRightNow(false)} />
      )}

      {/* Main Feed */}
      <main className="relative z-10 h-[calc(100vh-120px)]">
        <SwipeableStack projects={projects} onReact={handleReact} />
      </main>

      {/* Beach Decorations */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 right-12 text-7xl opacity-40 pointer-events-none hidden lg:block animate-wave"
      >
        🌊
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-1/4 right-24 text-6xl opacity-30 pointer-events-none hidden lg:block"
      >
        🦀
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute top-1/3 right-1/4 text-5xl opacity-25 pointer-events-none hidden lg:block"
      >
        🐚
      </motion.div>
      
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/2 left-12 text-6xl opacity-30 pointer-events-none hidden lg:block"
      >
        ☀️
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
        className="absolute bottom-1/3 left-1/4 text-5xl opacity-25 pointer-events-none hidden lg:block"
      >
        🌴
      </motion.div>
    </div>
  );
};

export default Index;
