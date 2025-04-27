import {findEventStore} from "@/app/infrastructure/inmemoryEventstore";
import {Streams} from "@/app/api/Streams";
import {CartEvents} from "@/app/api/events/CartEvents";
import {submitCartCommandHandler} from "@/app/slices/submitcart/commandHandler";
import {InventoryUpdatedEvent} from "@/app/api/events/InventoryChanged";
import {cartSubmissionInventoryStateView} from "@/app/slices/submitcart/InventoriesStateView";

export default function SubmitCart(props: { aggregateId: string, productIds: string[] }) {

    return <div>
        <div className={"control"}>
            <button onClick={async () => {

                const result = await findEventStore().readStream<CartEvents>(Streams.Cart)
                const events = result?.events || []

                const inventoryEvents = await findEventStore().readStream<InventoryUpdatedEvent>(Streams.Inventory)
                const inventories = cartSubmissionInventoryStateView([], inventoryEvents?.events || [])

                const resultEvents = submitCartCommandHandler(events, {
                    type: 'SubmitCart',
                    data: {
                        aggregateId: props.aggregateId,
                        inventories: props.productIds.map(productId => {
                            return {
                                productId: productId,
                                quantity: inventories.find(item => item.productId == productId)?.inventory || 0
                            }
                        })
                    }
                })
                await findEventStore().appendToStream(Streams.Cart, resultEvents,
                    {expectedStreamVersion: result?.currentStreamVersion})
            }

            } className={"button is-info m-2"}><i className="fas fa-shopping-cart"></i>
            </button>
        </div>
    </div>
}