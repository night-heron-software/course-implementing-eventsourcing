'use client'

import React, {useEffect} from "react";
import {DebugEvents} from "@/app/debug/eventsdebug";
import Navigation from "@/app/components/Navigation";
import CartItems from "@/app/slices/cartitems/CartItems";
import {CART_SESSION} from "@/app/cart/CartSession";

export default function CartPage() {

    useEffect(() => {

    }, []);

    return (<>
        <Navigation/>
        <section className="section main-container">
        <div className="">
            <div className="columns">
                <div className={"container"}>
                   <CartItems aggregateId={CART_SESSION}/>
                </div>
            </div>
        </div>
        <DebugEvents/>
    </section></>)
}