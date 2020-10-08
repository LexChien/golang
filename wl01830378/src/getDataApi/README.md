
## API 設定
### 資料夾 configs/config.json
1. addr - api ip
2. port - api listen port
3. servAddr - 解碼server ip
4. servPort - 解碼server listen port
5. connTime - 解碼server connect timeout(秒)
6. reconnTime - 解碼server 斷線重連等候時間(分)

## 使用
1. 修改 `configs/config.json` 的ip、port
2. 啟動 `getDataApi.go`
3. 數據發送程序，連線至 `getDataApi.go` 指定ip、port