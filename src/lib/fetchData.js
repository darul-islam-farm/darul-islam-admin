import useSWR from 'swr'

export default function fetchData(uri) {
  const fetcher = async () => {
    const response = await fetch(process.env.REACT_APP_URI + uri)
    const parsed = response.json()
    return parsed
  }
  const { data, error, isLoading, mutate } = useSWR(uri, fetcher, {
    revalidate: false
  })

  return {
    data: data?.response,
    loading: isLoading,
    error,
    mutate
  }
}
