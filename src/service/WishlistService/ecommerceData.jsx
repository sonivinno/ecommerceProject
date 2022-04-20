const productDataMapper = (list) => {
  return Object.entries(list).map(([id, val]) => ({ ...val, id }));
};

// const wishListDataMapper = (list) => {
//   return Object.entries(list).map(([wishlistId, val]) => ({
//     ...val,
//     wishlistId,
//   }));
// };

export default class EcommerceService {
  static BASE_URL = "https://ecommproject-99c7e-default-rtdb.firebaseio.com";

  static async getData() {
    return fetch(this.BASE_URL + "/products.json")
      .then((res) => res.json())
      .then(productDataMapper);
  }

  static async getDataById(id) {
    return this.getData().then((res) => res.find((r) => r.id === id));
  }

  // static async wishLIstGetData() {
  //   return fetch(this.BASE_URL + "/wishlist.json")
  //     .then((res) => res.json())
  //     .then(wishListDataMapper);
  // }

  // static async wishlistUser(user) {
  //   return fetch(this.BASE_URL + "/wishlist.json", {
  //     method: "POST",
  //     body: JSON.stringify(user),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => res.json());
  // }
}
