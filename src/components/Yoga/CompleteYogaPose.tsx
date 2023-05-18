import { Button } from '@mui/material';
import { useExperience } from '../../context/ExperienceContext';
import { useCompleteYogaPoseMutation } from '../../graphql/hooks';

const CompleteYogaPose: React.FC<{
  userId: string;
  poseId: string;
}> = ({ userId, poseId }) => {
  const { updateUserYogaPose } = useExperience();
  const { completeYogaPose } = useCompleteYogaPoseMutation()

  const handleCompleteYogaPose = () => {
    completeYogaPose(userId, poseId, new Date().toISOString())
      .then((updatedUserYogaPose) => {
        updateUserYogaPose([updatedUserYogaPose.createUserYogaPose]);
      })
      .catch((error) => {
        // Handle error
        console.log('failed to complete: ', error);
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleCompleteYogaPose()}
      className="mt-4"
    >
      Complete Pose
    </Button>
    );
};

export default CompleteYogaPose;