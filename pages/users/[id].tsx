import {useRouter} from 'next/router'
import {useQuery, gql} from '@apollo/client'
import Layout from 'components/Layout'
import UserCard from 'components/UserCard'
import { QueryDataUser, QueryVarsId } from 'graphql/types/user'

const USER_QUERY = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      name
      bio
      fellowship
      avatar_url
      projects {
        id
        name
        icon_url
      }
    }
  }
`

export default function UserPage() {
  const {query} = useRouter()

  const {data, error, loading} = useQuery<QueryDataUser, QueryVarsId>(
    USER_QUERY,
    {
      skip: !query.id,
      variables: {id: Number(query.id)},
    }
  )
  const user = data?.user;

  if (!user || loading || error) {
    return null
  }

  return (
    <Layout>
      <UserCard user={user} />
    </Layout>
  )
}
