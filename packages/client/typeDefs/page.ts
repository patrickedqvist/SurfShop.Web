export interface Page {
  slug: string
  template: 'Category' | 'Normal Page' | 'Landing Page'
  content: {
    title: string
    preamble: string
    body: string
    author: string
  }
  meta: {
    published: string
  }
}
