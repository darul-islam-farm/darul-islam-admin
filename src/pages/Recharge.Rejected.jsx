import Header from 'components/home/Header'
import RechargeTable from 'components/tables/RechargeTable'
import fetchData from 'lib/fetchData'

export default function RechargeRejected() {
  const { data, loading, error } = fetchData('/get-recharge/rejected')

  return (
    <div>
      <Header title='Rejected Requests' />
      <div className='main'>
        <RechargeTable data={data} loading={loading} noAction={true} />
      </div>
    </div>
  )
}
