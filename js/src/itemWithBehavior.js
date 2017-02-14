import getKindFor from './itemKinds';

const commonBehavior = {
  update(){
    this.updateSellIn().updateQuality();
  },
  updateSellIn(){
    this.sellIn--;
    return this;
  }
};

const ItemWithBehavior = {
  from(anItem){
    return Object.assign({}, anItem, commonBehavior, getKindFor(anItem));
  }
};

export {
  ItemWithBehavior as default,
  commonBehavior
};
