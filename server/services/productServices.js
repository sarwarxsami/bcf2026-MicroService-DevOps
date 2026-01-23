const { Product } = require('../models');
const { validateProduct } = require('../utils/validators');

class ProductService {
  async createProduct(data) {
    const { error, value } = validateProduct(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Validate temperature range
    if (value.max_temperature <= value.min_temperature) {
      throw new Error('maxTemperature must be greater than minTemperature');
    }

    const product = await Product.create(value);
    return product;
  }

  async getAllProducts() {
    const products = await Product.findAll();
    return products;
  }

  async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
}

module.exports = new ProductService();