import { Outlet } from 'react-router-dom';
import {Nav} from '../../components';

const Root = () => {
  return (
    <div>
      <Nav />
      <Outlet /> {/* This renders the child route components */}
    </div>
  );
};

export default Root;
