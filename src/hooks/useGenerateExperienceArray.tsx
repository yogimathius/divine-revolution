import { useMemo } from 'react';

const useGenerateExperiencePoints = (maxPoints: number) => {
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
  }, [maxPoints]);

  return experiencePoints;
};

export default useGenerateExperiencePoints