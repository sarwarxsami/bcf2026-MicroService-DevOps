Schema Documentation : 

1. CustomerType

Purpose: Lookup table for types of customers (Hospital, Retailer).

Fields:
type_id – INTEGER – Primary Key
name – VARCHAR – Name of type (Hospital / Retailer)

Relationships:
One-to-many: Customer.type_id → CustomerType.type_id

2. Producer

Purpose: Stores producers supplying products.

Fields:
Pro_id – INTEGER – Primary Key
name – VARCHAR – Producer name
city – VARCHAR – Producer location

Relationships:
One-to-many: ProductionRoutes.fromLoc_id → Producer.Pro_id

3. Warehouse

Purpose: Stores warehouse information where products are kept.

Fields:
W_id – INTEGER – Primary Key
name – VARCHAR – Warehouse name
city – VARCHAR – Warehouse location

Relationships:
One-to-many: Storage.location_id → Warehouse.W_id (storage units in the warehouse)
One-to-many: ProductionRoutes.toLoc_id → Warehouse.W_id (incoming routes from producers)
One-to-many: DeliveryRoutes.fromLoc_id → Warehouse.W_id (outgoing routes to customers)

4. Storage

Purpose: Contains storage units for warehouses with temperature and capacity info.

Fields:
st_id – INTEGER – Primary Key
location_id – INTEGER – Foreign Key → Warehouse.W_id
minTemp – INTEGER – Minimum temperature allowed
maxTemp – INTEGER – Maximum temperature allowed
capacity – INTEGER – Maximum storage capacity

Relationships:
Many-to-one: location_id → Warehouse.W_id

5. Customer

Purpose: Stores customer details who order products.

Fields:
C_id – INTEGER – Primary Key
name – VARCHAR – Customer name
type_id – INTEGER – Foreign Key → CustomerType.type_id
city – VARCHAR – Customer city

Relationships:
Many-to-one: type_id → CustomerType.type_id
One-to-many: DeliveryRoutes.toLoc_id → Customer.C_id
One-to-many: Demand.loc_id → Customer.C_id

6. Product

Purpose: Stores products produced and shipped.

Fields:
product_id – INTEGER – Primary Key
name – VARCHAR – Product name
minTemp – INTEGER – Minimum storage temperature
maxTemp – INTEGER – Maximum storage temperature

Relationships:
One-to-many: Demand.product_id → Product.product_id

7. ProductionRoutes

Purpose: Represents shipment routes from producers to warehouses.

Fields:
route_id – INTEGER – Primary Key
fromLoc_id – INTEGER – Foreign Key → Producer.Pro_id
toLoc_id – INTEGER – Foreign Key → Warehouse.W_id
capacity – INTEGER – Maximum shipment capacity
minShipment – INTEGER – Minimum shipment allowed

Relationships:
Many-to-one: fromLoc_id → Producer.Pro_id
Many-to-one: toLoc_id → Warehouse.W_id

8. DeliveryRoutes

Purpose: Represents shipment routes from warehouses to customers.

Fields:
route_id – INTEGER – Primary Key
fromLoc_id – INTEGER – Foreign Key → Warehouse.W_id
toLoc_id – INTEGER – Foreign Key → Customer.C_id
capacity – INTEGER – Maximum shipment capacity
minShipment – INTEGER – Minimum shipment allowed

Relationships:
Many-to-one: fromLoc_id → Warehouse.W_id
Many-to-one: toLoc_id → Customer.C_id

9. Demand

Purpose: Records the demand of products at customer locations on specific dates.

Fields:
demand_id – INTEGER – Primary Key
loc_id – INTEGER – Foreign Key → Customer.C_id
product_id – INTEGER – Foreign Key → Product.product_id
date – DATE – Demand date
minQuantity – INTEGER – Minimum quantity requested
maxQuantity – INTEGER – Maximum quantity requested

Relationships:
Many-to-one: loc_id → Customer.C_id
Many-to-one: product_id → Product.product_id