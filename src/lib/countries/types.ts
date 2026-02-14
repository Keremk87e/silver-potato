export type CountryDTO = {
  cca3: string;
  name: string;
  officialName: string;
  region: string;
  subregion?: string;
  population: number;
  capital?: string;
  languages: string[];
  currencies: string[];
  flagPng?: string;
  mapsUrl?: string;
  borders: string[];
};
