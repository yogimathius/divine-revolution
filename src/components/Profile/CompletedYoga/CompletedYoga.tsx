import { useExperience } from "../../../context/useExperience";
import { CircularTracker } from "../../CircularTracker";

interface AccumulatedPoints {
  [key: string]: {
    pose: string;
    progress: number
  };
}

const CompletedYoga = () => {
  const { userYogaPoses } = useExperience();

  const accumulatedPointsPerPose = userYogaPoses.reduce((accumulator: AccumulatedPoints, userYogaPose) => {
    const { pose } = userYogaPose;
    const { poseName, posePoints } = pose;
    
    if (!accumulator[poseName]) {
      accumulator[poseName] = {
        pose: poseName,
        progress: parseInt(posePoints)
      };
    } else {
      accumulator[poseName].progress +=  parseInt(posePoints);
    }
    
    return accumulator;
  }, {});
  
  console.log(accumulatedPointsPerPose);
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      {Object.keys(accumulatedPointsPerPose).map((pointsKey, index) => {
        const accumulatedPose = accumulatedPointsPerPose[pointsKey];
        return (
          <div key={`${accumulatedPose.pose}-${index}`}>
            <CircularTracker pose={accumulatedPose.pose} progress={accumulatedPose.progress} />
          </div>
        );
      })}
    </div>

  )
}

export default CompletedYoga
