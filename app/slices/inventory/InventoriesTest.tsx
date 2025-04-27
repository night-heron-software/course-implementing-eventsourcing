import {runTests, TestCollection} from "@/app/components/tests/TestRunner";
import {AddItemCommand} from "@/app/api/commands/AddItemCommand";
import {v4} from "uuid";
import {TestResultViewer} from "@/app/components/TestResultViewer";
import {InventoryUpdatedEvent} from "@/app/api/events/InventoryUpdatedEvent";
import {inventoriesStateView} from "@/app/slices/inventory/InventoriesStateView";


const prepareTestCollection = (): TestCollection<AddItemCommand, InventoryUpdatedEvent> => {
    return {
        slice_name: "inventory state view",
        tests: [
            {
                test_name: "calculates invenetory",
                given: [{
                    type: 'InventoryUpdated',
                    data: {
                        productId: v4(),
                        inventory: 5
                    }
                }, {
                    type: 'InventoryUpdated',
                    data: {
                        productId: "product-id",
                        inventory: 6
                    }
                }],
                test: async (testName: string, given, when) => {
                    const result = await inventoriesStateView(0, given, {productId: "product-id"})
                    return {
                        test_name: testName,
                        passed: result == 6,
                        message: "filters for inventory"
                    }
                }
            }]
    }
}

export default function InventoriesTest() {
    return <TestResultViewer slice={"Inventories"} results={runTests(prepareTestCollection)}/>
}