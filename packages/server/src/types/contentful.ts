export interface OrderEntry {
  sys: {
      space: {
          sys: {
              type: 'Link',
              linkType: 'Space',
              id: string
          }
      },
      id: string,
      type: 'Entry',
      createdAt: string,
      updatedAt: string,
      environment: {
          sys: {
              id: string,
              type: 'Link',
              linkType: 'Environment'
          }
      },
      createdBy: {
          sys: {
              type: 'Link',
              linkType: 'User',
              id: string
          }
      },
      updatedBy: {
          sys: {
              type: 'Link',
              linkType: 'User',
              id: string
          }
      },
      publishedCounter: number,
      version: number,
      contentType: {
          sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'order'
          }
      }
  },
  fields: {
      orderId: {
        sv: string
      },
      raw: {
        sv: string
      }
  }
}
