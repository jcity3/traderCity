const API_KEY = '';
const API_SECRET = '';
const PAPER = true;

let Alpaca = require('@alpacahq/alpaca-trade-api');
let alpaca = new Alpaca({
    keyId: API_KEY, 
    secretKey: API_SECRET, 
    paper: PAPER
});

// run();
// async function run(){
//     let res = await alpaca.getAssets({
//         status: 'active',
//         asset_class: 'us_equity',
//     }).filter((asset) => 
//         asset.exchange == 'NASDAQ'
//     );
    
//     console.log(res);
// }

// Get a list of all active assets.
const activeAssets = alpaca
  .getAssets({
    status: "active",
    asset_class: 'us_equity',
  })
  .then((activeAssets) => {
    // Filter the assets down to just those on NASDAQ.
    const nasdaqAssets = activeAssets.filter(
      (asset) => asset.exchange == "NASDAQ" && asset.tradable == true && asset.fractionable == true && asset.shortable && asset.marginable
    );
    console.log(nasdaqAssets);
  });

  // Every minute check positions
  // if position can be added towards limit, create an order to 