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
import requests from 'service/http'
import useSwalSuccess from 'lib/useSwalSuccess'

export default function RechargeTable({
  data,
  loading = true,
  noAction,
  mutate
}) {
  const [searchKey, setSearchKey] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 5
  const slicedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data?.slice(startIndex, endIndex)
  }, [data, page])
  const searchedData = useMemo(() => {
    return slicedData?.filter(item => item.number.includes(searchKey))
  }, [slicedData, searchKey])

  const acceptRequest = async item => {
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
      requests
        .post('/accept-recharge', { amount, user: item.user._id, id: item._id })
        .then(res => {
          if (res.message === 'ok') {
            mutate()
            Swal.fire(
              `Success on posting amount ${amount} taka to user: ${item.user.name} | ${item.user.did}`
            )
          }
        })
        .catch(error => {
          Swal.fire('Error occurred, try again', error.message)
        })
    }
  }
  const rejectRequest = item => {
    requests
      .post('/discard-recharge', { id: item._id, user: item.user._id })
      .then(res => {
        mutate()
        if (res.message === 'ok') {
          useSwalSuccess('Successfully rejected the recharge request')
        }
      })
      .catch(error => {
        Swal.fire('Error occurred, try again', error.message)
      })
  }

  const handler = (type, item) => {
    if (type === 'accept') {
      useSwalPrompt('The user will be recharged.', () => acceptRequest(item))
    } else if (type === 'reject')
      useSwalPrompt('The request will be Rejected!', () => rejectRequest(item))
  }

  const rows = searchedData?.map(item => (
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

      {!noAction && (
        <td>
          <Button.Group>
            <Button
              onClick={() => handler('accept', item)}
              variant='subtle'
              mr={15}
              color='teal'
              uppercase
            >
              <IconCheck size={35} strokeWidth={1.5} color={'#20C997'} />
            </Button>
            <Button
              onClick={() => handler('reject', item)}
              variant='subtle'
              color='red'
              uppercase
            >
              <IconX size={35} strokeWidth={1.5} color={'red'} />
            </Button>
          </Button.Group>
        </td>
      )}
    </tr>
  ))

  return (
    <ScrollArea>
      <TextInput
        placeholder='Search by phone number'
        mb='md'
        type='number'
        icon={<IconSearch size='1.3rem' stroke={3} />}
        value={searchKey}
        onChange={e => setSearchKey(e.target.value)}
      />
      <Table sx={{ minWidth: 800 }} verticalSpacing='sm'>
        <thead>
          <tr>
            <th>NAME</th>
            <th>METHOD</th>
            <th>NUMBER</th>
            <th>TRX</th>
            {!noAction && <th>ACTIONS</th>}
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
