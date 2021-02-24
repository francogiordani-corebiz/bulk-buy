/* eslint-disable */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context' // eslint-disable-import/group
import classNames from 'classnames'

import SellingPrice from './components/SellingPrice'
import AddToCartWrapper from './AddToCartWrapper'
import { TipoCompraButton, QtySelectorButton } from './styles'

import genTeaserText from './modules/genTeaserText'

import { Alert } from 'vtex.styleguide'

// import { useOrderItems } from 'vtex.order-items/OrderItems'
// import { useProductDispatch } from 'vtex.product-context'
// import { ProductPrice } from 'vtex.store-components'
// import { ProductSummaryContext } from 'vtex.product-summary-context'
// const { useProductSummary } = ProductSummaryContext

// Declare Handles for the react component to be accesible
const CSS_HANDLES = [
  'outerContainer',
  'innerContainer',
  'contentContainer',
  'marca',
  'descripcion',
  'precio',
  'informacion',
  'bulkBuySelector',
  'selector',
  'selectorUnidad',
  'selectorBulto',
  'tipoCompraButton',
  'buttonUnidad',
  'buttonBulto',
  'QtySelectorButton',
  'qtyPlus',
  'qty',
  'qtyMinus',
  'addToCart',
  'teaserText',
  'pdp',
  'notifications',
]

const TIPO_COMPRA_UNIDAD = 'unidad'

const TIPO_COMPRA_BULTO = 'bulto'

const PRODUCT_PAGE = 'store.product'

const ADD_TO_CART_NOTIFICATION_TIMEOUT = 3000

const ProductBox = ({ onProductPage = false }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { product, selectedItem } = useProduct()

  let productProperties = [
    { name: 'Uxb', values: ['0'] },
    { name: 'Factor', values: ['0'] },
  ]
  if (product) {
    if (product.properties) {
      productProperties = product.properties
    }
  }

  const UxB = Number(
    productProperties.filter((prop) => prop.name === 'Uxb')[0].values[0]
  )

  const factor = Number(
    productProperties.filter((prop) => prop.name === 'Factor')[0].values[0]
  )

  const showButtonUnidades = !!factor
  const showButtonBulto = !!UxB
  const defaultTipoCompra = showButtonUnidades
    ? TIPO_COMPRA_UNIDAD
    : TIPO_COMPRA_BULTO

  const [tipoCompra, setTipoCompra] = useState(defaultTipoCompra)

  const minQty = factor || 1
  const qtyMultiplier = UxB || 1
  const [quantityUnidad, setQuantityUnidad] = useState(minQty)
  const [quantityBulto, setQuantityBulto] = useState(qtyMultiplier)
  const [displayedQuantity, setDisplayedQuantity] = useState(
    tipoCompra === TIPO_COMPRA_UNIDAD ? quantityUnidad : quantityBulto
  )

  const [priceHighlight, setPriceHighlight] = useState(false)
  const [teaserText, setTeaserText] = useState(null)

  const [addToCartNotificationShow, setAddToCartNotificationShow] = useState(
    false
  )

  useEffect(() => {
    const teasers = selectedItem?.sellers[0].commertialOffer.teasers
    if (teasers) {
      if (teasers.length > 0) {
        console.log(product?.name, teasers)
        setPriceHighlight(true)
        setTeaserText(genTeaserText(teasers[0], UxB, tipoCompra))
      }
    }
  }, [selectedItem, tipoCompra])

  const addQty = () => {
    if (tipoCompra === TIPO_COMPRA_UNIDAD) {
      let qty = quantityUnidad + 1

      if (qty < minQty) qty = minQty
      setQuantityUnidad(qty)
      setDisplayedQuantity(qty)
    }

    if (tipoCompra === TIPO_COMPRA_BULTO) {
      let qty = quantityBulto + qtyMultiplier

      if (qty < qtyMultiplier) qty = qtyMultiplier
      setQuantityBulto(qty)
      setDisplayedQuantity(qty)
    }
  }

  const removeQty = () => {
    if (tipoCompra === TIPO_COMPRA_UNIDAD) {
      let qty = quantityUnidad - 1

      if (qty < minQty) qty = minQty
      setQuantityUnidad(qty)
      setDisplayedQuantity(qty)
    }

    if (tipoCompra === TIPO_COMPRA_BULTO) {
      let qty = quantityBulto - qtyMultiplier

      if (qty < qtyMultiplier) qty = qtyMultiplier
      setQuantityBulto(qty)
      setDisplayedQuantity(qty)
    }
  }

  useEffect(() => {
    if (tipoCompra === TIPO_COMPRA_UNIDAD) {
      setDisplayedQuantity(quantityUnidad)
    }

    if (tipoCompra === TIPO_COMPRA_BULTO) {
      setDisplayedQuantity(quantityBulto)
    }
  }, [tipoCompra, quantityUnidad, quantityBulto])

  useEffect(() => {
    setTipoCompra(defaultTipoCompra)
    setQuantityBulto(UxB)
    setQuantityUnidad(factor)
    if (defaultTipoCompra === TIPO_COMPRA_UNIDAD) {
      setDisplayedQuantity(quantityUnidad)
    } else {
      setDisplayedQuantity(quantityBulto)
    }
  }, [UxB, factor, defaultTipoCompra])

  useEffect(() => {
    setTimeout(() => {
      setAddToCartNotificationShow(false)
    }, ADD_TO_CART_NOTIFICATION_TIMEOUT)
  }, [addToCartNotificationShow])

  const showAddToCartNotification = (message) => {
    console.debug(`showAddToCartNotification ${message}`)
    setAddToCartNotificationShow(message)
  }

  if (!product) {
    return <div>Cargando...</div>
  }

  return (
    <div
      className={classNames(
        'mt7',
        'pa4',
        onProductPage ? handles.pdp : null,
        handles.outerContainer
      )}
      style={{ color: '#333' }}
    >
      <div className={classNames(handles.notifications)}></div>
      <div
        className={`${onProductPage ? handles.pdp : ''} ${
          handles.innerContainer
        }`}
      >
        {/* Editable props on SiteEditor */}
        <div
          className={classNames(
            'mb4',
            onProductPage ? handles.pdp : null,
            handles.outerContainer
          )}
        >
          <div
            className={`${onProductPage ? handles.pdp : ''} ${handles.marca}`}
          >
            {product?.brand || 'Sin Marca'}
          </div>
        </div>
        <div
          className={classNames(
            'mb4',
            onProductPage ? handles.pdp : null,
            handles.outerContainer
          )}
        >
          <div
            className={`${onProductPage ? handles.pdp : ''} ${
              handles.descripcion
            }`}
          >
            {product?.description || ''}
          </div>
        </div>
        <div
          className={classNames(
            'flex',
            onProductPage ? handles.pdp : null,
            handles.contentContainer
          )}
        >
          <div
            className={classNames(
              'flex',
              'flex-column',
              onProductPage ? handles.pdp : null,
              handles.contentContainer
            )}
          >
            <SellingPrice product={product} highlight={priceHighlight} />

            <div
              className={`${onProductPage ? handles.pdp : ''} ${
                handles.informacion
              }`}
              style={{ fontSize: '0.75rem' }}
            >
              <p className={classNames(handles.teaserText)}>{teaserText}</p>
              {tipoCompra === TIPO_COMPRA_BULTO ? (
                <p className={classNames('unidades-por-bulto')}>
                  {qtyMultiplier} unidades x bulto
                </p>
              ) : (
                factor && (
                  <p className={classNames('unidades-por-bulto')}>
                    Mínimo de compra {factor} unidades
                  </p>
                )
              )}
            </div>
          </div>
          <div
            className={classNames(
              'flex',
              'flex-column',
              onProductPage ? handles.pdp : null,
              handles.contentContainer
            )}
          >
            <div
              className={`${onProductPage ? handles.pdp : ''} ${
                handles.bulkBuySelector
              }`}
            >
              {showButtonUnidades ? (
                <div
                  className={classNames(
                    onProductPage ? handles.pdp : null,
                    handles.selector,
                    handles.selectorUnidad,
                    { active: true }
                  )}
                >
                  <TipoCompraButton
                    active={tipoCompra !== TIPO_COMPRA_UNIDAD}
                    disabled={tipoCompra === TIPO_COMPRA_UNIDAD}
                    className={
                      (classNames(onProductPage ? handles.pdp : null),
                      handles.tipoCompraButton,
                      handles.buttonUnidad)
                    }
                    onClick={(event) => {
                      event.stopPropagation()
                      event.preventDefault()
                      setTipoCompra(TIPO_COMPRA_UNIDAD)
                    }}
                  >
                    Unidades
                  </TipoCompraButton>
                </div>
              ) : null}
              {showButtonBulto ? (
                <div
                  className={classNames(
                    onProductPage ? handles.pdp : null,
                    handles.selector,
                    handles.selectorBulto,
                    {
                      active: false,
                    }
                  )}
                >
                  <TipoCompraButton
                    active={tipoCompra !== TIPO_COMPRA_BULTO}
                    disabled={tipoCompra === TIPO_COMPRA_BULTO}
                    className={
                      (classNames(onProductPage ? handles.pdp : null),
                      handles.tipoCompraButton,
                      handles.buttonBulto)
                    }
                    onClick={(event) => {
                      event.stopPropagation()
                      event.preventDefault()
                      setTipoCompra(TIPO_COMPRA_BULTO)
                    }}
                  >
                    Bulto
                  </TipoCompraButton>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div
          className={classNames(
            'flex',
            onProductPage ? handles.pdp : null,
            handles.contentContainer
          )}
        >
          {addToCartNotificationShow ? (
            <Alert type="success">
              {typeof addToCartNotificationShow === 'string'
                ? addToCartNotificationShow
                : 'Agregado al carrito'}
            </Alert>
          ) : (
            <>
              <div
                className={classNames('flex', handles.QtySelectorButton)}
                style={{ width: '50%', margin: 0, padding: 0 }}
              >
                <QtySelectorButton
                  className={`${handles.qtyMinus}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                    removeQty()
                  }}
                >
                  -
                </QtySelectorButton>
                <div
                  className={classNames(
                    'flex',
                    'align-center',
                    'justify-center',
                    onProductPage ? handles.pdp : null,
                    handles.qty
                  )}
                  style={{
                    width: '33%',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  }}
                >
                  <div>
                    {tipoCompra === TIPO_COMPRA_UNIDAD
                      ? displayedQuantity
                      : displayedQuantity / qtyMultiplier}
                  </div>
                </div>
                <QtySelectorButton
                  className={`${onProductPage ? handles.pdp : ''} ${
                    handles.qtyPlus
                  }`}
                  onClick={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                    addQty()
                  }}
                >
                  +
                </QtySelectorButton>
              </div>
              <AddToCartWrapper
                className={`${onProductPage ? handles.pdp : ''} ${
                  handles.addToCart
                }`}
                // available
                selectedQuantity={displayedQuantity}
                //showToast={showToast}
                addToCartFeedback="customEvent"
                customFeedbackEvent={showAddToCartNotification}
                unavailableText="No disponible"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// This is the schema form that will render the editable props on SiteEditor
ProductBox.schema = {
  title: 'Product Box',
  description:
    'Permitir al cliente seleccionar compra por unidad o por bulto (tomando en cuenta el factor y UxB del producto)',
  type: 'object',
  properties: {
    onProductPage: {
      title: 'Product box rendered for product detail shelf',
      description:
        'If this product-box belongs in a group of shelves, set this to false',
      type: 'bool',
      default: false,
    },
  },
}

export default ProductBox
