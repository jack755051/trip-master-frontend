export interface TripResponseDto {
  id: string;
  tags: string[];
  startTime: string;
  endTime: string;
  createdBy: string;
  likeAmount: number;
  title: string;
  subTitle: string;
  type: string;
}
