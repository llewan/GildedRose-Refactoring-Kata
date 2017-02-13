import expect from 'expect';
import { Shop, Item } from '../src/gilded_rose';

function setupStoreWithNameSellInAndQuality(name = 'sword', sellIn = 10, quality = 30){
  return new Shop([new Item(name, sellIn, quality)]).updateQuality()[0];
}

describe('Item', () => {
  it('should store name, sellIn and quality', () => {
    const actual = new Item('sword', 10, 30);
    const expected = {
      __proto__: Item.prototype,
      name: 'sword',
      sellIn: 10,
      quality: 30
    };
    expect(actual).toEqual(expected);
  });
});
