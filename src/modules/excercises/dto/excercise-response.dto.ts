export type ResourceResponseDto = {
  id: string;
  type: string;
  title: string | null;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ExcerciseResponseDto = {
  id: string;
  userId: string;
  name: string;
  description: string;
  descriptionRichText: unknown | null;
  timeboxSeconds: number;
  resources: ResourceResponseDto[];
  createdAt: Date;
  updatedAt: Date;
};

