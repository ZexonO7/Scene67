import { useState } from 'react';
import { motion } from 'framer-motion';
import SwipeableStack from '@/components/SwipeableStack';
import HotRightNow from '@/components/HotRightNow';
import { mockProjects } from '@/data/mockProjects';
import { Waves } from 'lucide-react';

const Index = () => {
  const [projects, setProjects] = useState(mockProjects);

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
      {/* Animated Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-pulse" />
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(18 100% 60% / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, hsl(330 100% 60% / 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 20%, hsl(195 100% 50% / 0.3) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-10 p-6"
      >
        <div className="flex items-center justify-center gap-3">
          <Waves className="w-8 h-8 text-secondary animate-float" />
          <h1 className="font-display font-bold text-4xl md:text-5xl text-primary text-glow-orange">
            ScrapTok
          </h1>
        </div>
        <p className="text-center text-foreground/70 mt-2 font-display">
          Ride the Summer of Making 🌊
        </p>
      </motion.header>

      {/* Hot Right Now Sidebar */}
      <HotRightNow projects={projects} />

      {/* Main Feed */}
      <main className="relative z-10 h-[calc(100vh-120px)] px-4 pb-8">
        <SwipeableStack projects={projects} onReact={handleReact} />
      </main>

      {/* Floating Decorations */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 right-12 text-6xl opacity-30 pointer-events-none hidden lg:block"
      >
        🏄
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
          y: [0, -15, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute top-1/3 right-1/4 text-5xl opacity-20 pointer-events-none hidden lg:block"
      >
        🥥
      </motion.div>
    </div>
  );
};

export default Index;
