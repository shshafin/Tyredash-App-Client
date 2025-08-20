import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IBrand {
  _id: string;
  name: string;
  description: string;
  logo?: string;
}

export interface IWheel {
  _id: string;
  name: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  tireSize: string;
  brand: string;
  description: string;
  images: string[];
  category: string;
  productLine: [string];
  unitName: string;
  grossWeight: string;
  conditionInfo: string;
  GTIN: string;
  ATVOffset: string;
  BoltsQuantity: string;
  wheelColor: string;
  hubBore: string;
  materialType: string;
  wheelSize: string;
  wheelAccent: string;
  wheelPieces: string;
  wheelWidth: string;
  RimDiameter: number;
  RimWidth: number;
  boltPattern: string;
  offset: number;
  hubBoreSize: number;
  numberOFBolts: number;
  loadCapacity: number;
  loadRating: number;
  finish: string;
  warranty: string;
  constructionType: string;
  wheelType: string;
  price: number;
  discountPrice: number;
  stockQuantity: number;
}

export interface ITire {
  _id: string;
  name: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  tireSize: string;
  brand: string;
  category: string;
  description: string;
  images: string[];
  productLine: string[];
  unitName: string;
  conditionInfo: string;
  grossWeightRange: string;
  gtinRange: string;
  loadIndexRange: string;
  mileageWarrantyRange: string;
  maxAirPressureRange: string;
  speedRatingRange: string;
  sidewallDescriptionRange: string;
  temperatureGradeRange: string;
  sectionWidthRange: string;
  diameterRange: number;
  wheelRimDiameterRange: string;
  tractionGradeRange: string;
  treadDepthRange: string;
  treadWidthRange: string;
  overallWidthRange: string;
  treadwearGradeRange: string;
  sectionWidth: number;
  aspectRatio: number;
  rimDiameter: number;
  overallDiameter: number;
  rimWidthRange: number;
  width: number;
  treadDepth: number;
  loadIndex: number;
  loadRange: string;
  maxPSI: number;
  warranty: string;
  aspectRatioRange: string;
  treadPattern: string;
  loadCapacity: number;
  constructionType: string;
  tireType: string;
  price: number;
  discountPrice: number;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentCategory?: {
    _id: string;
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IDrivingType {
  _id: string;
  title: string;
  subTitle: string;
  options: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IUser {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label?: React.ReactNode;
  name: string;
  isClearable?: boolean;
  defaultValue?: any;
}

export interface IMake {
  _id: string;
  make: string;
  // year?: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IYear {
  _id: string;
  year: {
    numeric: number;
    display: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IModel {
  _id: string;
  model: string;
  make: IMake | string;
  year: IYear | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITrim {
  _id: string;
  trim: string;
  make: IMake | string;
  model: IModel | string;
  year: IYear | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITyreSize {
  _id: string;
  tireSize: string;
  make: IMake | string;
  model: IModel | string;
  year: IYear | string;
  trim: ITrim | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface VehicleInfo {
  year: string;
  make: string;
  model: string;
  trim: string;
  tireSize: string;
}

export interface IFleetNews {
  _id: string;
  badge: string;
  title: string;
  description: string;
  status: string;
  id: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IDeal {
  _id: string;
  title: string;
  description: string;
  image?: string;
  discountPercentage: number;
  applicableProducts: string[];
  brand: IBrand;
  validFrom: string;
  validTo: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IBlog {
  _id: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
