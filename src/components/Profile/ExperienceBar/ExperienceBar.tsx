import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

interface UserYogaPose {
  pose: {
    poseId: string;
    posePoints: number;
  }
}

interface Props {
  userYogaPoses: UserYogaPose[]
  userYogaPosesLoading: boolean;
}
const ExperienceBar = ({ userYogaPoses, userYogaPosesLoading }: Props) => {
  const [totalPoints, setTotalPoints] = useState(0);

  // console.log(userYogaPoses);
  
  useEffect(() => {
    if (userYogaPoses) {
      // Calculate the total points from userYogaPoses
      console.log('checks out', {userYogaPoses});
      
      const points = userYogaPoses.reduce(
        (accumulator, userYogaPose) => {
          console.log('useryogaPose: ', userYogaPose)
          return accumulator + userYogaPose.pose.posePoints
        },
        0
      );
      console.log("points: ", points);
      
      setTotalPoints(points);
      // setIsLoading(false);
    }
  }, [userYogaPoses]);

  if (userYogaPosesLoading) {
    return (
      <div className="flex justify-center items-center h-16">
        <CircularProgress />
      </div>
    );
  }

  const MAX_POINTS = 1000; // Set the maximum number of points required for the max level

  // Calculate the percentage of progress
  const progressPercentage = (totalPoints / MAX_POINTS) * 100;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-600">Experience</div>
        <div className="text-lg font-semibold text-gray-600">
          {totalPoints} / {MAX_POINTS}
        </div>
      </div>
      <div className="h-4 bg-gray-300 rounded-md mt-2">
        <div
          className="h-full bg-blue-500 rounded-md"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ExperienceBar;
