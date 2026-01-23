CREATE TYPE "customer_type" AS ENUM (
  'Hospital',
  'Retailer'
);

CREATE TABLE "Producer" (
  "Pro_id" integer PRIMARY KEY,
  "name" varchar,
  "city" varchar
);

CREATE TABLE "Warehouse" (
  "W_id" integer PRIMARY KEY,
  "name" varchar,
  "city" varchar
);

CREATE TABLE "Storage" (
  "st_id" integer PRIMARY KEY,
  "location_id" integer,
  "minTemp" integer,
  "maxTemp" integer,
  "capacity" integer
);

CREATE TABLE "Customer" (
  "C_id" integer PRIMARY KEY,
  "name" varchar,
  "type" customer_type,
  "city" varchar
);

CREATE TABLE "Product" (
  "product_id" integer PRIMARY KEY,
  "name" varchar,
  "minTemp" integer,
  "maxTemp" integer
);

CREATE TABLE "ProductionRoutes" (
  "route_id" integer PRIMARY KEY,
  "fromLoc_id" integer,
  "toLoc_id" integer,
  "capacity" integer,
  "minShipment" integer
);

CREATE TABLE "DeliveryRoutes" (
  "route_id" integer PRIMARY KEY,
  "fromLoc_id" integer,
  "toLoc_id" integer,
  "capacity" integer,
  "minShipment" integer
);

CREATE TABLE "Demand" (
  "demand_id" integer PRIMARY KEY,
  "loc_id" integer,
  "product_id" integer,
  "date" date,
  "minQuantity" integer,
  "maxQuantity" integer
);

ALTER TABLE "ProductionRoutes" ADD FOREIGN KEY ("fromLoc_id") REFERENCES "Producer" ("Pro_id");

ALTER TABLE "ProductionRoutes" ADD FOREIGN KEY ("toLoc_id") REFERENCES "Warehouse" ("W_id");

ALTER TABLE "DeliveryRoutes" ADD FOREIGN KEY ("fromLoc_id") REFERENCES "Warehouse" ("W_id");

ALTER TABLE "DeliveryRoutes" ADD FOREIGN KEY ("toLoc_id") REFERENCES "Customer" ("C_id");

ALTER TABLE "Storage" ADD FOREIGN KEY ("location_id") REFERENCES "Warehouse" ("W_id");

ALTER TABLE "Demand" ADD FOREIGN KEY ("loc_id") REFERENCES "Customer" ("C_id");

ALTER TABLE "Demand" ADD FOREIGN KEY ("product_id") REFERENCES "Product" ("product_id");