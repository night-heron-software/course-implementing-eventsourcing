import {CartEvents} from "@/app/api/events/CartEvents";
import {findEventStore} from "@/app/infrastructure/inmemoryEventstore";
import {cartsWithProductsStateView} from "@/app/slices/changeprice/cartsWithProductsStateView";
import {PriceChangedEvent} from "@/app/api/events/PriceChanged";
import {RequestToArchiveItem} from "@/app/api/commands/RequestToArchiveItem";
import {Streams} from "@/app/api/Streams";

const requestToArchiveItemCommandHandler = (events: Event[], command: RequestToArchiveItem): CartEvents[] => {
    return [{
        type:'ItemArchiveRequested',
        data: {
            aggregateId: command.data.aggregateId,
            productId: command.data.productId,
            itemId: command.data.itemId
        }
    }]

}

export const priceChangeProcessor = async (events: PriceChangedEvent[]) => {

   const cartStream = await findEventStore().readStream<CartEvents>(Streams.Cart)
    const cartsWithProducts = cartsWithProductsStateView([], cartStream?.events||[])

    events.forEach((event)=> {
        if (event.type == "PriceChanged") {
            const resultEvents = cartsWithProducts.flatMap(cart => {
                const cartItem = cart.cartItems.find(it => it.productId == event.data.productId)
                if (cartItem) {
                    return requestToArchiveItemCommandHandler([], {
                        type: 'RequestToArchiveItem',
                        data: {
                            aggregateId: cart.cartId,
                            productId: event.data.productId,
                            itemId: cartItem.cartItemId
                        }
                    })

                }
                return []
            })
            if (resultEvents?.length > 0) {
            findEventStore().appendToStream(Streams.Cart, resultEvents);
            }
        }
    })
}