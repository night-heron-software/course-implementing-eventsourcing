'use client'

import React, {useEffect} from "react"
import Navigation from "@/app/components/Navigation"
import ProductManagementForm from "@/app/backoffice/ProductManagementForm"
import {subscribeStream, unsubscribeStream} from "@/app/infrastructure/inmemoryEventstore";
import {Streams} from "@/app/api/Streams";
import {CartEvents} from "@/app/api/events/CartEvents";
import {archiveItemTodoListProcessor} from "@/app/slices/changeprice/archiveItemTodoListProcessor";
import {priceChangeProcessor} from "@/app/slices/changeprice/priceChangeProcessor";
import {PriceChangedEvent} from "@/app/api/events/PriceChanged";

export default function PrototypePage() {

    useEffect(() => {
        const subscription = subscribeStream<PriceChangedEvent>(Streams.Price, (_: bigint, events: PriceChangedEvent[]) => {
            console.log("Price Change processor")
            priceChangeProcessor(events.filter(it => it.type == 'PriceChanged'))
        })
        return () => unsubscribeStream(Streams.Price, subscription)
    }, []);

    useEffect(() => {
        const subscription = subscribeStream<CartEvents>(Streams.Cart, (_: bigint, events: CartEvents[]) => {
            console.log("Archive Item processor")
            archiveItemTodoListProcessor(events);
        })
        return () => unsubscribeStream(Streams.Cart, subscription)

    }, []);
    return (<>
        <Navigation/>
        <section className="section main-container">
            <div className="columns">
                <div className="column is-half">
                    <ProductManagementForm/>
                </div>

            </div>
        </section>
    </>)
}