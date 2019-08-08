export type MediaType = 'Image' | 'Video'

export interface Media {
    mediaType: MediaType,
    url: string,
    alt: string | null
}