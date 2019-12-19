import { Currency } from './currency.interface';
import { Language } from './language.interface';
import { RegionalBloc } from './regional-bloc.interface';
import { Translations } from './translations.interface';

export interface Country {
  name: string;
  topLevelDomain: Array<string>;
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: Array<string>;
  capital: string;
  altSpellings: Array<string>;
  region: string;
  subregion: string;
  population: number;
  latlng: Array<number>;
  demonym: string;
  area?: number;
  gini?: number;
  timezones: Array<string>;
  borders: Array<string>;
  nativeName: string;
  numericCode?: string;
  currencies: Array<Currency>;
  languages: Array<Language>;
  translations: Translations;
  flag: string;
  regionalBlocs: Array<RegionalBloc>;
  cioc?: string;
}