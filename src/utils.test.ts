import {getSchemaNameFromResponse, sentenceToCamelCase, toFirstUpperLetter} from "./utils";

test("should make first letter in the string an upper case", () => {
    const initialString = 'someDummyString';
    const convertedString = toFirstUpperLetter(initialString);

    expect(initialString[0].toUpperCase()).not.toBe(initialString[0]);
    expect(convertedString[0]).toBe(initialString[0].toUpperCase());
    expect(convertedString.slice(1)).toBe(initialString.slice(1));
});

test("should convert any sentence to combined camel case name", () => {
    const sentence = 'this Is some example sentence with API and other...';
    const result = 'thisIsSomeExampleSentenceWithAPIAndOther';

    expect(sentenceToCamelCase(sentence)).toBe(result);
});

test("should extract schema from the response object of openapi", () => {
    const result = 'SomeName';
    const api = {
        content: {
            "application/json": {
                schema: {
                    "$ref": '#/components/names/' + result
                }
            }
        }
    }

    expect(getSchemaNameFromResponse(api)).toBe(result);
    expect(getSchemaNameFromResponse({})).toBe('specify_the_return_schema_with_ref');
});

