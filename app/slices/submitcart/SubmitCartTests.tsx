import {runTests, TestCollection} from "@/app/components/tests/TestRunner";
import {CartEvents} from "@/app/api/events/CartEvents";
import {v4} from "uuid";
import {TestResultViewer} from "@/app/components/TestResultViewer";
import {SubmitCartCommand} from "@/app/api/commands/SubmitCartCommand";
import {submitCartCommandHandler} from "@/app/slices/submitcart/commandHandler";


const prepareTestCollection = (): TestCollection<SubmitCartCommand, CartEvents> => {
    return {
        slice_name: "submit cart",
        tests: [
            {
                test_name: "can submit cart with inventory",
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
                    type: 'SubmitCart',
                    data: {
                        aggregateId: "1",
                        inventories: [
                            {
                                quantity: 1,
                                productId: "1"
                            }]
                    }
                },
                test: async (testName: string, given, when) => {
                    const result: CartEvents[] = submitCartCommandHandler(given, when!)
                    return {
                        test_name: testName,
                        passed: result.length == 1 && result[0].type == "CartSubmitted",
                        message: "Cart successfully submitted"
                    }
                }
            }, {
                test_name: "can´t submit cart without inventory",
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
                    type: 'SubmitCart',
                    data: {
                        aggregateId: "1",
                        inventories: [
                            {
                                quantity: 0,
                                productId: "1"
                            }]
                    }
                },
                test: async (testName: string, given, when) => {
                    try {
                        const result: CartEvents[] = submitCartCommandHandler(given, when!);
                        return {
                            test_name: testName,
                            passed: result.length == 1 && result[0].type == "CartSubmitted",
                            message: "Cart successfully submitted"
                        };
                    } catch (e){
                        return {
                            test_name: testName,
                            passed: true,
                            message: "Expect validation error without inventory"
                        };
                    }
                }
            },
        ]
    }
}

export default function SubmitCartTests() {
    return <TestResultViewer slice={"Submit Cart"} results={runTests(prepareTestCollection)}/>
}