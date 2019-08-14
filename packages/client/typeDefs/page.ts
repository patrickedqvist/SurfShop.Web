export interface Page {
    slug: string
    content: {
        title: string
        body: string
        author: string
    },
    meta: {
        published: string
    }
}