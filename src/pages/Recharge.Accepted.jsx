import Header from 'components/home/Header'
import RechargeTable from 'components/tables/RechargeTable'
import fetchData from 'lib/fetchData'

export default function RechargeAccepted() {
  const { data, loading, error } = fetchData('/get-recharge/accepted')

  return (
    <div>
      <Header title='Accepted Requests' />
      <div className='main'>
        <RechargeTable data={data} loading={loading} noAction={true} />
      </div>
    </div>
  )
}
