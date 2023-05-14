import { redirect } from "react-router-dom";

const authChecker = async () => {
  const storedToken = localStorage.getItem('authToken');
  
  if (!storedToken) {
    return redirect("/login");
  }
  return null
};

export default authChecker;
