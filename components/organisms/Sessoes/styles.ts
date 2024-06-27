'use client'

import { darken } from 'polished'
import styled from 'styled-components'
function isDarkColor(color: string): boolean {
  color = color.trim()

  let r = 0,
    g = 0,
    b = 0

  if (color.startsWith('#')) {
    const hex = color.substring(1)
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  } else if (color.startsWith('rgb')) {
    const match = color.match(/(\d+),\s*(\d+),\s*(\d+)/)
    if (match) {
      r = parseInt(match[1])
      g = parseInt(match[2])
      b = parseInt(match[3])
    }
  } else {
    throw new Error('Formato de cor inválido')
  }

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance < 0.5
}

export const ButtonHora = styled.div.attrs<{ $bg?: string }>((props) => ({
  type: 'text',
  $bg: props.$bg || '#fff'
}))<{ $bg?: string }>`
  background-color: ${(props) => props.$bg} !important;
  cursor: pointer;
  color: ${(props) => (isDarkColor(props.$bg!) ? '#fff' : '#000')};
`

export const LinkHora = styled.a.attrs<{ $color?: string }>((props) => ({
  type: 'text',
  $color: props.$color || '#000'
}))<{ $color?: string }>`
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2rem;
  color: #000;
  border: 2px solid ${(props) => props.$color};

  &:hover {
    background-color: ${(props) => props.$color};
    color: ${(props) => (isDarkColor(props.$color!) ? '#fff' : '#000')};
  }
`

export const LinkLocation = styled.a.attrs<{ $color?: string }>((props) => ({
  type: 'text',
  $color: props.$color || '#000'
}))<{ $color?: string }>`
  svg {
    color: ${(props) => props.$color};
    font-size: 2.5rem;
    padding: 5px;
    border-radius: 5px;
    box-sizing: content-box;
    border: 2px solid ${(props) => props.$color};
    transition: 100ms all ease-in;
    &:hover {
      color: ${(props) => darken(0.2, props.$color || '')};
      border: 2px solid ${(props) => darken(0.2, props.$color || '')};
    }
  }
`

export const SelectLocation = styled.select.attrs<{ $color?: string }>(
  (props) => ({
    type: 'text',
    $color: props.$color || '#000'
  })
)<{ $color?: string }>`
  border: 2px solid ${(props) => props.$color} !important;
`
