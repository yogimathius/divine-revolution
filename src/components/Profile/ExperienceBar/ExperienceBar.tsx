import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useExperience } from '../../../context/useExperience';
import { UserYogaPose } from '../../../context/ExperienceContext';


interface Props {
  userYogaPoses: UserYogaPose[]
  userYogaPosesLoading: boolean;
}

const colors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-teal-500',
  'bg-pink-500',
];

const ExperienceBar = ({ userYogaPoses, userYogaPosesLoading }: Props) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [maxPoints, setMaxPoints] = useState(70);
  const [barColor, setBarColor] = useState('bg-blue-500'); // Default color

  useEffect(() => {
    if (userYogaPoses) {
      // Calculate the total points from userYogaPoses
      const points = userYogaPoses.reduce(
        (accumulator, userYogaPose) =>
          accumulator + parseInt(userYogaPose.pose.posePoints, 10),
        0
      );
      setTotalPoints(points);

      // Check if the total points have reached the maximum points for the current level
      if (points >= maxPoints) {
        // Increase the level and update the maximum points for the next level
        setCurrentLevel((prevLevel) => prevLevel + 1);
        setMaxPoints((prevMaxPoints) => Math.round(prevMaxPoints * 1.2)); // Increase the maximum points by 20% for the next level
      }
    }
  }, [maxPoints, userYogaPoses]);

  useEffect(() => {
    // Change the color every 5 levels up to level 35
    if (currentLevel <= 35 && currentLevel % 5 === 0) {
      const colorIndex = Math.floor((currentLevel - 1) / 5) % 7;
      setBarColor(colors[colorIndex]);
    }
  }, [currentLevel]);

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
          className={`h-full rounded-md ${barColor}`}
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
