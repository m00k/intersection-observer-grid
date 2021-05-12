import { h } from 'preact';
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme';
import App from '../src/app/app';

describe('Initial Test of the App', () => {
    test('App renders', () => {
        const context = shallow(<App />);
        expect(context.find('#preact_root').exists()).toBeTruthy();
    });
});

