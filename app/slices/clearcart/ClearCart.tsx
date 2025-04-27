import {findEventStore} from "@/app/infrastructure/inmemoryEventstore";
import {Streams} from "@/app/api/Streams";
import {CartEvents} from "@/app/api/events/CartEvents";
import {clearCartCommandHandler} from "@/app/slices/clearcart/commandHandler";

export default function ClearCart(props: { aggregateId: string }) {

    return <div>
        <div className={"control"}>
            <button onClick={async () => {

                const result = await findEventStore().readStream<CartEvents>(Streams.Cart)
                const events = result?.events || []
                const resultEvents = clearCartCommandHandler(events, {
                    type: 'ClearCart',
                    data: {
                        aggregateId: props.aggregateId
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