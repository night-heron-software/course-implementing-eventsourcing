'use client'

import React, { useState } from 'react'
import { DebugEvents } from '@/app/debug/eventsdebug'
import { v4 } from 'uuid'
import Navigation from '@/app/components/Navigation'
import AddItem from '@/app/slices/additem/AddItem'

export default function ProductsPage() {
  const [cartSession, setCartSession] = useState(v4())
  const [products, setProducts] = useState([
    {
      productId: '1',
      price: 19.99,
      name: 'Premium Coffee Brand',
      description: 'A premium coffee brand that offers a unique and exceptional coffee experience.',
    },
    {
      productId: '2',
      price: 24.99,
      name: 'Single Origin Ethiopian',
      description: 'Rich, floral Ethiopian coffee with distinctive blueberry notes and smooth finish.',
    },
    {
      productId: '3',
      price: 21.99,
      name: 'Dark Roast Espresso',
      description: 'Bold and intense espresso blend perfect for creating authentic Italian coffee drinks.',
    },
    {
      productId: '4',
      price: 18.99,
      name: 'Colombian Supremo',
      description: 'Medium roasted Colombian beans with caramel sweetness and nutty undertones.',
    },
    {
      productId: '5',
      price: 22.99,
      name: 'Organic Cold Brew Blend',
      description: 'Specially crafted blend for smooth, low-acid cold brew with chocolate notes.',
    },
  ])
  return (
    <>
      <Navigation />
      <section className="section main-container container content">
        <div className="">
          <div className="columns is-flex-wrap-wrap">
            {products.map((product) => {
              return (
                <div key={product.productId} className={'column is-4 p-3 m-4'}>
                  <div className={'columns'}>
                    <div className={'panel'}>
                      <h3 className={'panel-heading'}>{product.name}</h3>
                      <div className={'panel-block'}>
                        <div>{product.description}</div>
                        <b className={'notification'}>{product.price}</b>
                      </div>
                      <AddItem aggregateId={cartSession} selectedProduct={product} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <DebugEvents />
        </div>
      </section>
    </>
  )
}
