import React, { memo, useEffect } from 'react'
import { BounceSpinner } from '../../components'

import './PageLoading.css'

function PageLoading({ loading }) {
  useEffect(() => {
    if (loading) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "auto"
    }
  }, [loading])

  if (!loading) {
    return null
  }

  return (
    <div className="page-loading">
      <BounceSpinner isOpen={true} />
    </div>
  )
}

export default memo(PageLoading)