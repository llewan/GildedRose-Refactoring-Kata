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

describe('ItemNormal updated', () => {
  const itemName = 'sword';
  describe('when is in sell range', () => {
    it('should decrement its quality by 1', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, 10, 30);
      const actual = anUpdatedItem.quality;
      const expected = 29;
      expect(actual).toEqual(expected);
    });
    it('should decrement its sellIn by 1', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, 10, 30);
      const actual = anUpdatedItem.sellIn;
      const expected = 9;
      expect(actual).toEqual(expected);
    });
  });

  describe('when is out of date', () => {
    it('should decrement its quality by 2', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, -1, 30);
      const actual = anUpdatedItem.quality;
      const expected = 28;
      expect(actual).toEqual(expected);
    });
    it('should decrement its sellIn by 1', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, -1, 30);
      const actual = anUpdatedItem.sellIn;
      const expected = -2;
      expect(actual).toEqual(expected);
    });
  });

  describe('when it has a 0 quality', () => {
    it('should mantain its quality 0', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, -1, 0);
      const actual = anUpdatedItem.quality;
      const expected = 0;
      expect(actual).toEqual(expected);
    });
    it('should decrement its sellIn by 1', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, -1, 0);
      const actual = anUpdatedItem.sellIn;
      const expected = -2;
      expect(actual).toEqual(expected);
    });
  });

});

describe('Aged Brie updated', () => {
  const itemName = 'Aged Brie';
  describe('when is in sell range', () => {
    it('should increment its quality by 1', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, 10, 30);
      const actual = anUpdatedItem.quality;
      const expected = 31;
      expect(actual).toEqual(expected);
    });
  });

  describe('when is out of date', () => {
    it('should increment its quality by 2', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, -1, 30);
      const actual = anUpdatedItem.quality;
      const expected = 32;
      expect(actual).toEqual(expected);
    });
  });

  describe('when it has a 50 quality', () => {
    it('should mantain its quality 50', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, -1, 50);
      const actual = anUpdatedItem.quality;
      const expected = 50;
      expect(actual).toEqual(expected);
    });
  });

});

describe('Backstage Pass updated', () => {
  const itemName = 'Backstage passes to a TAFKAL80ETC concert';

  describe('when there is 10+ days left for the concert', () => {
    it('should increment its quality by 1', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, 11, 30);
      const actual = anUpdatedItem.quality;
      const expected = 31;
      expect(actual).toEqual(expected);
    });
    it('shouldnt go to quality > 50', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, 5, 50);
      const actual = anUpdatedItem.quality;
      const expected = 50;
      expect(actual).toEqual(expected);
    });
  });
  describe('when there is less than 10 days left for the concert', () => {
    it('should increment its quality by 2', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, 10, 30);
      const actual = anUpdatedItem.quality;
      const expected = 32;
      expect(actual).toEqual(expected);
    });
  });
  describe('when there is less than 5 days left for the concert', () => {
    it('should increment its quality by 3', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, 5, 30);
      const actual = anUpdatedItem.quality;
      const expected = 33;
      expect(actual).toEqual(expected);
    });
  });
  describe('when the concert was given', () => {
    it('should drop its quality to 0', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, 0, 30);
      const actual = anUpdatedItem.quality;
      const expected = 0;
      expect(actual).toEqual(expected);
    });
    it('shouldnt go to quality < 0', () => {
      const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, -1, 0);
      const actual = anUpdatedItem.quality;
      const expected = 0;
      expect(actual).toEqual(expected);
    });
  });

});

describe('Legendary item updated', () => {
  const itemName = 'Sulfuras, Hand of Ragnaros';

  it('shouldnt update its quality', () => {
    const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, 1, 80);
    const actual = anUpdatedItem.quality;
    const expected = 80;
    expect(actual).toEqual(expected);
  });

  it('shouldnt update its sellIn', () => {
    const anUpdatedItem = setupStoreWithNameSellInAndQuality(itemName, 1, 80);
    const actual = anUpdatedItem.sellIn;
    const expected = 1;
    expect(actual).toEqual(expected);
  });

});
