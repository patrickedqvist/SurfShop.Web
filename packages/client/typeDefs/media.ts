export type MediaType = 'Image' | 'Video'

export interface Media {
  type: MediaType
  src: string
  alt: string | null
  width?: number
  height?: number
}
