const mongoose = require('mongoose');

// Define CART_ITEM_STATUS locally to avoid import issues
const CART_ITEM_STATUS = {
  Processing: 'Processing',
  Shipped: 'Shipped',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled',
  Not_processed: 'Not processed'
};

const GuestCartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  size: {
    type: String,
    default: null
  }, 
  purchasePrice: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  priceWithTax: {
    type: Number,
    default: 0
  },
  totalTax: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: CART_ITEM_STATUS.Not_processed,
    enum: Object.values(CART_ITEM_STATUS)
  }
});

const GuestCartSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  products: {
    type: [GuestCartItemSchema],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7 * 24 * 60 * 60 // Expires after 7 days (in seconds)
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for better performance
GuestCartSchema.index({ sessionId: 1 });
GuestCartSchema.index({ 'products.product': 1 });
GuestCartSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 }); // TTL index

// Pre-save middleware to update the updatedAt field
GuestCartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to find or create guest cart
GuestCartSchema.statics.findOrCreate = async function(sessionId) {
  let cart = await this.findOne({ sessionId }).populate('products.product');
  
  if (!cart) {
    cart = new this({
      sessionId,
      products: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    await cart.save();
  }
  
  return cart;
};

// Static method to transfer guest cart to user cart
GuestCartSchema.statics.transferToUserCart = async function(sessionId, userId) {
  const Cart = require('./CartSchema');
  
  // Find the guest cart
  const guestCart = await this.findOne({ sessionId }).populate('products.product');
  
  if (!guestCart || guestCart.products.length === 0) {
    return null; // No guest cart to transfer
  }
  
  // Find or create user cart
  let userCart = await Cart.findOrCreate(userId);
  
  // Transfer items from guest cart to user cart
  for (const guestItem of guestCart.products) {
    // Check if product already exists in user cart with same size
    const existingItemIndex = userCart.products.findIndex(item => 
      item.product.toString() === guestItem.product._id.toString() && item.size === guestItem.size
    );
    
    if (existingItemIndex !== -1) {
      // Update existing item quantity
      userCart.products[existingItemIndex].quantity += guestItem.quantity;
      userCart.products[existingItemIndex].totalPrice = 
        userCart.products[existingItemIndex].purchasePrice * userCart.products[existingItemIndex].quantity;
    } else {
      // Add new item to user cart
      const newItem = {
        product: guestItem.product._id,
        quantity: guestItem.quantity,
        size: guestItem.size,
        purchasePrice: guestItem.purchasePrice,
        totalPrice: guestItem.totalPrice,
        priceWithTax: guestItem.priceWithTax,
        totalTax: guestItem.totalTax,
        status: guestItem.status
      };
      userCart.products.push(newItem);
    }
  }
  
  userCart.updatedAt = Date.now();
  await userCart.save();
  
  // Delete the guest cart after successful transfer
  await this.deleteOne({ sessionId });
  
  return userCart;
};

const GuestCart = mongoose.model('GuestCart', GuestCartSchema);

module.exports = GuestCart;
