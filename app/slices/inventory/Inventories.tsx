import {subscribeStream, unsubscribeStream} from "@/app/infrastructure/inmemoryEventstore";
import {useEffect, useState} from "react";
import {Streams} from "@/app/api/Streams";
import {InventoryUpdatedEvent} from "@/app/api/events/InventoryChanged";
import {inventoriesStateView} from "@/app/slices/inventory/InventoriesStateView";

export default function Inventories(props: { productId: string }) {
    const [inventory, setInventory] = useState<number>(0)


    useEffect(() => {
        const subscription = subscribeStream(Streams.Inventory, (nextExpectedStreamVersion, events: InventoryUpdatedEvent[],) => {
            setInventory((prevState) => {
                return inventoriesStateView(prevState, events, {productId: props.productId})
            })
        })
        return () => {
            unsubscribeStream(Streams.Inventory, subscription)
        }
    }, []);

    return (
        <div className="tag is-light is-info">
            Available: {inventory}
        </div>
    )
}