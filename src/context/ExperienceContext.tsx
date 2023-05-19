import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useGetUserYogaPosesQuery } from '../graphql/hooks';
import { Scalars } from '../__generated__/graphql';

// Define the types for experiences
interface User {
  id: Scalars['ID'];
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
  loading: boolean;
  userYogaPoses: UserYogaPose[];
  setUserYogaPoses: (newUserYogaPose: UserYogaPose[]) => void;
  refetch: (variables: {id: Scalars['ID']}) => void;
  getUserYogaPoseData: (id: Scalars["ID"]) => void;
  // Add other experience-related types here
};

export const ExperienceContext = createContext<ExperienceContextType>(
  {} as ExperienceContextType
);

type ExperienceProviderProps = {
  children: ReactNode;
};

export const ExperienceProvider:  React.FC<ExperienceProviderProps> = ({ children }) => {
  const [userYogaPoses, setUserYogaPoses] = useState<UserYogaPose[]>([]);

  const { getUserYogaPoseData, data, loading, refetch } = useGetUserYogaPosesQuery();

  useEffect(() => {
    if (data) {
      setUserYogaPoses(data.userYogaPoses);
    }
  }, [data]);
  
  // Add other experience-related state and functions as needed

  return (
    <ExperienceContext.Provider
      value={{
        loading,
        userYogaPoses,
        setUserYogaPoses,
        refetch,
        getUserYogaPoseData
        // Add other experience-related values here
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};
