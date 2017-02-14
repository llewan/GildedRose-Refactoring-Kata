import itemTypes from './itemTypes';

const normalItemKind = {
  updateQuality(){
    const nextQuality = this.quality - (this.sellIn >= 0 ? 1 : 2);
    this.quality = nextQuality < 0 ? 0 : nextQuality;
    return this;
  }
};

const agedItemKind = {
  updateQuality(){
    const nextQuality = this.quality + (this.sellIn >= 0 ? 1 : 2);
    this.quality = nextQuality > 50 ? 50 : nextQuality;
    return this;
  }
};

const legendaryItemKind = {
  updateQuality(){ return this },
  updateSellIn(){ return this }
};

const passItemKind = {
  updateQuality(){
    let nextQuality = this.quality + 1;
    if(this.sellIn < 10 && this.sellIn > 5) nextQuality = this.quality + 2;
    if(this.sellIn <= 5 && this.sellIn > 0) nextQuality = this.quality + 3;
    if(this.sellIn <= 0) nextQuality = 0;
    this.quality = nextQuality > 50 ? 50 : nextQuality;
    return this;
  }
};

export default function getkindFor(anItem){
  return {
    [itemTypes.AGED]: agedItemKind,
    [itemTypes.PASS]: passItemKind,
    [itemTypes.LEGENDARY]: legendaryItemKind
  }[anItem.name] || normalItemKind;
}
