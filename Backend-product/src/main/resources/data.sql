-- Categories should already exist from before
INSERT INTO category (name, description) VALUES ('Men''s Clothing', 'Clothing for men');
INSERT INTO category (name, description) VALUES ('Women''s Clothing', 'Clothing for women');
INSERT INTO category (name, description) VALUES ('T-Shirts', 'Casual t-shirts');
INSERT INTO category (name, description) VALUES ('Jeans', 'Denim pants');
INSERT INTO category (name, description) VALUES ('Jackets', 'Outerwear');
INSERT INTO category (name, description) VALUES ('Dresses', 'Women''s dresses');
INSERT INTO category (name, description) VALUES ('Accessories', 'Belts, bags, hats');
INSERT INTO category (name, description) VALUES ('Footwear', 'Shoes and boots');
-- ========================================
-- MEN'S CLOTHING (category_id = 1)
-- ========================================
INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Classic Polo Shirt', 34.99, 'Cotton polo shirt for men', 'men', 1, '/images/comingsoon.jpg', 120, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Men''s Chinos', 49.99, 'Slim fit chino pants', 'men', 1, '/images/comingsoon.jpg', 95, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Button Down Shirt', 42.99, 'Formal button-down shirt', 'men', 1, '/images/comingsoon.jpg', 110, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Men''s Shorts', 29.99, 'Casual cotton shorts', 'men', 1, '/images/comingsoon.jpg', 140, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Dress Pants', 59.99, 'Tailored dress pants', 'men', 1, '/images/comingsoon.jpg', 85, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Casual Blazer', 89.99, 'Smart casual blazer', 'men', 1, '/images/comingsoon.jpg', 60, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Henley Shirt', 27.99, 'Long sleeve henley', 'men', 1, '/images/comingsoon.jpg', 105, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Track Pants', 39.99, 'Athletic track pants', 'men', 1, '/images/comingsoon.jpg', 130, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Flannel Shirt', 44.99, 'Comfortable flannel shirt', 'men', 1, '/images/comingsoon.jpg', 90, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Cargo Pants', 54.99, 'Multi-pocket cargo pants', 'men', 1, '/images/comingsoon.jpg', 75, CURRENT_TIMESTAMP());

-- ========================================
-- WOMEN'S CLOTHING (category_id = 2)
-- ========================================
INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Women''s Blouse', 39.99, 'Elegant silk blouse', 'women', 2, '/images/comingsoon.jpg', 100, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Pencil Skirt', 44.99, 'Professional pencil skirt', 'women', 2, '/images/comingsoon.jpg', 85, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Cardigan Sweater', 49.99, 'Cozy knit cardigan', 'women', 2, '/images/comingsoon.jpg', 110, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Wide Leg Pants', 52.99, 'Flowy wide leg pants', 'women', 2, '/images/comingsoon.jpg', 95, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Wrap Top', 34.99, 'Stylish wrap top', 'women', 2, '/images/comingsoon.jpg', 120, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Midi Skirt', 47.99, 'Versatile midi skirt', 'women', 2, '/images/comingsoon.jpg', 80, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Tank Top', 19.99, 'Basic tank top', 'women', 2, '/images/comingsoon.jpg', 150, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Palazzo Pants', 54.99, 'Comfortable palazzo pants', 'women', 2, '/images/comingsoon.jpg', 70, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Tunic Dress', 42.99, 'Casual tunic dress', 'women', 2, '/images/comingsoon.jpg', 90, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Jumpsuit', 64.99, 'One-piece jumpsuit', 'women', 2, '/images/comingsoon.jpg', 65, CURRENT_TIMESTAMP());

-- ========================================
-- T-SHIRTS (category_id = 3)
-- ========================================
INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Graphic Tee Black', 24.99, 'Black graphic t-shirt', 'unisex', 3, '/images/comingsoon.jpg', 200, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('V-Neck Tee', 19.99, 'Classic v-neck t-shirt', 'unisex', 3, '/images/comingsoon.jpg', 180, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Striped Tee', 22.99, 'Striped crew neck tee', 'unisex', 3, '/images/comingsoon.jpg', 160, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Long Sleeve Tee', 27.99, 'Long sleeve cotton tee', 'unisex', 3, '/images/comingsoon.jpg', 140, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Pocket Tee', 21.99, 'T-shirt with chest pocket', 'unisex', 3, '/images/comingsoon.jpg', 170, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Vintage Wash Tee', 26.99, 'Vintage wash t-shirt', 'unisex', 3, '/images/comingsoon.jpg', 150, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Raglan Tee', 23.99, 'Baseball style raglan tee', 'unisex', 3, '/images/comingsoon.jpg', 130, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Ringer Tee', 24.99, 'Retro ringer t-shirt', 'unisex', 3, '/images/comingsoon.jpg', 145, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Oversized Tee', 29.99, 'Relaxed oversized fit', 'unisex', 3, '/images/comingsoon.jpg', 120, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Crop Top Tee', 22.99, 'Cropped t-shirt', 'women', 3, '/images/comingsoon.jpg', 110, CURRENT_TIMESTAMP());

-- ========================================
-- JEANS (category_id = 4)
-- ========================================
INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Slim Fit Jeans', 59.99, 'Dark wash slim fit', 'men', 4, '/images/comingsoon.jpg', 100, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Bootcut Jeans', 64.99, 'Classic bootcut jeans', 'women', 4, '/images/comingsoon.jpg', 90, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Skinny Jeans', 54.99, 'Stretch skinny jeans', 'women', 4, '/images/comingsoon.jpg', 120, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Straight Leg Jeans', 62.99, 'Regular straight leg', 'men', 4, '/images/comingsoon.jpg', 95, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Distressed Jeans', 69.99, 'Ripped distressed denim', 'unisex', 4, '/images/comingsoon.jpg', 85, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('High Waist Jeans', 57.99, 'High waisted mom jeans', 'women', 4, '/images/comingsoon.jpg', 105, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Relaxed Fit Jeans', 61.99, 'Comfortable relaxed fit', 'men', 4, '/images/comingsoon.jpg', 80, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Black Denim Jeans', 65.99, 'Classic black jeans', 'unisex', 4, '/images/comingsoon.jpg', 110, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Boyfriend Jeans', 58.99, 'Loose boyfriend fit', 'women', 4, '/images/comingsoon.jpg', 75, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Raw Denim Jeans', 74.99, 'Unwashed raw denim', 'men', 4, '/images/comingsoon.jpg', 70, CURRENT_TIMESTAMP());

-- ========================================
-- JACKETS (category_id = 5)
-- ========================================
INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Leather Jacket', 199.99, 'Genuine leather biker jacket', 'unisex', 5, '/images/comingsoon.jpg', 45, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Denim Jacket', 69.99, 'Classic denim jacket', 'unisex', 5, '/images/comingsoon.jpg', 80, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Bomber Jacket', 89.99, 'Sporty bomber jacket', 'unisex', 5, '/images/comingsoon.jpg', 60, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Puffer Jacket', 119.99, 'Warm puffer jacket', 'unisex', 5, '/images/comingsoon.jpg', 70, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Trench Coat', 149.99, 'Classic trench coat', 'women', 5, '/images/comingsoon.jpg', 40, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Windbreaker', 54.99, 'Lightweight windbreaker', 'unisex', 5, '/images/comingsoon.jpg', 95, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Varsity Jacket', 94.99, 'College varsity jacket', 'unisex', 5, '/images/comingsoon.jpg', 55, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Rain Jacket', 79.99, 'Waterproof rain jacket', 'unisex', 5, '/images/comingsoon.jpg', 85, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Fleece Jacket', 64.99, 'Cozy fleece jacket', 'unisex', 5, '/images/comingsoon.jpg', 100, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Moto Jacket', 174.99, 'Faux leather moto jacket', 'women', 5, '/images/comingsoon.jpg', 35, CURRENT_TIMESTAMP());

-- ========================================
-- DRESSES (category_id = 6)
-- ========================================
INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Maxi Dress', 64.99, 'Flowy maxi dress', 'women', 6, '/images/comingsoon.jpg', 75, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Cocktail Dress', 89.99, 'Elegant cocktail dress', 'women', 6, '/images/comingsoon.jpg', 50, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Sundress', 44.99, 'Casual summer sundress', 'women', 6, '/images/comingsoon.jpg', 95, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Wrap Dress', 57.99, 'Flattering wrap dress', 'women', 6, '/images/comingsoon.jpg', 80, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Shift Dress', 52.99, 'Classic shift dress', 'women', 6, '/images/comingsoon.jpg', 70, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('A-Line Dress', 59.99, 'Versatile a-line dress', 'women', 6, '/images/comingsoon.jpg', 85, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Midi Dress', 62.99, 'Sophisticated midi dress', 'women', 6, '/images/comingsoon.jpg', 65, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('T-Shirt Dress', 34.99, 'Comfortable t-shirt dress', 'women', 6, '/images/comingsoon.jpg', 110, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Bodycon Dress', 49.99, 'Fitted bodycon dress', 'women', 6, '/images/comingsoon.jpg', 90, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Little Black Dress', 74.99, 'Timeless LBD', 'women', 6, '/images/comingsoon.jpg', 60, CURRENT_TIMESTAMP());

-- ========================================
-- ACCESSORIES (category_id = 7)
-- ========================================
INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Leather Belt', 29.99, 'Genuine leather belt', 'unisex', 7, '/images/comingsoon.jpg', 150, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Baseball Cap', 19.99, 'Adjustable baseball cap', 'unisex', 7, '/images/comingsoon.jpg', 200, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Sunglasses', 49.99, 'UV protection sunglasses', 'unisex', 7, '/images/comingsoon.jpg', 120, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Beanie Hat', 17.99, 'Warm knit beanie', 'unisex', 7, '/images/comingsoon.jpg', 180, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Crossbody Bag', 54.99, 'Small crossbody bag', 'women', 7, '/images/comingsoon.jpg', 85, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Backpack', 64.99, 'Canvas backpack', 'unisex', 7, '/images/comingsoon.jpg', 100, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Scarf', 24.99, 'Wool blend scarf', 'unisex', 7, '/images/comingsoon.jpg', 140, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Wallet', 39.99, 'Bi-fold wallet', 'unisex', 7, '/images/comingsoon.jpg', 160, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Watch', 129.99, 'Analog wristwatch', 'unisex', 7, '/images/comingsoon.jpg', 70, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Tote Bag', 44.99, 'Large canvas tote', 'women', 7, '/images/comingsoon.jpg', 110, CURRENT_TIMESTAMP());

-- ========================================
-- FOOTWEAR (category_id = 8)
-- ========================================
INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Running Shoes', 89.99, 'Athletic running shoes', 'unisex', 8, '/images/comingsoon.jpg', 95, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Canvas Sneakers', 44.99, 'Classic canvas sneakers', 'unisex', 8, '/images/comingsoon.jpg', 130, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Ankle Boots', 109.99, 'Leather ankle boots', 'women', 8, '/images/comingsoon.jpg', 65, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Loafers', 79.99, 'Classic loafers', 'unisex', 8, '/images/comingsoon.jpg', 80, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Sandals', 34.99, 'Summer sandals', 'unisex', 8, '/images/comingsoon.jpg', 140, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('High Heels', 94.99, 'Elegant high heels', 'women', 8, '/images/comingsoon.jpg', 55, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Work Boots', 124.99, 'Durable work boots', 'men', 8, '/images/comingsoon.jpg', 70, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Slip-On Shoes', 54.99, 'Casual slip-on shoes', 'unisex', 8, '/images/comingsoon.jpg', 105, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Ballet Flats', 49.99, 'Comfortable ballet flats', 'women', 8, '/images/comingsoon.jpg', 90, CURRENT_TIMESTAMP());

INSERT INTO product (name, price, description, gender, category_id, image_url, stock_quantity, created_at) 
VALUES ('Hiking Boots', 134.99, 'Waterproof hiking boots', 'unisex', 8, '/images/comingsoon.jpg', 60, CURRENT_TIMESTAMP());