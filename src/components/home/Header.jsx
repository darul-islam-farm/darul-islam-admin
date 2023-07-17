import { IconMenu } from '@tabler/icons-react'
import { useAppContext } from 'utils/context'
export default function Header({ title }) {
  const { showHamberg, setShowHamberg } = useAppContext()
  return (
    <h1 className='header'>
      <button onClick={() => setShowHamberg(!showHamberg)}>
        <IconMenu size={48} strokeWidth={1.5} color={'#228BE6'} />
      </button>
      {title}
    </h1>
  )
}
