import {TestResult} from "@/app/components/tests/TestRunner";
import {useEffect, useState} from "react";

export const TestResultViewer = (props: { slice: string, results: Promise<TestResult[]> }) => {

    const [testResults, setTestResults] = useState<TestResult[]>([])

    useEffect(() => {
        props.results?.then(result => setTestResults(result))
    }, []);

    return <div className={"content"}>
        <h2>{props.slice}</h2>
        {testResults.map(result => <div>
            <div className={"mb-2 p-2"}>
                <span>{result.passed ? "✅" : "❌"}</span>
                <span className={"p-2"}>{result.test_name}</span>
            </div>
        </div>)}
    </div>
}

