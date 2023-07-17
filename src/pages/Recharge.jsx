import Header from 'components/home/Header'
import RechargeTable from 'components/tables/RechargeTable'
import fetchData from 'lib/fetchData'

export default function Recharge() {
  const { data, loading, error } = fetchData('/get-recharge')

  return (
    <div>
      <Header title='Rechare Request' />
      <div className='main'>
        <RechargeTable data={data} loading={loading} />
      </div>
    </div>
  )
}
