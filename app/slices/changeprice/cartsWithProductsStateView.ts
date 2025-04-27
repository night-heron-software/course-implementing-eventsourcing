import {CartEvents} from "@/app/api/events/CartEvents";

export type CartItem = {
    productId: string,
    cartItemId: string
}
export type CartWithProducts = {
    cartId: string,
    cartItems: CartItem[]
}
export const cartsWithProductsStateView =
    (state: CartWithProducts[], events: CartEvents[]): CartWithProducts[] => {
        return events.reduce((acc: CartWithProducts[], event: CartEvents) => {
            let cart;
            switch (event.type) {
                case 'ItemAdded':
                    cart = acc.find(cart => cart.cartId === event.data.aggregateId)
                    if (!cart) {
                        acc.push({
                            cartId: event.data.aggregateId,
                            cartItems: [{cartItemId: event.data.itemId, productId: event.data.productId}]
                        });
                    } else {
                        cart.cartItems.push({
                            productId: event.data.productId,
                            cartItemId: event.data.itemId
                        });
                    }
                    break
                case "ItemRemoved":
                case "ItemArchived":
                    cart = acc.find(cart => cart.cartId === event.data.aggregateId)
                    if (cart) {
                        cart.cartItems = cart.cartItems.filter(cartItem => cartItem.cartItemId !== event.data.itemId)
                    }
                    break
                case 'CartCleared':
                    cart = acc.find(cart => cart.cartId === event.data.aggregateId)
                    if (cart) {
                        cart.cartItems = []
                    }
                    break
            }
            return acc
        }, state)
    }