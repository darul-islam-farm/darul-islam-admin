import Header from 'components/home/Header'
import fetchData from 'lib/fetchData'
import UserTable from 'components/tables/UserTable'

export default function Home() {
  const { data, loading, mutate } = fetchData('/get-users')
  return (
    <div>
      <Header title='Home' />
      <div className='main'>
        <UserTable
          data={data?.response}
          noAction={true}
          mutate={mutate}
          loading={loading}
        />
      </div>
    </div>
  )
}
