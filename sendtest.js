var ParallelRequest = require("parallel-http-request");

(async () => {
  var config = {
    response: "simple", // [optional] detail|simple|unirest, if empty then the response output is simple
  };

  var request = new ParallelRequest(config);

  request
    .add({
      url: "https://api.v2-stg.thuocsi.vn/delivery/transporting/v1/hub-order/status",
      method: "put",
      headers: {
        Authorization:
          "Bearer RU1QTE9ZRUUvbGFuLmRlbGl2ZXJ5LmJkOkxpSjJoaDh1OU5rQTdYMkdaSlNkazVjZnRwemZXYTZnUUplMWRBakozYXBDTDZndA==",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "User-Agent": "PostmanRuntime/7.30.0",
      },
      body: {
        referenceCode: "SOBD1540026",
        hubCode: "HUB_DT2",
        status: "DELIVERED",
        extraInfo: {
          pod: [
            "https://storage.googleapis.com/thuocsi-testing/WMS/2023-01/202300a6928539f54b053d81c749edf1",
          ],
        },
      },
    })
    .add({
      url: "https://api.v2-stg.thuocsi.vn/delivery/transporting/v1/hub-order/status",
      method: "put",
      headers: {
        Authorization:
          "Bearer RU1QTE9ZRUUvbGFuLmRlbGl2ZXJ5LmJkOkxpSjJoaDh1OU5rQTdYMkdaSlNkazVjZnRwemZXYTZnUUplMWRBakozYXBDTDZndA==",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "User-Agent": "PostmanRuntime/7.30.0",
      },
      body: {
        referenceCode: "SOBD1540026",
        hubCode: "HUB_DT2",
        status: "DELIVERED",
        extraInfo: {
          pod: [
            "https://storage.googleapis.com/thuocsi-testing/WMS/2023-01/202300a6928539f54b053d81c749edf1",
          ],
        },
      },
    })
    .add({
      url: "https://api.v2-stg.thuocsi.vn/delivery/transporting/v1/hub-order/status",
      method: "put",
      headers: {
        Authorization:
          "Bearer RU1QTE9ZRUUvbGFuLmRlbGl2ZXJ5LmJkOkxpSjJoaDh1OU5rQTdYMkdaSlNkazVjZnRwemZXYTZnUUplMWRBakozYXBDTDZndA==",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "User-Agent": "PostmanRuntime/7.30.0",
      },
      body: {
        referenceCode: "SOBD1540026",
        hubCode: "HUB_DT2",
        status: "DELIVERED",
        extraInfo: {
          pod: [
            "https://storage.googleapis.com/thuocsi-testing/WMS/2023-01/202300a6928539f54b053d81c749edf1",
          ],
        },
      },
    })
    .send(function (response) {
      console.log(response);
    });

  //   request
  //     .add({
  //       url: "https://api.v2-stg.thuocsi.vn/delivery/transporting/v1/hub-order/count",
  //       method: "get",
  //       headers: { Authorization: "Basic UEFSVE5FUi92MS5lcnA6MWtzOHI5Y3BBanM=" },
  //     })
  //     .add({
  //       url: "https://api.v2-stg.thuocsi.vn/delivery/transporting/v1/hub-order/count",
  //       method: "get",
  //       headers: { Authorization: "Basic UEFSVE5FUi92MS5lcnA6MWtzOHI5Y3BBanM=" },
  //     })
  //     .add({
  //       url: "https://api.v2-stg.thuocsi.vn/delivery/transporting/v1/hub-order/count",
  //       method: "get",
  //       headers: { Authorization: "Basic UEFSVE5FUi92MS5lcnA6MWtzOHI5Y3BBanM=" },
  //     })
  //     .send(function (response) {
  //       console.log(response);
  //     });
})();
