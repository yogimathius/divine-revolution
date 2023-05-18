import { ReactNode, createContext, useContext, useState } from 'react';

// Define the types for experiences
interface User {
  id: number;
  username: string;
  password: string;
  online: boolean;
  bio: string;
  email: string;
}

interface YogaPose {
  poseId: number;
  poseName: string;
  poseDescription: string;
  poseImagePath: string;
  posePoints: string;
}

export interface UserYogaPose {
  user_pose_id: number;
  user: User;
  pose: YogaPose;
  completion_date: string;
}

type ExperienceContextType = {
  userYogaPoses: UserYogaPose[];
  setUserYogaPoses: (newUserYogaPose: UserYogaPose[]) => void;
  updateUserYogaPose: (newUserYogaPose: UserYogaPose[]) => void;
  // Add other experience-related types here
};

const ExperienceContext = createContext<ExperienceContextType>(
  {} as ExperienceContextType
);


type ExperienceProviderProps = {
  children: ReactNode;
};

export const ExperienceProvider:  React.FC<ExperienceProviderProps> = ({ children }) => {
  const [userYogaPoses, setUserYogaPoses] = useState<UserYogaPose[]>([]);

  const updateUserYogaPose = (newUserYogaPose: UserYogaPose[]) => {
    console.log(newUserYogaPose);
    
    setUserYogaPoses(prev => [...prev, ...newUserYogaPose]);
  };

  // Add other experience-related state and functions as needed

  return (
    <ExperienceContext.Provider
      value={{
        userYogaPoses,
        setUserYogaPoses,
        updateUserYogaPose,
        // Add other experience-related values here
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = (): ExperienceContextType =>
  useContext(ExperienceContext);
