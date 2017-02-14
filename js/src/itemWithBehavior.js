import itemTypes from './itemTypes';
import { normalItemKind, agedItemKind, legendaryItemKind, passItemKind } from './itemKinds';

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
    return Object.assign({}, anItem, commonBehavior, ItemWithBehavior.kindFor(anItem));
  },
  kindFor(anItem){
    return {
      [itemTypes.AGED]: agedItemKind,
      [itemTypes.PASS]: passItemKind,
      [itemTypes.LEGENDARY]: legendaryItemKind
    }[anItem.name] || normalItemKind;
  }
};

export {
  ItemWithBehavior as default,
  commonBehavior
};
