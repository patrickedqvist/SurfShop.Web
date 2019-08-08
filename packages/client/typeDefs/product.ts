import { Media } from './media';

export interface ProductVariantSize {
    articleId: string
    title: string
    shortTitle: string
    stockBalance: number
}

export interface ProductVariantColor {
    title: string
    id: string
    filterColor: string
}

export interface ProductVariantPrice {
    regularPrice: number,
    salePrice: number | null
}

export interface ProductVariant {
    id: string
    images: Media[]
    sizes: ProductVariantSize[]
    color: ProductVariantColor
    price: ProductVariantPrice
    modelWearingLabel: string | null
}

export interface ProductCategory {
    title: string
    id: string | null
    type: 'Category'
}

export interface Product {
    excerpt: string
    featuredMedia: Media
    images: Media[]    
    variants: ProductVariant[]
    categories: ProductCategory[]    
    title: string
    label: string
    slug: string   
}