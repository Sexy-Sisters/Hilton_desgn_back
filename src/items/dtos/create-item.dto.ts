import { BusinessType } from '../enums/business-type.enums';
import { ItemStatus } from '../enums/item-status.enums';
import { ItemType } from '../enums/item-type.enums';

export class CreateItemDto {
  name: string;
  description: string;
  price: number;
  discountRate: number;
  category: string;
  subcategory: string;
  colors: string[];
  businessType: BusinessType[];
  type: ItemType;
  status: ItemStatus;
  thumbnailImage: string;
  itemImages: string[];
  detailImages: string[];
  optionGroupList: OptionGroup[];
}

export class OptionGroup {
  name: string;
  optionList: Option[];
}

export class Option {
  name: string;
  price: number;
}
