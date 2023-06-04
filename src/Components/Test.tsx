import { TestTypes } from "../enums/enums"
import { InputTest as InputTestType, SelectionTest as SelectionTestType, TrueFalseTest as TrueFalseTestType } from "../types/types"
import { InputTest } from "./InputTest"
import { SelectionTest } from "./SelectionTest";
import { TrueFalseTest } from "./TrueFalseTest"

interface Props {
    test: InputTestType | TrueFalseTestType | SelectionTestType;
}

export const Test = ({ test }: Props) => {
    console.log(test.type)
    switch (test.type) {
        case TestTypes.InputTest:
            return <InputTest test={test} />
        case TestTypes.TrueFalseTest:
            return <TrueFalseTest test={test} />
        case TestTypes.SelectionTest:
            return <SelectionTest test={test} />

    }
}