import { Button } from "@mui/material"
import { User } from "../../../__generated__/graphql"

interface Props {
  user: Partial<User>
  handleEdit: () => void
}

const Show = ({user, handleEdit}: Props) => {
  return (
    <div className=" border-b border-gray-300 p-6  ">
    <h2 className="text-2xl font-bold mb-4">Profile</h2>
    <div className="pb-4 mb-4">
      <p className="text-lg font-semibold">
        <span className="text-blue-600">Username:</span> {user.username}
      </p>
      <p className="text-lg font-semibold">
        <span className="text-blue-600">Email:</span> {user.email}
      </p>
    </div>
    <div>
      <p className="text-lg font-semibold">
        <span className="text-blue-600">Bio:</span> {user.bio}
      </p>
    </div>
    <div className="flex justify-end mt-4">
        <Button onClick={() => handleEdit()}>Edit</Button>
      </div>
  </div>
  )
}

export default Show
