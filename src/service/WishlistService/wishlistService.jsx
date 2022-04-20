
const wishListDataMapper = (list) => {
    return Object.entries(list).map(([wishlistId, val]) => ({
      ...val,
      wishlistId,
    }));
  };
export default class WishlistService {
    static BASE_URL = "https://ecommproject-99c7e-default-rtdb.firebaseio.com";

    static async wishlistCreate(user) {
        return fetch(this.BASE_URL + "/wishlist.json", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
      }


    static async wishLIstGetData() {
        return fetch(this.BASE_URL + "/wishlist.json")
          .then((res) => res.json())
          .then(wishListDataMapper);
      }

      static async wishListDeleteData(id) {
        return fetch(this.BASE_URL + `/wishlist/${id}.json`, {
          method: "DELETE",
        }).then((res) => res.json());
      }

}