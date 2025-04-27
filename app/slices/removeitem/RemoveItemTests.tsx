import {runTests, TestCollection} from "@/app/components/tests/TestRunner";
import {CartEvents} from "@/app/api/events/CartEvents";
import {v4} from "uuid";
import {TestResultViewer} from "@/app/components/TestResultViewer";
import {RemoveItemCommand} from "@/app/api/commands/RemoveItemCommand";
import {removeItemCommandHandler} from "@/app/slices/removeitem/commandHandler";


const prepareTestCollection = (): TestCollection<RemoveItemCommand, CartEvents> => {
    return {
        slice_name: "add item",
        tests: [
            {
                test_name: "can remove an item",
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
                }],
                when: {
                    type: 'RemoveItem',
                    data: {
                        aggregateId: "1",
                        itemId: "1",
                        productId: "1"
                    }
                },
                test: async (testName: string, given, when) => {
                    const result = await removeItemCommandHandler(given, when!)
                    return {
                        test_name: testName,
                        passed: result.length === 1 && result[0].type === "ItemRemoved" && result[0].data.itemId === "1",
                        message: "Remove item successfully applied"
                    }
                }
            },{
                test_name: "cannot remove an item",
                given: [{
                    type: 'ItemAdded',
                    data: {
                        aggregateId: v4(),
                        itemId: "2",
                        name: "test",
                        price: 100,
                        description: "test",
                        productId: "1"

                    }
                }],
                when: {
                    type: 'RemoveItem',
                    data: {
                        aggregateId: "1",
                        itemId: "1",
                        productId: "1"
                    }
                },
                test: async (testName: string, given, when) => {
                    try {
                        const result = await removeItemCommandHandler(given, when!);
                        return {
                            test_name: testName,
                            passed: false,
                            message: "exception expected"
                        }
                    } catch (error) {
                        return {
                            test_name: testName,
                            passed: true,
                            message: "expected exception if cart item is not in cart"
                        }
                    }

                }
            },
        ]
    }
}

export default function RemoveItemTests(){
    return <TestResultViewer slice={"Remove Item"} results={runTests(prepareTestCollection)}/>
}