import { useEffect, useState } from 'react';
import { findEventStore, subscribeStream } from '@/app/infrastructure/inmemoryEventstore';
import { addItemCommandHandler } from '@/app/slices/additem/commandHandler';
import { v4 } from 'uuid';
import { Streams } from '@/app/api/Streams';
import { CartEvents } from '@/app/api/events/CartEvents';
import AddItemTests from '@/app/slices/additem/AddItemTests';

export type Product = {
    name: string;
    price: number;
    description: string;
    productId: string;
};

export default function AddItem(props: { aggregateId: string; selectedProduct: Product }) {
    return (
        <div>
            <div className={'control'}>
                <button
                    onClick={async () => {
                        // step 1 - read current state from the event store
                        let result = await findEventStore().readStream<CartEvents>(Streams.Cart);
                        let events = result?.events || [];
                        // step 2 - call command handler to get new events
                        let resultEvents = await addItemCommandHandler(events, {
                            type: 'AddItem',
                            data: {
                                aggregateId: props.aggregateId,
                                name: props.selectedProduct.name,
                                productId: props.selectedProduct.productId,
                                description: props.selectedProduct.description,
                                price: props.selectedProduct.price,
                                itemId: v4(),
                            },
                        });
                        // step 3 - append new events to the event store
                        await findEventStore().appendToStream(Streams.Cart, resultEvents, {
                            expectedStreamVersion: result?.currentStreamVersion,
                        });
                    }}
                    className={'button is-info m-2'}
                >
                    Add Item
                </button>
            </div>
        </div>
    );
}
