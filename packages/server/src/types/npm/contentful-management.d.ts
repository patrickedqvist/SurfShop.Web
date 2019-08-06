declare module 'contentful-management' {

  export interface ClientOptions {
    accessToken: string
  }

  export function createClient(options: ClientOptions): any;
}
