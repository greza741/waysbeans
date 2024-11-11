import { prisma } from "../libs/prisma";

export const getCartByUserId = async (userId: number) => {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      cartItems: {
        include: {
          product: true,
        },
        orderBy: { id: "desc" },
      },
    },
  });
};

export const addItemToCart = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  // meastikan cart ada atau membuat cart baru
  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  // cek kalo sudah ada item di cart
  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
    include: { product: true },
  });

  if (existingItem) {
    // update totalPrice sama quantity kalo udah ada
    const updatedQuantity = existingItem.quantity + quantity;
    const totalPrice = updatedQuantity * existingItem.product.price;

    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: updatedQuantity, totalPrice },
    });
  } else {
    // perkalian buat quantity sama Product.Price
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found");

    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
        totalPrice: quantity * product.price,
      },
    });
  }

  // Update totalPrice di cart
  await updateCartTotalPrice(cart.id);

  return prisma.cart.findUnique({
    where: { id: cart.id },
    include: {
      cartItems: { include: { product: true }, orderBy: { id: "desc" } },
    },
  });
};

export const removeItemFromCart = async (userId: number, productId: number) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) throw new Error("Cart not found");

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
      productId,
    },
  });

  // Update totalPrice in Cart after removing CartItem
  await updateCartTotalPrice(cart.id);

  return prisma.cart.findUnique({
    where: { id: cart.id },
    include: {
      cartItems: {
        include: { product: true },
      },
    },
  });
};

export const clearCart = async (userId: number) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) throw new Error("Cart not found");

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  // Reset totalPrice in Cart after clearing
  await prisma.cart.update({
    where: { id: cart.id },
    data: { totalPrice: 0 },
  });

  return prisma.cart.findUnique({
    where: { id: cart.id },
    include: { cartItems: { include: { product: true } } },
  });
};

// Helper function to update Cart total price based on CartItems
const updateCartTotalPrice = async (cartId: number) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { cartId },
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  await prisma.cart.update({
    where: { id: cartId },
    data: { totalPrice },
  });
};
