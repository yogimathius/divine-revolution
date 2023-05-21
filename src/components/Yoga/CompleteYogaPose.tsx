import { Button } from '@mui/material';
import { useExperience } from '../../context/useExperience';
import { useCompleteYogaPoseMutation } from '../../graphql/hooks';
import { Scalars } from '../../__generated__/graphql';
import { useEffect, useState } from 'react';

const CompleteYogaPose: React.FC<{
  userId: Scalars['ID'];
  poseId: string;
}> = ({ userId, poseId }) => {
    const currentDate = new Date().toISOString().split('T')[0];

  const [disabled, setDisabled] = useState(false);
  const { completeYogaPose } = useCompleteYogaPoseMutation()
  const completionCount = localStorage.getItem(`${poseId}-${currentDate}`)
  const [isMaxed, setIsMaxed] = useState(completionCount ? true : false)
  const { refetch } = useExperience();
 

  const handleCompleteYogaPose = () => {
    setDisabled(true);

    completeYogaPose(userId, poseId, new Date().toISOString())
      .then(() => {
        const updatedCount = completionCount ? parseInt(completionCount) + 1 : 1;
        localStorage.setItem(`${poseId}-${currentDate}`, updatedCount.toString());
        refetch({id: userId});
        if (updatedCount >= 10) {
          // Maximum limit reached, disable the button
          setDisabled(true);
          setIsMaxed(true)
          return;
        }
        
        setTimeout(() => {
          setDisabled(false);
        }, 500); 
      })
      .catch((error) => {
        // Handle error
        console.log('failed to complete: ', error);
      });
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];

    const completionCount = localStorage.getItem(`${poseId}-${currentDate}`);

    // Check if the completion count exceeds the daily maximum (e.g., 3 times)
    if (completionCount && parseInt(completionCount) >= 10) {
      // Maximum limit reached, disable the button
      setDisabled(true);
      // return;
    }
  }, [poseId])

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleCompleteYogaPose()}
      className="mt-4"
      disabled={disabled}
    >
      {isMaxed ? "Max Completed Today" : "Complete Pose"}
    </Button>
    );
};

export default CompleteYogaPose;