import { CustomerStatus, CustomerType, IdentityType } from '@web-starter-kit/api-interfaces';

export interface Customer {
  id?: number;
  name: string;
  customerType?: CustomerType;
  identityNumber?: string;
  identityType?: IdentityType;
  country?: any;
  citizen?: boolean;
  registrationDate?: Date;
  status: CustomerStatus;
}
