import { Button } from '@mui/material';
import { useExperience } from '../../context/useExperience';
import { useCompleteYogaPoseMutation } from '../../graphql/hooks';
import { Scalars } from '../../__generated__/graphql';

const CompleteYogaPose: React.FC<{
  userId: Scalars['ID'];
  poseId: string;
}> = ({ userId, poseId }) => {
  const { refetch } = useExperience();
  const { completeYogaPose } = useCompleteYogaPoseMutation()

  const handleCompleteYogaPose = () => {
    completeYogaPose(userId, poseId, new Date().toISOString())
      .then((updatedUserYogaPose) => {
        console.log('success: ', updatedUserYogaPose);
        
        refetch({id: userId});
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