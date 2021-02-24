import styled from 'styled-components'
import { Button } from 'vtex.styleguide'

export const TipoCompraButton = styled.button`
  max-width: 88px;
  max-height: 32px;
  width: 88px;
  height: 32px;
  cursor: pointer;
  font-size: 0.95rem;
  border-radius: 4px;
  margin: 4px;

  background: white;
  border: 1px solid #666;
  color: #666;

  &:hover {
    border: 1px solid #1a438d;
    background: #f6f6f6;
    color: #1a438d;
    box-shadow: 2px 3px 6px -1px rgba(0, 0, 0, 0.4);
  }

  ${(props) =>
    props.disabled
      ? `
      background: #1a438d;
      color: #fefefe;
      border: none;
      &:hover {
        background: #1a438d;
        border: none;
        color: #fefefe;
        box-shadow: none;
      }
    `
      : null}
`

export const AddToCartButtonStyled = styled.button`
  background-color: #1a438d;
  background-image: url(https://arvitalqa.vteximg.com.br/arquivos/Cart.svg);
  background-repeat: no-repeat;
  background-position: center;
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 0 4px 4px 0;
  color: white;
  font-size: 0;
  padding: 0;
  cursor: pointer;
`

export const QtySelectorButton = styled.button`
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 0 4px 4px 0;
  color: #1a438d;
  font-size: 1rem;
  padding: 0;
  cursor: pointer;
`
