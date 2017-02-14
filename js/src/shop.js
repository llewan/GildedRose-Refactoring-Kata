import ItemWithBehavior from './itemWithBehavior';

export default class Shop {
  constructor(items=[]){
    this.items = items.map(ItemWithBehavior.from);
  }
  updateQuality() {
    this.items.forEach( anItemWithBehaviour => {
      anItemWithBehaviour.update();
    });
    return this.items;
  }
}
