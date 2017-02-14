const normalItemKind = {
  updateQuality(anItem){
    const nextQuality = anItem.quality - (anItem.sellIn >= 0 ? 1 : 2);
    anItem.quality = nextQuality < 0 ? 0 : nextQuality;
  },
  updateSellIn(anItem){
    anItem.sellIn -= 1;
  }
};

const agedItemKind = {
  updateQuality(anItem){
    const nextQuality = anItem.quality + (anItem.sellIn >= 0 ? 1 : 2);
    anItem.quality = nextQuality > 50 ? 50 : nextQuality;
  },
  updateSellIn: normalItemKind.updateSellIn
};

const legendaryItemKind = {
  updateQuality: Function.prototype,
  updateSellIn: Function.prototype
};

const passItemKind = {
  updateQuality(anItem){
    let nextQuality = anItem.quality + 1;
    if(anItem.sellIn < 10 && anItem.sellIn > 5) nextQuality = anItem.quality + 2;
    if(anItem.sellIn <= 5 && anItem.sellIn > 0) nextQuality = anItem.quality + 3;
    if(anItem.sellIn <= 0) nextQuality = 0;
    anItem.quality = nextQuality > 50 ? 50 : nextQuality;
  },
  updateSellIn: normalItemKind.updateSellIn
};

export {
  normalItemKind,
  agedItemKind,
  legendaryItemKind,
  passItemKind
}
