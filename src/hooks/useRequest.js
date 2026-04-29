// import { useEffect, useState } from 'react'
// import instance from '../axios'

// function useRequest(initialUrl, method = 'GET', requestData, config) {
//   const [url, setUrl] = useState(initialUrl)

//   const [{ data, loading, error }, execute] = instance(
//     {
//       url,
//       method,
//       data: requestData,
//       ...config,
//     },
//     { manual: true, autoCancel: false }
//   )

//   useEffect(() => {
//     setUrl(initialUrl)
//   }, [initialUrl])

//   const fetchData = async (newUrl, newMethod, newRequestData, newConfig) => {
//     if (newUrl) {
//       setUrl(newUrl)
//     }
//     try {
//       await execute({
//         url: newUrl || url,
//         method: newMethod || method,
//         data: newRequestData || requestData,
//         ...newConfig,
//       })
//     } catch (error) {
//       console.error('Error:', error)
//     }
//   }

//   return { data: data?.data ? data?.data : data, loading, error, fetchData }
// }

// export default useRequest

import { useState } from 'react'
import instance from '../axios'

function useRequest(initialUrl, method = 'GET', requestData, config) {
  const [url, setUrl] = useState(initialUrl)

  const [{ data, loading, error }, execute] = instance(
    {
      url,
      method,
      data: requestData,
      ...config,
    },
    { manual: true, autoCancel: false }
  )

  const fetchData = async (newUrl, newMethod, newRequestData, newConfig) => {
    if (newUrl) {
      setUrl(newUrl)
    }
    try {
      await execute({
        url: newUrl || url,
        method: newMethod || method,
        data: newRequestData || requestData,
        ...newConfig,
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return { data: data?.data ? data?.data : data ? data : [], loading, error, fetchData }
}

export default useRequest
