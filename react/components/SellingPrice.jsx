/* eslint-disable */
import React from 'react'
import classNames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['precio', 'teaserHighlight']

const SellingPrice = ({ product, highlight = false }) => {
  const handles = useCssHandles(CSS_HANDLES)

  const sellingPrice = product?.priceRange?.sellingPrice?.highPrice || null
  // const listPrice = product.priceRange.listPrice.highPrice || null

  const formatPrice = (price) => {
    return (
      Number(price)
        .toLocaleString('en-US', {
          style: 'currency',
          currency: 'ARS',
          useGrouping: true,
        })
        // .replace(/\.(\d{2,})/g, '')
        .replace('ARS', '$')
        .replace('.', ',')
    )
  }

  const teaserHighlightHandle = highlight ? handles.teaserHighlight : null

  return (
    <div className={classNames(handles.precio, teaserHighlightHandle)}>
      {formatPrice(sellingPrice)}
    </div>
  )
}

export default SellingPrice
