import Selector from "../components/selector"

let selector: Selector;
describe('selector', () => {

    beforeEach( () => selector = new Selector());

    it('should init selector', () => {
        selector.select();
        expect(selector.isSelecting).toBeTruthy();
    });
})