import { redirect } from "react-router-dom";

const loader = async () => {
  const storedToken = localStorage.getItem('authToken');

  if (!storedToken) {
    return redirect("/login");
  }
  return null;
};

export default loader;