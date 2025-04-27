import {CartEvents} from "@/app/api/events/CartEvents";
import {findEventStore} from "@/app/infrastructure/inmemoryEventstore";
import {Streams} from "@/app/api/Streams";
import {ArchiveItemCommand} from "@/app/api/commands/ArchiveItemCommand";

const archiveItemCommandHandler = (events: Event[], command: ArchiveItemCommand): CartEvents[] => {
    return [{
        type: 'ItemArchived',
        data: {
            aggregateId: command.data.aggregateId,
            productId: command.data.productId,
            itemId: command.data.itemId
        }
    }]

}

export const archiveItemTodoListProcessor = async (events: CartEvents[]) => {

    let todos: ArchiveItemCommand[] = []
    todos = events.reduce((acc:ArchiveItemCommand[], event:CartEvents):ArchiveItemCommand[] => {
        switch (event.type) {
            case "ItemArchiveRequested":
                acc.push({
                    type: 'ArchiveItem',
                    data: {
                        aggregateId: event.data.aggregateId,
                        productId: event.data.productId,
                        itemId: event.data.itemId
                    }
                })
                break
            case "ItemArchived":
                acc = acc.filter(it => it.data.aggregateId !== event.data.aggregateId)
                break
        }
        return acc
    }, todos)
    todos.forEach((command)=>{
        const result = archiveItemCommandHandler([], command);
        findEventStore().appendToStream(Streams.Cart, result)
    })

}