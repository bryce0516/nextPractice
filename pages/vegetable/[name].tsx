import { useRouter } from 'next/router'
import React from 'react'

type Props = any

const name = (props: Props) => {
  const router = useRouter()

  
  console.log(props, router)
  return (
    <div>name</div>
  )
}

export default name