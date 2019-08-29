import { Media } from './media';

export interface ProductVariantSize {
    articleId: string
    title: string
    shortTitle: string
    stockBalance: number
}

export interface ProductVariantColor {
    id: string
    hex: string
    title: string
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
    slug: string | null
    type: 'Category'
}

export interface ProductLabel {
    id: string
    title: string
}

export interface ProductAttribute {
    id: number
    name : string,
    position : number
    visible : boolean
    variation : boolean
    options : string[]
}

export interface Product {
    id: number
    title: string    
    slug: string  
    excerpt: string
    price: number
    labels: ProductLabel[]  
    images: Media[]    
    categories: ProductCategory[]
    attributes: ProductAttribute[]     
}