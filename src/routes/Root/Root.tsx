import { Outlet } from 'react-router-dom'
import { Nav } from '../../components'
import { AuthContext } from '../../context'
import { ExperienceBar } from '../../components/Profile'
import { useContext, useEffect } from 'react'
import { useExperience } from '../../context/useExperience'
import { useGetUserQuery } from '../../graphql/hooks'
import { useLocalStorage } from '../../hooks'

const Root = () => {
  const [userId] = useLocalStorage("userId")
  const { getUserData, data }  = useGetUserQuery()
  const { user, setUser } = useContext(AuthContext);

  const { userYogaPoses, getUserYogaPoseData } = useExperience();

  useEffect(() => {
    if (userId) {
      getUserData(userId)
      getUserYogaPoseData(userId)
    }
  }, [getUserData, getUserYogaPoseData, userId])

  useEffect(() => {
    if (data) {
      setUser(data.user)
    }
  }, [data, setUser, user])


  return (
    <>
      <Nav />
      <Outlet />
      {user ? (
        <ExperienceBar userYogaPoses={userYogaPoses} />

      ) : null}
    </>
  )
}

export default Root
