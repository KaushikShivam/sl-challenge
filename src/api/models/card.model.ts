export interface Card {
  id: string;
  name: string;
  imageUrl: string;
  count: {
    total: number;
  };
}

export interface EditCardDto {
  name?: string;
  imageUrl?: string;
}
