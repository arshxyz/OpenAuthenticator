const got = require('got');
// WIP
const matchpattern = /^<link\s+(?:type="[^"]+"\s*)?(?:rel="(?:shortcut\s+)?icon"\s*)?(?:type="[^"]+"\s*)?href="([^"]+)"(?:type="[^"]+"\s*)?(?:\s*rel="(?:shortcut\‌​s+)?icon"\s*)?(?:type="[^"]+"\s*)?\s*>$/
;

async function getIcoURL(url) {
  let stub = '';
  stub = await got(url)
    .then((resp) => {
    //   const tes = "<link rel="icon" href="f.ico"/>"
      return console.log(resp.body);
    })
    .catch((error) => {
      console.error(error);
    });
  if (stub) {
    return url + stub;
  }
  return '';
}


getIcoURL("https://discord.com").then((c) => console.log(c));
// export default getIcoURL;