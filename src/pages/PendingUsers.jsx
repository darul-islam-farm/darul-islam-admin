import Header from 'components/home/Header'
import fetchData from 'lib/fetchData'
import UserTable from 'components/tables/UserTable'

export default function PendingUsers() {
  const { data, loading, mutate } = fetchData('/pending-users')
  return (
    <div>
      <Header title='Home' />
      <div className='main'>
        <UserTable
          data={data?.response}
          loading={loading}
          pending={true}
          mutate={mutate}
        />
      </div>
    </div>
  )
}
