import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useExperience } from '../../../context/useExperience';
import { UserYogaPose } from '../../../context/ExperienceContext';


interface Props {
  userYogaPoses: UserYogaPose[]
}
import { useMemo } from 'react';

const useGenerateExperiencePoints = () => {
  const maxPoints = 70;
  const increaseFactor = 1.2;
  const numLevels = 35;

  const experiencePoints = useMemo(() => {
    const points = [];
    let currentPoints = maxPoints;

    for (let i = 0; i < numLevels; i++) {
      points.push(currentPoints);
      currentPoints = Math.round(currentPoints * increaseFactor);
    }

    return points;
  }, []);

  return experiencePoints;
};

const colors = [
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-teal-500',
  'bg-pink-500',
];

const generateTitle = (currentLevel: number) => {
  const titles = [
    "Seeker of Serenity",
    "Guardian of Balance",
    "Master of Tranquility",
    "Enlightened Sage",
    "Zen Mystic",
    "Harmony's Whisper",
    "Eternal Yogi",
    "Divine Illuminator",
    "Soulful Navigator",
    "Mystic Oracle",
    "Sage of Serenity",
    "Enlightened Visionary",
    "Whispering Zen",
    "Radiant Presence",
    "Wisdom's Keeper",
    "Transcendent One",
    "Infinite Bliss",
    "Divine Ascendant",
    "Celestial Sage",
    "Keeper of Inner Peace"
  ];

  if (currentLevel % 5 <= titles.length) {
    return titles[currentLevel % 5];
  }

  // If the level exceeds the number of titles, return a generic title
  return "Yoga Master";
};


const ExperienceBar = ({ userYogaPoses }: Props) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [maxPoints, setMaxPoints] = useState(70);
  const [barColor, setBarColor] = useState('bg-blue-500'); // Default color

  const experiencePoints = useGenerateExperiencePoints()

  useEffect(() => {
    if (userYogaPoses) {
      // Calculate the total points from userYogaPoses
      const points = userYogaPoses.reduce(
        (accumulator, userYogaPose) =>
          accumulator + parseInt(userYogaPose.pose.posePoints, 10),
        0
      );
      // Check if the total points have reached the maximum points for the current level
      if (totalPoints >= maxPoints) {
        // Increase the level and update the maximum points for the next level
        setCurrentLevel((prevLevel) => prevLevel + 1);
        setMaxPoints(() => experiencePoints[currentLevel]); // Increase the maximum points by 20% for the next level
        
        // Reset the total points to 0 for the new level
        setTotalPoints(0);
      } else if (currentLevel > 1) {
        console.log('prev: ' ,experiencePoints[currentLevel - 1]);
        console.log('total: ' ,points);
        
        console.log('curr: ' , experiencePoints[currentLevel]);
        setTotalPoints(points - experiencePoints[currentLevel - 1]);
      } else {
        setTotalPoints(points)
      }
    }
  }, [currentLevel, experiencePoints, maxPoints, totalPoints, userYogaPoses]);  

  useEffect(() => {
    // Change the color every 5 levels up to level 35
    if (currentLevel <= 35 && currentLevel % 5 === 0) {
      const colorIndex = Math.floor((currentLevel - 1) / 5) % 7;
      setBarColor(colors[colorIndex]);
    }
  }, [currentLevel]);

  // if (userYogaPosesLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-16">
  //       <CircularProgress />
  //     </div>
  //   );
  // }
  const title = generateTitle(currentLevel);

  // Calculate the percentage of progress
  const progressPercentage = (totalPoints / maxPoints) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-4xl w-full mx-4 sm:mx-auto p-4 bg-white shadow-lg">
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
      <div className="mt-2 text-sm text-gray-500">{title}</div>
    </div>
  );
};

export default ExperienceBar;
