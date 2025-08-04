const express = require('express');
const router = express.Router();
const Cart = require('../Models/CartSchema');
const auth = require('../MiddleWare/auth');

router.get('/:userId', async (req, res) => {
  try {
    // Validate userId
    if (!req.params.userId || !require('mongoose').Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Use the findOrCreate method
    const cart = await Cart.findOrCreate(req.params.userId);
    
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/:userId/add', async (req, res) => {
  try {
    const { product, quantity = 1, size, purchasePrice, totalPrice, priceWithTax, totalTax, status } = req.body;
    
    // Validate required fields
    if (!product) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }

    // Validate userId and productId
    if (!require('mongoose').Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (!require('mongoose').Types.ObjectId.isValid(product)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Use findOrCreate to get or create cart
    let cart = await Cart.findOrCreate(req.params.userId);

    // Check if product already exists in cart
    const existingItemIndex = cart.products.findIndex(item => 
      item.product.toString() === product.toString()
    );

    if (existingItemIndex !== -1) {
      // Update existing item quantity
      cart.products[existingItemIndex].quantity = quantity;
      if (size) cart.products[existingItemIndex].size = size;
      if (purchasePrice) cart.products[existingItemIndex].purchasePrice = purchasePrice;
      if (totalPrice) cart.products[existingItemIndex].totalPrice = totalPrice;
      if (priceWithTax) cart.products[existingItemIndex].priceWithTax = priceWithTax;
      if (totalTax) cart.products[existingItemIndex].totalTax = totalTax;
      if (status) cart.products[existingItemIndex].status = status;
    } else {
      // Add new item to the cart
      cart.products.push({
        product,
        quantity,
        size: size || null,
        purchasePrice: purchasePrice || 0,
        totalPrice: totalPrice || 0,
        priceWithTax: priceWithTax || 0,
        totalTax: totalTax || 0,
        status: status || 'Not processed'
      });
    }

    cart.updatedAt = Date.now();
    await cart.save();
    
    // Populate product details before sending response
    const populatedCart = await cart.populate('products.product');
    
    console.log('Product added to cart successfully:', {
      userId: req.params.userId,
      productId: product,
      quantity: quantity
    });

    res.json(populatedCart);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:userId/update', async (req, res) => {
  try {
    const { productId, quantity, size, purchasePrice, totalPrice } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Validate IDs
    if (!require('mongoose').Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (!require('mongoose').Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    let cart = await Cart.findOne({ user: req.params.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.products.findIndex(item => 
      item.product.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update item
    if (quantity !== undefined) cart.products[itemIndex].quantity = quantity;
    if (size !== undefined) cart.products[itemIndex].size = size;
    if (purchasePrice !== undefined) cart.products[itemIndex].purchasePrice = purchasePrice;
    if (totalPrice !== undefined) cart.products[itemIndex].totalPrice = totalPrice;

    cart.updatedAt = Date.now();
    await cart.save();
    
    const populatedCart = await cart.populate('products.product');
    res.json(populatedCart);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:userId/remove/:productId', async (req, res) => {
  try {
    // Validate IDs
    if (!require('mongoose').Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (!require('mongoose').Types.ObjectId.isValid(req.params.productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const cart = await Cart.findOne({ user: req.params.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const initialLength = cart.products.length;
    cart.products = cart.products.filter(item => 
      item.product.toString() !== req.params.productId.toString()
    );

    if (cart.products.length === initialLength) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.updatedAt = Date.now();
    await cart.save();
    
    const populatedCart = await cart.populate('products.product');
    res.json(populatedCart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:userId/clear', async (req, res) => {
  try {
    // Validate userId
    if (!require('mongoose').Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const cart = await Cart.findOne({ user: req.params.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = [];
    cart.updatedAt = Date.now();
    await cart.save();
    
    res.json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;