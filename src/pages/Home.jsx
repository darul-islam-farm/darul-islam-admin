import { Link } from 'react-router-dom'
import Header from 'components/home/Header'

export default function Home() {
  return (
    <div>
      <Header title='Home' />
      <div className='main'>
        <div className='text-center'>
          <Link to='/recharge' style={{ fontSize: '2rem', color: 'blue' }}>
            Go to Recharge
          </Link>
        </div>
      </div>
    </div>
  )
}
