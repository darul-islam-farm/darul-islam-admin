import Header from 'components/home/Header'
import RechargeTable from 'components/tables/RechargeTable'
import fetchData from 'lib/fetchData'

export default function Recharge() {
  const { data, loading, error, mutate } = fetchData('/get-recharge/pending')

  return (
    <div>
      <Header title='Pending Rechare Requests' />
      <div className='main'>
        <RechargeTable data={data} loading={loading} mutate={mutate} />
      </div>
    </div>
  )
}
