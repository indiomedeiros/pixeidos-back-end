export class Image {
  constructor(
    public readonly id: string,
    public readonly subtitle: string,
    public readonly author: string,
    public readonly date: Date,
    public readonly file: string,
    public readonly tags: string[],
    public readonly collection: string
  ) {}
}

export interface ImageInputDTO {
  subtitle: string;
  file: string;
  tags: string[];
  collection: string;
  token: string
}

