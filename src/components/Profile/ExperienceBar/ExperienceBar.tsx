import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useExperience } from '../../../context/ExperienceContext';


interface Props {
  userYogaPosesLoading: boolean;
}

const ExperienceBar = ({ userYogaPosesLoading }: Props) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [maxPoints, setMaxPoints] = useState(1000);
  const { userYogaPoses } = useExperience();

  useEffect(() => {
    if (userYogaPoses) {
      console.log(userYogaPoses);
      
      // Calculate the total points from userYogaPoses
      const points = userYogaPoses.reduce(
        (accumulator, userYogaPose) => {
          console.log('user yoga pose: ', userYogaPose);
          
          return  accumulator + parseInt(userYogaPose.pose.posePoints)
        },
        0
      );
      setTotalPoints(points);

      // Check if the total points have reached the maximum points for the current level
      if (points >= maxPoints) {
        // Increase the level and update the maximum points for the next level
        setCurrentLevel((prevLevel) => prevLevel + 1);
        setMaxPoints((prevMaxPoints) => prevMaxPoints * 1.2); // Increase the maximum points by 20% for the next level
      }
    }
  }, [maxPoints, userYogaPoses]);

  if (userYogaPosesLoading) {
    return (
      <div className="flex justify-center items-center h-16">
        <CircularProgress />
      </div>
    );
  }

  // Calculate the percentage of progress
  const progressPercentage = (totalPoints / maxPoints) * 100;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-600">Experience</div>
        <div className="text-lg font-semibold text-gray-600">
          {totalPoints} / {maxPoints}
        </div>
      </div>
      <div className="h-4 bg-gray-300 rounded-md mt-2">
        <div
          className="h-full bg-blue-500 rounded-md"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="mt-2 text-gray-600">
        Level {currentLevel} - Next Level: {maxPoints} points
      </div>
    </div>
  );
};

export default ExperienceBar;
