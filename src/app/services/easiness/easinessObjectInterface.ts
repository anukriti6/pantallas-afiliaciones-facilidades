export interface IEasinessObject {
  id: number,
  name: string,
  quotes: {
    approved: number,
    available: number,
    blocked: number,
    used: number
    },
    status: string,
  related: boolean
}
