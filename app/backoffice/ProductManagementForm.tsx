'use client'

import React, {useState} from 'react'
import {findEventStore} from "@/app/infrastructure/inmemoryEventstore";
import {Streams} from "@/app/api/Streams";
import {PriceChangedEvent} from "@/app/api/events/PriceChanged";
import {DebugEvents} from "@/app/debug/eventsdebug";
import {InventoryUpdatedEvent} from "@/app/api/events/InventoryChanged";

export default function ProductManagementForm() {

    const [productId, setProductId] = useState<string>()
    const [inventory, setInventory] = useState(0)
    const [price, setPrice] = useState(0)

    return (
        <>
            <div className="field">
                <label className="label">Product ID</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Price</label>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button is-primary" onClick={() => {
                        if (productId) {

                            findEventStore().appendToStream<PriceChangedEvent>(Streams.Price, [{
                                type: "PriceChanged",
                                data: {
                                    productId: productId,
                                    price: price
                                }

                            }]);
                        }
                    }} type="submit">Update Price
                    </button>
                </div>
            </div>

            <div className="field">
                <label className="label">Inventory</label>
                <div className="control">
                    <input
                        className="input"
                        type="currency"
                        value={inventory}
                        onChange={(evt) => setInventory(Number(evt.target.value))}
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button className="button is-primary" onClick={async (_) => {
                        if (productId) {
                            await findEventStore().appendToStream<InventoryUpdatedEvent>(Streams.Inventory, [{
                                type: "InventoryUpdated",
                                data: {
                                    productId: productId,
                                    inventory: inventory
                                }
                            }])
                        }
                    }}>Update Inventory
                    </button>
                </div>
            </div>
            <DebugEvents/>
        </>
    )
}
