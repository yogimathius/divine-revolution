import { useContext } from "react";
import { AuthContext } from "../../context";
import { useGetYogaPosesQuery } from "../../graphql/hooks";
import { CircularProgress, Button } from "@mui/material";
import CompleteYogaPose from "../../components/Yoga/CompleteYogaPose";

interface YogaPose {
  poseId: string;
  poseName: string;
  poseDescription: string;
  posePoints: number;
}

const Yoga = () => {
  const { loading, error, data } = useGetYogaPosesQuery();
  const { user } = useContext(AuthContext);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-8 mt-8">
      <h2 className="text-2xl font-bold mb-4">Yoga Poses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.yogaPoses.map((pose: YogaPose) => (
          <div
            key={pose.poseName}
            className="flex flex-col justify-between bg-white rounded-lg shadow-md p-4 mb-4 space-y-2"
          >
            <h3 className="text-lg font-bold mb-2">{pose.poseName}</h3>
            <p className="text-gray-600">{pose.poseDescription}</p>
            <p className="mt-2">Pose Points: {pose.posePoints}</p>
            <CompleteYogaPose
              userId={user.id}
              poseId={pose.poseId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Yoga;
