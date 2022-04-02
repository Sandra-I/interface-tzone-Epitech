
import UnknownMessageError from './unknownMessageError';

describe("UnknownMEssageError class test", () => {
    it("should throw an error", () => {
        expect(() => { throw new UnknownMessageError("error") }).toThrowError();
    })
})