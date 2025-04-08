import {useEffect, useState} from "react";
import {findEventStore, subscribeStream} from "@/app/infrastructure/inmemoryEventstore";
import {addItemCommandHandler} from "@/app/slices/additem/commandHandler";
import {v4} from "uuid";
import { Streams } from "@/app/api/Streams";
import {CartEvents} from "@/app/api/events/CartEvents";
import {useRouter} from "next/navigation";
import {removeItemCommandHandler} from "@/app/slices/removeitem/commandHandler";

export default function RemoveItem(props: {aggregateId: string, itemId: string, productId:string}) {

    return <div>
        <div className={"control"}>
            <button onClick={async () => {

                let result = await findEventStore().readStream<CartEvents>(Streams.Cart)
                let events = result?.events || []
                let resultEvents = await removeItemCommandHandler(events, {
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