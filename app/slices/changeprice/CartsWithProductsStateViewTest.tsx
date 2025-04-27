import {runTests, TestCollection} from "@/app/components/tests/TestRunner";
import {CartEvents} from "@/app/api/events/CartEvents";
import {ItemAddedEvent} from "@/app/api/events/ItemAddedEvent";
import {v4} from "uuid";
import {TestResultViewer} from "@/app/components/TestResultViewer";
import {cartsWithProductsStateView} from "@/app/slices/changeprice/cartsWithProductsStateView";


const prepareTestCollection = (): TestCollection<undefined, CartEvents> => {
    const itemAdded: ItemAddedEvent = {
        type: 'ItemAdded',
        data: {
            productId: "product-1",
            aggregateId: "cart-session",
            name: "productName",
            itemId: v4(),
            price: 99.99,
            description: ""
        }
    }
    return {
        slice_name: "Carts with Products",
        tests: [
            {
                test_name: "adds an Item",
                given: [itemAdded],
                test: async (testName: string, given: CartEvents[]) => {
                    const result = cartsWithProductsStateView([], given)
                    return {
                        test_name: testName,
                        passed: result.length === 1 && result[0].cartItems[0]?.productId == itemAdded.data.productId,
                        message: "Cart should contain one product"
                    }
                }
            },
            {
                test_name: "adds and removes an Item",
                given: [itemAdded, {
                    type: 'ItemRemoved',
                    data: {
                        aggregateId: itemAdded.data.aggregateId,
                        itemId: itemAdded.data.itemId,
                        productId: itemAdded.data.productId,
                    }
                }],
                test: async (testName: string, given: CartEvents[]) => {
                    const result = cartsWithProductsStateView([], given)
                    return {
                        test_name: testName,
                        passed: result.length === 1 && result[0].cartItems.length === 0,
                        message: "Cart should be empty if product is removed again"
                    }
                }
            },
            {
                test_name: "adds and removes and clears the cart",
                given: [itemAdded, {
                    type: 'CartCleared',
                    data: {
                        aggregateId: itemAdded.data.aggregateId,
                    }
                }],
                test: async (testName: string, given: CartEvents[]) => {
                    const result = cartsWithProductsStateView([], given)
                    return {
                        test_name: testName,
                        passed: result.length === 1 && result[0].cartItems.length === 0,
                        message: "Cart should be empty if cleared"
                    }
                }
            },
            {
                test_name: "adds and removes and clears the cart",
                given: [itemAdded, {
                    type: 'ItemArchived',
                    data: {
                        aggregateId: itemAdded.data.aggregateId,
                        itemId: itemAdded.data.itemId,
                        productId: itemAdded.data.productId
                    }
                }],
                test: async (testName: string, given: CartEvents[]) => {
                    const result = cartsWithProductsStateView([], given)
                    return {
                        test_name: testName,
                        passed: result.length === 1 && result[0].cartItems.length === 0,
                        message: "Cart should be empty if product is archived"
                    }
                }
            }]
    }
}

export default function CartsWithProductsTest() {
    return <TestResultViewer slice={"Carts with Products"} results={runTests(prepareTestCollection)}/>
}
