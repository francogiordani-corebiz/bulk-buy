const TIPO_COMPRA_UNIDAD = 'unidad'
const TIPO_COMPRA_BULTO = 'bulto'

/**
 *  Si la cantidad minima es menor a la cantidad UxB, entonces el minimo de bultos
 * para que se aplique la promo debe ser = 1
 * Si es mayor, debe ser por lo menos el doble para que el minimo de bultos sea mayor a 1
 *
 * Por el contrario, si se selecciona comprar por unidades, es mas sencillo porque solo mostramos
 * la cantidad minima de la promocion tal cual se configuro
 *
 */

const plural = (qty, suffix) => {
  return `${qty > 1 ? suffix : ''}`
}

export default function genTeaserText(teaser, UxB, tipoCompra) {
  const { minimumQuantity } = teaser?.conditions

  if (tipoCompra === TIPO_COMPRA_BULTO) {
    const min = Math.ceil(minimumQuantity / UxB)
    if (minimumQuantity < UxB) {
      return `Llevando desde ${minimumQuantity} unidad${plural(
        minimumQuantity,
        'es'
      )}`
    }
    return `Llevando desde ${min} bulto${plural(min, 's')}`
  } else if (tipoCompra === TIPO_COMPRA_UNIDAD) {
    return `Llevando desde ${minimumQuantity} unidad${plural(
      minimumQuantity,
      'es'
    )}`
  }

  return `Llevando desde ${minimumQuantity} unidad${plural(
    minimumQuantity,
    'es'
  )}`
}
