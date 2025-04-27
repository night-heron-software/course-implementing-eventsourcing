import {findEventStore} from "@/app/infrastructure/inmemoryEventstore";
import {Streams} from "@/app/api/Streams";
import {CartEvents} from "@/app/api/events/CartEvents";
import {removeItemCommandHandler} from "@/app/slices/removeitem/commandHandler";

export default function RemoveItem(props: {aggregateId: string, itemId: string, productId:string}) {

    return <div>
        <div className={"control"}>
            <button onClick={async () => {

                const result = await findEventStore().readStream<CartEvents>(Streams.Cart)
                const events = result?.events || []
                const resultEvents = await removeItemCommandHandler(events, {
                    type: 'RemoveItem',
                    data: {
                        itemId: props.itemId,
                        aggregateId: props.aggregateId,
                        productId: props.productId
                    }
                })
                await findEventStore().appendToStream(Streams.Cart, resultEvents,
                    {expectedStreamVersion: result?.currentStreamVersion})
            }

            } className={"button is-info m-2"}><i className="fas fa-trash"></i>
            </button>
        </div>
    </div>
}