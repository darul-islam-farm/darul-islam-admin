import { Skeleton } from '@mantine/core'

export default function TableSkeleton({ n, r = 5 }) {
  const columns = new Array(n).fill(0)
  const rows = new Array(r).fill(0)
  return (
    <tbody>
      {rows.map((item, idx) => (
        <tr key={idx}>
          {columns.map((item, i) => (
            <td key={i}>
              <Skeleton height={30} mt={10} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
