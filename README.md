# 公文歸檔系統

> 此網絡用途於將公文歸檔，並提供查詢與調閱功能。

此網絡定義以下項目:

**參與者 (Participants)**
`秘書(Secretary)` `調閱人(Querent)`

**資產 (Assets)**
`公文(OfficialDocument)` 

**交易 (Transactions)**
`歸檔(Archive)`, `查詢(Search)`, `調閱(Query)` 

**事件 (Events)**
`歸檔(ArchiveEvent)`, `查詢(SearchEvent)`, `調閱(QueryEvent)` 

`秘書` 可以從檔案中匯入 `公文`，選擇需要的公文進行 `歸檔`。
`調閱人` 可以在網絡中執行 `查詢`，從查詢結果中執行 `調閱`。

# 使用範例
`秘書` 收到公文檔案，.CSV檔的格式。匯入到網站中。經過解譯之後，在網頁上顯示出公文的列表。 `秘書` 在列表中勾選需要歸檔的公文。 執行「送出」後將勾選的公文進行歸檔。`調閱人` 可以在查詢頁面中下關鍵字執行查詢。查詢的公文將列表在網頁上。`調閱人` 可選擇某一筆公文進行 `調閱`。


# 在練習場中測試

To test this Business Network Definition in the **Test** tab:

Submit a `SetupDemo` transaction:

```
{
  "$class": "org.acme.vehicle.lifecycle.SetupDemo"
}
```

This transaction populates the Participant Registries with three `Manufacturer` participants, twenty-three `PrivateOwner` participants and a `Regulator` participant. The `Vehicle` Asset Registry will have thirteen `Vehicle` assets.

Submit a `PlaceOrder` transaction:

```
{
  "$class": "org.acme.vehicle.lifecycle.manufacturer.PlaceOrder",
  "orderId": "1234",
  "vehicleDetails": {
    "$class": "org.vda.VehicleDetails",
    "make": "Arium",
    "modelType": "Gamora",
    "colour": "Sunburst Orange"
  },
  "manufacturer": "resource:org.acme.vehicle.lifecycle.manufacturer.Manufacturer#Arium",
  "orderer": "resource:org.acme.vehicle.lifecycle.PrivateOwner#toby"
}
```

This `PlaceOrder` transaction creates a new order in the `Order` Asset Registry. It also emits a `PlaceOrderEvent` events.

Submit a `UpdateOrderStatus` transaction:

```
{
  "$class": "org.acme.vehicle.lifecycle.manufacturer.UpdateOrderStatus",
  "orderStatus": "SCHEDULED_FOR_MANUFACTURE",
  "order": "resource:org.acme.vehicle.lifecycle.manufacturer.Order#1234"
}
```

This `UpdateOrderStatus` transaction updates the order status of `orderId:1234` in the `Order` Asset Registry. It also emits a `UpdateOrderStatusEvent` event.

Congratulations!

This Business Network definition had been used to create demo applications for the `PrivateOwner`, `Manufacturer` and `Regulator`. Find more information here: https://github.com/hyperledger/composer-sample-applications/tree/master/packages/vehicle-lifecycle

## License <a name="license"></a>
Hyperledger Project source code files are made available under the Apache License, Version 2.0 (Apache-2.0), located in the LICENSE file. Hyperledger Project documentation files are made available under the Creative Commons Attribution 4.0 International License (CC-BY-4.0), available at http://creativecommons.org/licenses/by/4.0/.