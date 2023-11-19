type Region = {
  id: number;
  name: string;
  slug: string;
};

export type GetRegionsRequest = { lang: string };
export type GetRegionsResponse = Region[];
