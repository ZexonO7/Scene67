import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard';
import { mockProjects } from '@/data/mockProjects';
import { useState } from 'react';

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const userProjects = mockProjects.filter(p => p.creator === username);
  const currentProject = userProjects[currentProjectIndex];
  
  if (!currentProject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <Button onClick={() => navigate('/')}>Go back</Button>
        </div>
      </div>
    );
  }

  const handleReact = (projectId: string, reactionType: string) => {
    // Reactions are handled in parent, but we'll just log for now
    console.log('React', projectId, reactionType);
  };

  const goToNext = () => {
    if (currentProjectIndex < userProjects.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent"
      >
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          
          <div className="flex items-center gap-3">
            <img
              src={currentProject.creatorAvatar}
              alt={username}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <p className="font-bold text-white">@{username}</p>
              <p className="text-xs text-white/70">{userProjects.length} projects</p>
            </div>
          </div>
          
          <div className="w-10" />
        </div>
      </motion.header>

      {/* Project Display */}
      <div className="relative w-full h-full">
        <ProjectCard project={currentProject} onReact={handleReact} />
      </div>

      {/* Navigation */}
      {userProjects.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {userProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProjectIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentProjectIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      )}

      {/* Swipe indicators for mobile */}
      {currentProjectIndex < userProjects.length - 1 && (
        <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20 pointer-events-none">
          <motion.div
            animate={{
              x: [0, 10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-white/60 text-sm font-semibold"
          >
            →
          </motion.div>
        </div>
      )}
      
      {currentProjectIndex > 0 && (
        <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20 pointer-events-none">
          <motion.div
            animate={{
              x: [0, -10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-white/60 text-sm font-semibold"
          >
            ←
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;
