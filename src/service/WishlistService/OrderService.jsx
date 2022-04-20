const orderDataMapper = (list) => {
  return Object.entries(list).map(([orderId, val]) => ({
    ...val,
    orderId,
  }));
};
export default class OrderHistoryService {
  static BASE_URL = "https://ecommproject-99c7e-default-rtdb.firebaseio.com";

  static async orderCreate(order) {
    return fetch(this.BASE_URL + "/orders.json", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  static async OrderGetData() {
    return fetch(this.BASE_URL + "/orders.json")
      .then((res) => res.json())
      .then(orderDataMapper);
  }

  static async OrderDelete(id) {
    return fetch(this.BASE_URL + `/orders/${id}.json`, {
      method: "DELETE",
    });
  }

  static async orderCancel(id) {
    return fetch(this.BASE_URL + `/orders/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ status: "canceled" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
