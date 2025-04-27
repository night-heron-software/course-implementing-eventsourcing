import {CartEvents} from "@/app/api/events/CartEvents";
import {AddItemCommand} from "@/app/api/commands/AddItemCommand";

export type TestCollection<COMMAND, EVENT> = { slice_name: string, tests: TestCase<COMMAND, EVENT>[] }

export type TestCase<COMMAND, EVENT> = {
    test_name: string,
    given: EVENT[],
    when?: COMMAND,
    test: (testName: string, given: EVENT[], when?: COMMAND) => Promise<TestResult>
}

export type TestResult = {
    test_name: string,
    passed: boolean,
    message?: string
}

export const assert = (condition, message) => {
    if (!condition) throw new Error(message);
}

export const runTests = async (prepareTestCollection: () => TestCollection<any, any>): Promise<TestResult[]> => {
    const results: TestResult[] = []
    const tests: TestCollection<AddItemCommand, CartEvents> = prepareTestCollection()
    tests.tests.forEach(test_case => {
        try {
            test_case.test(test_case.test_name, test_case.given, test_case.when).then((result) => {
                results.push(result)
            })
        } catch (error) {
            results.push({test_name: test_case.test_name, passed: false, message: error?.toString()})
        }
    });
    return results
}