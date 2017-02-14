import itemTypes from './itemTypes';
import { normalItemKind, agedItemKind, legendaryItemKind, passItemKind } from './itemKinds';

export default class ItemWithBehavior {
  constructor(anItem, aKind = normalItemKind){
    this.item = anItem;
    this.kind = aKind;
  }
  update(){
    this.kind.updateSellIn(this.item);
    this.kind.updateQuality(this.item);
  }
  get name(){
    return this.item.name;
  }
  get sellIn(){
    return this.item.sellIn;
  }
  get quality(){
    return this.item.quality;
  }
}
ItemWithBehavior.from = anItem => new ItemWithBehavior(anItem, ItemWithBehavior.kindFor(anItem));
ItemWithBehavior.kindFor = anItem => ({
  [itemTypes.AGED]: agedItemKind,
  [itemTypes.PASS]: passItemKind,
  [itemTypes.LEGENDARY]: legendaryItemKind
}[anItem.name] || normalItemKind);
