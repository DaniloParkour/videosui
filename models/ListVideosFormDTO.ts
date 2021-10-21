import PaginationDTO from "./PaginationDTO"

export default class ListVideosFormDTO {
    pagination: PaginationDTO = new PaginationDTO()
    title: string = ''
    id: number = -1
  }
