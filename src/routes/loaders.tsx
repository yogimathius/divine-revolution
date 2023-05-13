import { redirect } from "react-router-dom";

const authChecker = async () => {
  const storedToken = localStorage.getItem('authToken');
  console.log('token in loader: ', storedToken);
  
  if (!storedToken) {
    return redirect("/login");
  }
  return null
};

export default authChecker;
