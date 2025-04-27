import {CartEvents} from "@/app/api/events/CartEvents";
import {SubmitCartCommand} from "@/app/api/commands/SubmitCartCommand";

export const submitCartCommandHandler =
    (events: CartEvents[], command: SubmitCartCommand): CartEvents[] => {

        const productIds = events.reduce((acc: string[], event: CartEvents): string[] => {
            switch (event.type) {
                case "ItemAdded":
                    acc.push(event.data.productId)
                    break
                case "ItemArchived":
                case "ItemRemoved":
                    acc = acc.filter(it => it !== event.data.productId)
                    break
                case "CartCleared":
                    acc = []
                    break
            }
            return acc
        }, [])
        productIds.forEach(productId => {
            const inventory = command.data.inventories.find(it => it.productId === productId)
            if (!inventory || inventory.quantity == 0) {
                throw Error("Cannot order products without quantity")
            }
        })


        return [{
            type: 'CartSubmitted',
            data: {
                aggregateId: command.data.aggregateId,
            }
        }]

    }