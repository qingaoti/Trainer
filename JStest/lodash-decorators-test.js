import {After} from 'lodash-decorators';

class MyClass {
    @After(2)
    fn() {
        return 10;
    }
}

const myClass = new MyClass();

myClass.fn(); // => undefined
myClass.fn(); // => 10