import {
  Badge,
  Table,
  Text,
  Button,
  TextInput,
  Anchor,
  ScrollArea,
  Pagination
} from '@mantine/core'
import { IconCheck, IconX, IconSearch } from '@tabler/icons-react'
import Swal from 'sweetalert2'
import TableSkeleton from './TableSkeleton'
import useSwalPrompt from 'lib/useSwalPrompt'
import { useMemo, useState } from 'react'

export default function RechargeTable({ data, loading = true }) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 4
  const slicedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data?.slice(startIndex, endIndex)
  }, [data, page])
  const handlePrompt = async () => {
    const { value: amount } = await Swal.fire({
      title: 'Input amount',
      input: 'number',
      inputLabel: 'Your amount',
      inputValidator: value => {
        if (!value) {
          return 'Enter a number value'
        }
      }
    })

    if (amount) {
      // axios
      //   .post('/amount', { amount })
      //   .then(res => {
      //     Swal.fire('Success on posting amount')
      // })
      // .catch(error => {
      //   Swal.fire('Error occurred')
      // })
      setTimeout(() => {
        Swal.fire(`Success on posting amount ${amount} taka`)
      }, 2000)
    }
  }

  const handler = type => {
    if (type === 'accept') {
      useSwalPrompt('The user will be recharged.', handlePrompt)
    }
  }

  const rows = slicedData?.map(item => (
    <tr key={item._id}>
      <td>
        <Text fz='md' fw={500}>
          {item.user.name}
        </Text>
        <Text fz='xs' c='dimmed' tt='uppercase'>
          {item.user.did}
        </Text>
      </td>

      <td>
        <Badge
          color={
            item.method === 'Bkash'
              ? 'pink'
              : item.method === 'Nagad'
              ? 'orange'
              : 'teal'
          }
          variant='filled'
        >
          {item.method}
        </Badge>
      </td>
      <td>
        <Text fz='sm' c='dimmed'>
          {item.number}
        </Text>
      </td>
      <td>
        <Anchor size='sm'>{item.trx}</Anchor>
      </td>

      <td>
        <Button.Group>
          <Button
            onClick={() => handler('accept')}
            variant='subtle'
            mr={15}
            color='teal'
            uppercase
          >
            <IconCheck size={35} strokeWidth={1.5} color={'#20C997'} />
          </Button>
          <Button
            onClick={() => handler('reject')}
            variant='subtle'
            color='red'
            uppercase
          >
            <IconX size={35} strokeWidth={1.5} color={'red'} />
          </Button>
        </Button.Group>
      </td>
    </tr>
  ))

  return (
    <ScrollArea>
      <TextInput
        placeholder='Search by any field'
        mb='md'
        icon={<IconSearch size='0.9rem' stroke={1.5} />}
        // value={search}
        // onChange={handleSearchChange}
      />
      <Table sx={{ minWidth: 800 }} verticalSpacing='sm'>
        <thead>
          <tr>
            <th>NAME</th>
            <th>METHOD</th>
            <th>NUMBER</th>
            <th>TRX</th>
            <th>ACTIONS</th>
            <th />
          </tr>
        </thead>
        {loading && <TableSkeleton n={5} />}
        <tbody>{rows}</tbody>
      </Table>
      <div className='text-center'>
        <Pagination
          style={{ justifyContent: 'center' }}
          mt={20}
          value={page}
          onChange={setPage}
          total={Math.ceil(data?.length / itemsPerPage)}
        />
      </div>
    </ScrollArea>
  )
}
