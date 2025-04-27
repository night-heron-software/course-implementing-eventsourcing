import {runTests, TestCollection} from "@/app/components/tests/TestRunner";
import {AddItemCommand} from "@/app/api/commands/AddItemCommand";
import {addItemCommandHandler} from "@/app/slices/additem/commandHandler";
import {CartEvents} from "@/app/api/events/CartEvents";
import {v4} from "uuid";
import {TestResultViewer} from "@/app/components/TestResultViewer";


const prepareTestCollection = (): TestCollection<AddItemCommand, CartEvents> => {
    return {
        slice_name: "add item",
        tests: [
            {
                test_name: "can add an item",
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
                    type: 'AddItem',
                    data: {
                        aggregateId: "1",
                        description: "test",
                        price: 100,
                        itemId: "1",
                        name: "test",
                        productId: "1"
                    }
                },
                test: async (testName: string, given, when) => {
                    const result = await addItemCommandHandler(given, when!)
                    return {
                        test_name: testName,
                        passed: result.length == 1,
                        message: "Event successfully applied"
                    }
                }
            },
            {
                test_name: "can only add 3 items",
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
                },
                    {
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
                when: {
                    type: 'AddItem',
                    data: {
                        aggregateId: "1",
                        description: "test",
                        price: 100,
                        itemId: "1",
                        name: "test",
                        productId: "1"
                    }
                },
                test: async (testName: string, given, when) => {
                    try {
                        await addItemCommandHandler(given, when!)
                        return {
                            test_name: testName,
                            passed: false,
                            message: "should not be able to add more than 3 items"
                        }
                    } catch (e) {
                        return {
                            test_name: testName,
                            passed: true,
                            message: "expected validation error if more than 3 items added"
                        }
                    }
                }
            }]
    }
}

export default function AddItemTests() {
    return <TestResultViewer slice={"Add Item"} results={runTests(prepareTestCollection)}/>
}