type Language = {
  code: string;
  id: number;
  name: string;
  short_name: string;
};

export type GetLanguagesRequest = void;
export type GetLanguagesResponse = Language[];
