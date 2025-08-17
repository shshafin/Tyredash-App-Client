import { z } from "zod";

export const tireSchema = z.object({
  name: z.string().trim().nonempty("Tire name is required"),

  year: z.string().nonempty("Year is required"),

  make: z.string().nonempty("Make is required"),

  model: z.string().nonempty("Model is required"),

  trim: z.string().nonempty("Trim is required"),

  tireSize: z.string().nonempty("Tire size is required"),

  drivingType: z.string().nonempty("Driving type is required"),

  brand: z.string().nonempty("Brand is required"),

  category: z.string().nonempty("Category is required"),

  width: z.string().nonempty("Width is required"),

  ratio: z.string().nonempty("Ratio is required"),

  diameter: z.string().nonempty("Diameter is required"),

  vehicleType: z.string().nonempty("Vehicle type is required"),

  description: z.string().trim().optional(),

  images: z.array(z.string()).optional(),
  productLine: z.string().trim().optional(),
  unitName: z.string().trim().optional(),
  conditionInfo: z.string().trim().optional(),
  grossWeightRange: z.string().trim().optional(),
  gtinRange: z.string().trim().optional(),
  loadIndexRange: z.string().trim().optional(),
  mileageWarrantyRange: z.string().trim().optional(),
  maxAirPressureRange: z.string().trim().optional(),
  speedRatingRange: z.string().trim().optional(),
  sidewallDescriptionRange: z.string().trim().optional(),
  temperatureGradeRange: z.string().trim().optional(),
  sectionWidthRange: z.string().trim().optional(),
  wheelRimDiameterRange: z.string().trim().optional(),
  tractionGradeRange: z.string().trim().optional(),
  treadDepthRange: z.string().trim().optional(),
  treadWidthRange: z.string().trim().optional(),
  overallWidthRange: z.string().trim().optional(),
  treadwearGradeRange: z.string().trim().optional(),

  sectionWidth: z.number({
    invalid_type_error: "Section Width must be a number",
  }),
  overallDiameter: z.number({
    invalid_type_error: "Overall Diameter must be a number",
  }),
  rimWidthRange: z.number({
    invalid_type_error: "Rim Width Range must be a number",
  }),
  treadDepth: z.number({ invalid_type_error: "Tread Depth must be a number" }),
  loadIndex: z.number({ invalid_type_error: "Load Index must be a number" }),
  maxPSI: z.number({ invalid_type_error: "Max PSI must be a number" }),
  loadCapacity: z.number({
    invalid_type_error: "Load Capacity must be a number",
  }),
  price: z.number({ invalid_type_error: "Price must be a number" }),
  discountPrice: z.number({
    invalid_type_error: "Discount Price must be a number",
  }),
  stockQuantity: z.number({
    invalid_type_error: "Stock Quantity must be a number",
  }),

  loadRange: z.string().trim().optional(),
  warranty: z.string().trim().optional(),
  aspectRatioRange: z.string().trim().optional(),
  treadPattern: z.string().trim().optional(),
  constructionType: z.string().trim().optional(),
  tireType: z.string().trim().optional(),
});
