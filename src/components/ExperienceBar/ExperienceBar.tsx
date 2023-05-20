import { useEffect, useState } from 'react';
import { UserYogaPose } from '../../context/ExperienceContext';
import useGenerateExperiencePoints from '../../hooks/useGenerateExperienceArray';


interface Props {
  userYogaPoses: UserYogaPose[]
}

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

  if (currentLevel <= titles.length * 5) {
    return titles[Math.floor(currentLevel / 5)];
  }

  // If the level exceeds the number of titles, return a generic title
  return "Master";
};


const ExperienceBar = ({ userYogaPoses }: Props) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [maxPoints, setMaxPoints] = useState(70);
  const [prevPoints, setPrevPoints] = useState(0);
  const [barColor, setBarColor] = useState('bg-blue-500'); // Default color

  const experiencePoints = useGenerateExperiencePoints(70)

  useEffect(() => {
    if (userYogaPoses) {
      const points = userYogaPoses.reduce(
        (accumulator, userYogaPose) =>
          accumulator + parseInt(userYogaPose.pose.posePoints, 10),
        0
      );

      setTotalPoints(points)
      if ((totalPoints - prevPoints) >= maxPoints) {
        setCurrentLevel((prevLevel) => prevLevel + 1);
        setMaxPoints(() => experiencePoints[currentLevel]); 
        setPrevPoints((prev) => prev + experiencePoints[currentLevel-1]); 
      }
    }
  }, [currentLevel, experiencePoints, maxPoints, prevPoints, totalPoints, userYogaPoses]);  

  useEffect(() => {
    // Change the color every 5 levels up to level 35
    if (currentLevel <= 35 && currentLevel % 5 === 0) {
      const colorIndex = Math.floor((currentLevel - 1) / 5) % 7;
      setBarColor(colors[colorIndex]);
    }
  }, [currentLevel]);

  const title = generateTitle(currentLevel);
  const progressPercentage = ((totalPoints - prevPoints) / maxPoints) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-4xl w-full mx-4 sm:mx-auto p-4 bg-white shadow-lg">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-600">Experience</div>
        <div className="text-lg font-semibold text-gray-600">
          {(totalPoints - prevPoints)} / {maxPoints}
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
