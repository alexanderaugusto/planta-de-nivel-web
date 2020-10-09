import React, { memo } from 'react'
import { BounceLoader as ReactBounceLoader } from 'react-spinners'

function BounceLoader({ isOpen }) {
  if (!isOpen) {
    return null
  }

  return (
    <>
      <ReactBounceLoader size={60} color="#4A6D7C"/>
    </>
  )
}

export default memo(BounceLoader)