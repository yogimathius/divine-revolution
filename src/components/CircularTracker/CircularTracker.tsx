import { CircularProgress, Card, CardContent, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import useGenerateExperiencePoints from '../../hooks/useGenerateExperienceArray';

interface Props {
  pose: string;
  progress: number;
}

const YogaPoseTracker = ({ pose, progress }: Props) => {
  const [level, setLevel] = useState(1);
  const [totalPoints, setTotalPoints] = useState(0);
  const [prevPoints, setPrevPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(100);
  const experiencePoints = useGenerateExperiencePoints(100);

  const calculateLevel = useCallback(() => {
    let currentLevel = level;
    let pointsToNextLevel = maxPoints - prevPoints;

    while (pointsToNextLevel <= progress) {
      currentLevel++;
      pointsToNextLevel = Math.round(pointsToNextLevel * 1.2);
    }

    return currentLevel;
  }, [level, maxPoints, prevPoints, progress]);

  useEffect(() => {
    setTotalPoints(progress);

    if ((totalPoints - prevPoints) >= maxPoints) {
      setLevel((prev) => prev + 1);
      setMaxPoints(() => experiencePoints[level]);
      setPrevPoints((prev) => prev + experiencePoints[level - 1]);
    }
  }, [calculateLevel, experiencePoints, level, maxPoints, prevPoints, progress, totalPoints]);

  const progressRemaining = totalPoints - prevPoints;
  const progressPercentage = Math.round(((totalPoints - prevPoints) / maxPoints) * 100);

  return (
    <div>
      <div className="w-64 bg-white rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
        <div className="p-4">
          <div className='flex justify-between'>
            <h4 className="text font-bold mb-2">{pose}</h4>
            <p className="text-sm text-gray-500">Lvl: {level}</p>
          </div>
          <CircularProgress 
            variant="determinate" 
            value={progressPercentage} 
            size={60} 
            thickness={6} 
            sx={{
              position: 'relative',
              backgroundColor: '#E0F7FA',
              borderRadius: '50%',
              color: "#4CAF50" // Set the color to a custom value
            }}
          />
          <div className='flex justify-between'>
            <p className="text-sm text-gray-500">Progress: {progressPercentage}%</p>
            <p className="text-sm text-gray-500">
              {progressRemaining} / {maxPoints} XP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YogaPoseTracker;
