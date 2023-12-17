// (async () => {
//   const src = chrome.runtime.getURL('src/contentScripts/index.js');
//   const contentScript = await import(src);
//   contentScript.initialize();
// })();



chrome.runtime.sendMessage(
  {
    action: "callApi",
    url: "http://localhost:8000/bookmarks",
  },
  function (response) {
    console.log(response);
  }
);
// function importDynamicModule(modulePath) {
//     const extensionURL = chrome.runtime.getURL('');
//     const fullModulePath = new URL(modulePath, extensionURL).toString();
//     return import(fullModulePath);
//   }
//   console.log("hu");
//   // Sử dụng hàm trung gian để nhập động module
//   importDynamicModule('src/contentScripts/index.js')
//     .then((module) => {
//       // Mã của bạn ở đây
//     })
//     .catch((error) => console.error('Lỗi nhập động:', error));
  



// (async () => {
    
// })();
// import initialize from './src/contentScripts/index.js';
// async function test () {
//     const src = chrome.runtime.getURL('./src/contentScripts/index.js');
//     const contentScript = await import(src);
//     contentScript.initialize();
// }
// test()
// initialize();
{/* <script type="module" src="./src/contentScripts/index.js" /> */}

// import('./src/contentScripts/index.js')
//   .then((module) => {
//     console.log(module);
//   })
//   .catch((error) => console.error('Lỗi nhập động:', error));

// const moduleURL = chrome.runtime.getURL('./src/contentScripts/index.js');
// import(moduleURL)
//   .then((module) => {
//     // Mã của bạn ở đây
//   })
//   .catch((error) => console.error('Lỗi nhập động:', error));

