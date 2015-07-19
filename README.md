# stock_trading_simluator

**How to run?**

1) Download historical stock data
```
cd bin
./download.sh
```
2) Start up the rails server to serve stock data
```
  rails s
```
3) Open ui/chart.html in a browser
- Click "Random Stock" to generate chart for a stock
- Click "Next" to move forward in time
- If you want to buy or sell a stock, specify the order and then click "Next" to execute on the next trading day