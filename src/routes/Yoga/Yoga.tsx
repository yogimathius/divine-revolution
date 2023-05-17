import { useContext } from "react";
import { AuthContext } from "../../context";
import { useCompleteYogaPoseMutation, useGetYogaPosesQuery } from "../../graphql/hooks";
import { CircularProgress, Button } from "@mui/material";

interface YogaPose {
  poseId: string;
  poseName: string;
  poseDescription: string;
  posePoints: number;
}

const Yoga = () => {
  const { loading, error, data } = useGetYogaPosesQuery();
  const { error: completeYogaPoseError, completeYogaPose } = useCompleteYogaPoseMutation()
  const { user } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(user);
  
  return (
    <div className="container mx-auto py-8 mt-8">
      <h2 className="text-2xl font-bold mb-4">Yoga Poses</h2>

      {data?.yogaPoses.map((pose: YogaPose) => (
        <div
          key={pose.poseName}
          className="bg-white rounded-lg shadow-md p-4 mb-4"
        >
          <h3 className="text-lg font-bold mb-2">{pose.poseName}</h3>
          <p className="text-gray-600">{pose.poseDescription}</p>
          <p className="mt-2">Pose Points: {pose.posePoints}</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => completeYogaPose(user.id, pose.poseId, new Date().toISOString())}
            className="mt-4"
          >
            Complete Pose
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Yoga;
