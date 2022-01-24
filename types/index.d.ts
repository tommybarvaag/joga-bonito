type JSONResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export type User = {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  isAdmin: boolean;
};

export type CageballResponse = {
  data: CageballData[];
  meta: CageballMeta;
};

export type CageballData = {
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
};

export type CageballCategory = {
  id: number;
  name: CageballName;
};

export enum CageballName {
  Cageball = "Cageball",
  HusekleppArena = "Huseklepp Arena",
  NorgeshusBanen = "Norgeshus banen",
  PromotionBanen = "Promotion banen",
  Sport1Banen = "Sport 1 banen",
}

export type CageballInstance = {
  booking_id: null;
  category_name: CageballName;
  from: Date;
  id: number;
  resource_name: CageballName;
  studio_name: CageballName;
  to: Date;
  user_status: null;
};

export type CageballMeta = {
  hits: number;
};