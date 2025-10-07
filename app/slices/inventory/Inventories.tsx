import { InventoryUpdatedEvent } from '@/app/api/events/InventoryChanged';
import { Streams } from '@/app/api/Streams';
import { subscribeStream, unsubscribeStream } from '@/app/infrastructure/inmemoryEventstore';
import { inventoriesStateView } from '@/app/slices/inventory/InventoriesStateView';
import { useEffect, useState } from 'react';

export default function Inventories(props: { productId: string }) {
    const [inventory, setInventory] = useState<number>(0);

    useEffect(() => {
        const subscription = subscribeStream(
            Streams.Inventory,
            (_nextExpectedStreamVersion, events: InventoryUpdatedEvent[]) =>
                setInventory((prevState) =>
                    inventoriesStateView(prevState, events, { productId: props.productId }),
                ),
        );
        return () => unsubscribeStream(Streams.Inventory, subscription);
    }, []);

    return <div className="tag is-light is-info">Available: {inventory}</div>;
}
