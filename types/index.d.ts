type JSONResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export interface CageballResponse {
  data: CageballData[];
  meta: CageballMeta;
}

export interface CageballData {
  available: boolean;
  bookable: boolean;
  bookings: number;
  cancellable: boolean;
  capacity: number;
  category: CageballCategory;
  from: Date;
  instances: CageballInstance[];
  resource: CageballCategory;
  studio: CageballCategory;
  to: Date;
}

export interface CageballCategory {
  id: number;
  name: CageballName;
}

export enum CageballName {
  Cageball = "Cageball",
  HusekleppArena = "Huseklepp Arena",
  NorgeshusBanen = "Norgeshus banen",
  PromotionBanen = "Promotion banen",
  Sport1Banen = "Sport 1 banen",
}

export interface CageballInstance {
  booking_id: null;
  category_name: CageballName;
  from: Date;
  id: number;
  resource_name: CageballName;
  studio_name: CageballName;
  to: Date;
  user_status: null;
}

export interface CageballMeta {
  hits: number;
}
