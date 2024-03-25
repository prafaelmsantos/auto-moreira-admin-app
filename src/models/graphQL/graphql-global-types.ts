/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum FUEL {
  DIESEL = "DIESEL",
  HYBRID = "HYBRID",
  PETROL = "PETROL",
}

export enum STATUS {
  CLOSED = "CLOSED",
  OPEN = "OPEN",
}

export enum SortEnumType {
  ASC = "ASC",
  DESC = "DESC",
}

export enum TRANSMISSION {
  AUTOMATIC = "AUTOMATIC",
  MANUAL = "MANUAL",
}

export interface BooleanOperationFilterInput {
  eq?: boolean | null;
  neq?: boolean | null;
}

export interface ClientMessageFilterInput {
  and?: ClientMessageFilterInput[] | null;
  or?: ClientMessageFilterInput[] | null;
  name?: StringOperationFilterInput | null;
  email?: StringOperationFilterInput | null;
  phoneNumber?: ComparableInt64OperationFilterInput | null;
  message?: StringOperationFilterInput | null;
  status?: STATUSOperationFilterInput | null;
  createdDate?: ComparableDateTimeOperationFilterInput | null;
  id?: ComparableInt32OperationFilterInput | null;
}

export interface ClientMessageSortInput {
  name?: SortEnumType | null;
  email?: SortEnumType | null;
  phoneNumber?: SortEnumType | null;
  message?: SortEnumType | null;
  status?: SortEnumType | null;
  createdDate?: SortEnumType | null;
  id?: SortEnumType | null;
}

export interface ComparableDateTimeOperationFilterInput {
  eq?: any | null;
  neq?: any | null;
  in?: any[] | null;
  nin?: any[] | null;
  gt?: any | null;
  ngt?: any | null;
  gte?: any | null;
  ngte?: any | null;
  lt?: any | null;
  nlt?: any | null;
  lte?: any | null;
  nlte?: any | null;
}

export interface ComparableDoubleOperationFilterInput {
  eq?: number | null;
  neq?: number | null;
  in?: number[] | null;
  nin?: number[] | null;
  gt?: number | null;
  ngt?: number | null;
  gte?: number | null;
  ngte?: number | null;
  lt?: number | null;
  nlt?: number | null;
  lte?: number | null;
  nlte?: number | null;
}

export interface ComparableInt32OperationFilterInput {
  eq?: number | null;
  neq?: number | null;
  in?: number[] | null;
  nin?: number[] | null;
  gt?: number | null;
  ngt?: number | null;
  gte?: number | null;
  ngte?: number | null;
  lt?: number | null;
  nlt?: number | null;
  lte?: number | null;
  nlte?: number | null;
}

export interface ComparableInt64OperationFilterInput {
  eq?: any | null;
  neq?: any | null;
  in?: any[] | null;
  nin?: any[] | null;
  gt?: any | null;
  ngt?: any | null;
  gte?: any | null;
  ngte?: any | null;
  lt?: any | null;
  nlt?: any | null;
  lte?: any | null;
  nlte?: any | null;
}

export interface ComparableNullableOfDateTimeOffsetOperationFilterInput {
  eq?: any | null;
  neq?: any | null;
  in?: (any | null)[] | null;
  nin?: (any | null)[] | null;
  gt?: any | null;
  ngt?: any | null;
  gte?: any | null;
  ngte?: any | null;
  lt?: any | null;
  nlt?: any | null;
  lte?: any | null;
  nlte?: any | null;
}

export interface ComparableNullableOfDateTimeOperationFilterInput {
  eq?: any | null;
  neq?: any | null;
  in?: (any | null)[] | null;
  nin?: (any | null)[] | null;
  gt?: any | null;
  ngt?: any | null;
  gte?: any | null;
  ngte?: any | null;
  lt?: any | null;
  nlt?: any | null;
  lte?: any | null;
  nlte?: any | null;
}

export interface FUELOperationFilterInput {
  eq?: FUEL | null;
  neq?: FUEL | null;
  in?: FUEL[] | null;
  nin?: FUEL[] | null;
}

export interface ListFilterInputTypeOfModelFilterInput {
  all?: ModelFilterInput | null;
  none?: ModelFilterInput | null;
  some?: ModelFilterInput | null;
  any?: boolean | null;
}

export interface ListFilterInputTypeOfRoleFilterInput {
  all?: RoleFilterInput | null;
  none?: RoleFilterInput | null;
  some?: RoleFilterInput | null;
  any?: boolean | null;
}

export interface ListFilterInputTypeOfUserFilterInput {
  all?: UserFilterInput | null;
  none?: UserFilterInput | null;
  some?: UserFilterInput | null;
  any?: boolean | null;
}

export interface ListFilterInputTypeOfVehicleFilterInput {
  all?: VehicleFilterInput | null;
  none?: VehicleFilterInput | null;
  some?: VehicleFilterInput | null;
  any?: boolean | null;
}

export interface ListFilterInputTypeOfVehicleImageFilterInput {
  all?: VehicleImageFilterInput | null;
  none?: VehicleImageFilterInput | null;
  some?: VehicleImageFilterInput | null;
  any?: boolean | null;
}

export interface MarkFilterInput {
  and?: MarkFilterInput[] | null;
  or?: MarkFilterInput[] | null;
  name?: StringOperationFilterInput | null;
  models?: ListFilterInputTypeOfModelFilterInput | null;
  id?: ComparableInt32OperationFilterInput | null;
}

export interface MarkSortInput {
  name?: SortEnumType | null;
  id?: SortEnumType | null;
}

export interface ModelFilterInput {
  and?: ModelFilterInput[] | null;
  or?: ModelFilterInput[] | null;
  name?: StringOperationFilterInput | null;
  markId?: ComparableInt32OperationFilterInput | null;
  mark?: MarkFilterInput | null;
  vehicles?: ListFilterInputTypeOfVehicleFilterInput | null;
  id?: ComparableInt32OperationFilterInput | null;
}

export interface ModelSortInput {
  name?: SortEnumType | null;
  markId?: SortEnumType | null;
  mark?: MarkSortInput | null;
  id?: SortEnumType | null;
}

export interface RoleFilterInput {
  and?: RoleFilterInput[] | null;
  or?: RoleFilterInput[] | null;
  users?: ListFilterInputTypeOfUserFilterInput | null;
  isDefault?: BooleanOperationFilterInput | null;
  isReadOnly?: BooleanOperationFilterInput | null;
  id?: ComparableInt32OperationFilterInput | null;
  name?: StringOperationFilterInput | null;
  normalizedName?: StringOperationFilterInput | null;
  concurrencyStamp?: StringOperationFilterInput | null;
}

export interface RoleSortInput {
  isDefault?: SortEnumType | null;
  isReadOnly?: SortEnumType | null;
  id?: SortEnumType | null;
  name?: SortEnumType | null;
  normalizedName?: SortEnumType | null;
  concurrencyStamp?: SortEnumType | null;
}

export interface STATUSOperationFilterInput {
  eq?: STATUS | null;
  neq?: STATUS | null;
  in?: STATUS[] | null;
  nin?: STATUS[] | null;
}

export interface StringOperationFilterInput {
  and?: StringOperationFilterInput[] | null;
  or?: StringOperationFilterInput[] | null;
  eq?: string | null;
  neq?: string | null;
  contains?: string | null;
  ncontains?: string | null;
  in?: (string | null)[] | null;
  nin?: (string | null)[] | null;
  startsWith?: string | null;
  nstartsWith?: string | null;
  endsWith?: string | null;
  nendsWith?: string | null;
}

export interface TRANSMISSIONOperationFilterInput {
  eq?: TRANSMISSION | null;
  neq?: TRANSMISSION | null;
  in?: TRANSMISSION[] | null;
  nin?: TRANSMISSION[] | null;
}

export interface UserFilterInput {
  and?: UserFilterInput[] | null;
  or?: UserFilterInput[] | null;
  firstName?: StringOperationFilterInput | null;
  lastName?: StringOperationFilterInput | null;
  image?: StringOperationFilterInput | null;
  darkMode?: BooleanOperationFilterInput | null;
  isDefault?: BooleanOperationFilterInput | null;
  roles?: ListFilterInputTypeOfRoleFilterInput | null;
  id?: ComparableInt32OperationFilterInput | null;
  userName?: StringOperationFilterInput | null;
  normalizedUserName?: StringOperationFilterInput | null;
  email?: StringOperationFilterInput | null;
  normalizedEmail?: StringOperationFilterInput | null;
  emailConfirmed?: BooleanOperationFilterInput | null;
  passwordHash?: StringOperationFilterInput | null;
  securityStamp?: StringOperationFilterInput | null;
  concurrencyStamp?: StringOperationFilterInput | null;
  phoneNumber?: StringOperationFilterInput | null;
  phoneNumberConfirmed?: BooleanOperationFilterInput | null;
  twoFactorEnabled?: BooleanOperationFilterInput | null;
  lockoutEnd?: ComparableNullableOfDateTimeOffsetOperationFilterInput | null;
  lockoutEnabled?: BooleanOperationFilterInput | null;
  accessFailedCount?: ComparableInt32OperationFilterInput | null;
}

export interface UserSortInput {
  firstName?: SortEnumType | null;
  lastName?: SortEnumType | null;
  image?: SortEnumType | null;
  darkMode?: SortEnumType | null;
  isDefault?: SortEnumType | null;
  id?: SortEnumType | null;
  userName?: SortEnumType | null;
  normalizedUserName?: SortEnumType | null;
  email?: SortEnumType | null;
  normalizedEmail?: SortEnumType | null;
  emailConfirmed?: SortEnumType | null;
  passwordHash?: SortEnumType | null;
  securityStamp?: SortEnumType | null;
  concurrencyStamp?: SortEnumType | null;
  phoneNumber?: SortEnumType | null;
  phoneNumberConfirmed?: SortEnumType | null;
  twoFactorEnabled?: SortEnumType | null;
  lockoutEnd?: SortEnumType | null;
  lockoutEnabled?: SortEnumType | null;
  accessFailedCount?: SortEnumType | null;
}

export interface VehicleFilterInput {
  and?: VehicleFilterInput[] | null;
  or?: VehicleFilterInput[] | null;
  modelId?: ComparableInt32OperationFilterInput | null;
  model?: ModelFilterInput | null;
  version?: StringOperationFilterInput | null;
  fuelType?: FUELOperationFilterInput | null;
  price?: ComparableDoubleOperationFilterInput | null;
  mileage?: ComparableDoubleOperationFilterInput | null;
  year?: ComparableInt32OperationFilterInput | null;
  color?: StringOperationFilterInput | null;
  doors?: ComparableInt32OperationFilterInput | null;
  transmission?: TRANSMISSIONOperationFilterInput | null;
  engineSize?: ComparableInt32OperationFilterInput | null;
  power?: ComparableInt32OperationFilterInput | null;
  observations?: StringOperationFilterInput | null;
  opportunity?: BooleanOperationFilterInput | null;
  sold?: BooleanOperationFilterInput | null;
  soldDate?: ComparableNullableOfDateTimeOperationFilterInput | null;
  vehicleImages?: ListFilterInputTypeOfVehicleImageFilterInput | null;
  id?: ComparableInt32OperationFilterInput | null;
}

export interface VehicleImageFilterInput {
  and?: VehicleImageFilterInput[] | null;
  or?: VehicleImageFilterInput[] | null;
  url?: StringOperationFilterInput | null;
  vehicleId?: ComparableInt32OperationFilterInput | null;
  vehicle?: VehicleFilterInput | null;
  isMain?: BooleanOperationFilterInput | null;
  id?: ComparableInt32OperationFilterInput | null;
}

export interface VehicleSortInput {
  modelId?: SortEnumType | null;
  model?: ModelSortInput | null;
  version?: SortEnumType | null;
  fuelType?: SortEnumType | null;
  price?: SortEnumType | null;
  mileage?: SortEnumType | null;
  year?: SortEnumType | null;
  color?: SortEnumType | null;
  doors?: SortEnumType | null;
  transmission?: SortEnumType | null;
  engineSize?: SortEnumType | null;
  power?: SortEnumType | null;
  observations?: SortEnumType | null;
  opportunity?: SortEnumType | null;
  sold?: SortEnumType | null;
  soldDate?: SortEnumType | null;
  id?: SortEnumType | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
