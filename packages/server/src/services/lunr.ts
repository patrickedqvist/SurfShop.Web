import * as lunr from 'lunr'

import * as products from '../db/products.json'

const searchIndex = lunr(function() {
  this.ref('id')
  this.field('title')
  this.field('excerpt')

  products.forEach(function(product) {
    this.add({
      id: product.id,
      title: product.title,
      excerpt: product.excerpt,
    })
  }, this)
})

export default searchIndex
