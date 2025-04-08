import {assert, runTests, TestCase, TestCollection, TestResult} from "@/app/components/tests/TestRunner";
import {AddItemCommand} from "@/app/api/commands/AddItemCommand";
import {Event} from "@event-driven-io/emmett"
import {addItemCommandHandler} from "@/app/slices/additem/commandHandler";
import {CartEvents} from "@/app/api/events/CartEvents";
import {ItemAddedEvent} from "@/app/api/events/ItemAddedEvent";
import {v4} from "uuid";
import {TestResultViewer} from "@/app/components/TestResultViewer";
import {useEffect} from "react";
import {cartItemsStateView} from "@/app/slices/cartitems/CartItemsStateView";


const prepareTestCollection = (): TestCollection<AddItemCommand, CartEvents> => {
    return {
        slice_name: "cart items",
        tests: [
            {
                test_name: "shows all cart items",
                given: [{
                    type: 'ItemAdded',
                    data: {
                        aggregateId: v4(),
                        itemId: "1",
                        name: "test",
                        price: 100,
                        description: "test",
                        productId: "1"

                    }
                }, {
                    type: 'ItemAdded',
                    data: {
                        aggregateId: v4(),
                        itemId: "1",
                        name: "test",
                        price: 100,
                        description: "test",
                        productId: "1"

                    }
                }],
                test: async (testName: string, given, when) => {
                    let result = await cartItemsStateView([],given)
                    return {
                        test_name: testName,
                        passed: result.length == 2,
                        message: "Added 2 Cart Items"
                    }
                }
            },{
                test_name: "added an item and removed it again",
                given: [{
                    type: 'ItemAdded',
                    data: {
                        aggregateId: v4(),
                        itemId: "1",
                        name: "test",
                        price: 100,
                        description: "test",
                        productId: "1"

                    }
                }, {
                    type: 'ItemRemoved',
                    data: {
                        aggregateId: v4(),
                        itemId: "1",
                        productId: "1"
                    }
                }],
                test: async (testName: string, given, when) => {
                    let result = await cartItemsStateView([],given)
                    return {
                        test_name: testName,
                        passed: result.length == 0,
                        message: "added an item and removed it again"
                    }
                }
            }]
    }
}

export default function CartItemsTests() {
    return <TestResultViewer slice={"Cart Items"} results={runTests(prepareTestCollection)}/>
}