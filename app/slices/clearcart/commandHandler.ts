import {CartEvents} from "@/app/api/events/CartEvents";
import {ClearCartCommand} from "@/app/api/commands/ClearCartCommand";

export const clearCartCommandHandler =
    (events: CartEvents[], command: ClearCartCommand): CartEvents[] => {

        return [{
            type: 'CartCleared',
            data: {
                aggregateId: command.data.aggregateId,
            }
        }]

    }