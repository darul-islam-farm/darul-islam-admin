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
import { IconCheck, IconX, IconSearch, IconTrash } from '@tabler/icons-react'
import Swal from 'sweetalert2'
import TableSkeleton from './TableSkeleton'
import useSwalPrompt from 'lib/useSwalPrompt'
import { useMemo, useState } from 'react'
import requests from 'service/http'
import dayjs from 'dayjs'
import useSwalSuccess from 'lib/useSwalSuccess'

export default function UserTable({ data, loading = true, pending, mutate }) {
  const [searchKey, setSearchKey] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 5
  const slicedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data?.slice(startIndex, endIndex)
  }, [data, page])
  const searchedData = useMemo(() => {
    return slicedData?.filter(item => item.phone.includes(searchKey))
  }, [slicedData, searchKey])

  const acceptRequest = async item => {
    const { name, phone, address, gender, type, identity } = item
    const { value: did } = await Swal.fire({
      title: 'দারুল ইসলাম আইডি দিন',
      input: 'text',
      inputLabel: 'ইউজারের আইডি',
      inputValidator: value => {
        if (!value) {
          return 'ইউজারের আইডি দিতে হবে'
        }
      }
    })
    if (did) {
      requests
        .post('/create-user', {
          id: item._id,
          did,
          name,
          phone,
          address,
          gender,
          type,
          identity: Number(identity)
        })
        .then(res => {
          if (res.message === 'ok') {
            mutate()
            Swal.fire('সফলভাবে ইউজার ক্রিয়েট হয়েছে')
          }
        })
        .catch(error => {
          Swal.fire('Error occurred, try again', error.message)
        })
    }
  }
  const rejectRequest = item => {
    requests
      .delete(`/delete-pending-user/${item._id}`)
      .then(res => {
        if (res.message === 'ok') {
          mutate()
          useSwalSuccess('Successfully deleted the pending user')
        }
      })
      .catch(error => {
        Swal.fire('Error occurred, try again', error.message)
      })
  }
  const deleteUser = item => {
    requests
      .delete(`/delete-user/${item._id}`)
      .then(res => {
        if (res.message === 'ok') {
          mutate()
          useSwalSuccess('Successfully deleted the user')
        }
      })
      .catch(error => {
        Swal.fire('Error occurred, try again', error.message)
      })
  }

  const handler = (type, item) => {
    switch (type) {
      case 'accept':
        useSwalPrompt('The user will be created.', () => acceptRequest(item))
        break
      case 'reject':
        useSwalPrompt('The pending user will be deleted!', () =>
          rejectRequest(item)
        )
        break
      case 'delete':
        useSwalPrompt('This user will be deleted from the database!', () =>
          deleteUser(item)
        )
        break
      default:
        alert(`Invalid type: ${type}`)
        break
    }
  }

  const rows = searchedData?.length
    ? searchedData.map(item => (
        <tr key={item._id}>
          <td>
            <Text fz='md' fw={500}>
              {item.name}
            </Text>
          </td>
          <td>
            <Text fz='sm' c='dimmed'>
              {item.phone}
            </Text>
          </td>
          <td>
            <Badge
              color={
                item.type === 'nid'
                  ? 'teal'
                  : item.type === 'birth'
                  ? 'pink'
                  : 'teal'
              }
              variant='filled'
            >
              {item.type}
            </Badge>
          </td>
          <td>
            <Anchor size='sm'>{item.identity}</Anchor>
          </td>
          <td>
            <Text fz='sm' c='dimmed'>
              {dayjs(item.createAt).format('DD MMM, YY"')}
            </Text>
          </td>

          <td>
            {pending ? (
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
            ) : (
              <Button
                onClick={() => handler('delete', item)}
                variant='filled'
                mr={15}
                color='red'
                uppercase
              >
                <IconTrash size={30} strokeWidth={1.5} color={'white'} />
              </Button>
            )}
          </td>
        </tr>
      ))
    : !loading && (
        <Text color='red' fw={800} fz='xl' tt='capitalize' mt={20}>
          No data
        </Text>
      )

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
            <th>PHONE</th>
            <th>TYPE</th>
            <th>IDENTITY</th>
            <th>DATE</th>
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
