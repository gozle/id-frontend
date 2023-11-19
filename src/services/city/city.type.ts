type City = {
  id: number;
  name: string;
  slug: string;
};

export type GetCitiesRequest = { lang: string; regionId: number };
export type GetCitiesResponse = City[];
