export class CartItem {
    productCode: string;
    productName: string;
    quantity: number;
    totalPrice: number;
    mauSac: string;
    size: string;
    owner :string;
  
    constructor(
      productCode: string,
      productName: string,
      quantity: number,
      totalPrice: number,
      mauSac: string,
      size: string,
      owner :string,
    ) {
      this.productCode = productCode;
      this.productName = productName;
      this.quantity = quantity;
      this.totalPrice = totalPrice;
      this.mauSac = mauSac;
      this.size = size;
      this.owner =owner;
    }
  }
  