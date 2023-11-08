export default function extract(str) {

  // let matchList = str.match(/<SN>[0-9a-zA-Z<>|/]*(?=<\/SN>)/g)
  let matchList = str.match(/<SN>.*(?=<\/SN>)/g)

  if (!matchList) {
    return '没有匹配到<SN>xxx</SN>格式数据';
  }

  matchList = matchList.map((item) => item.slice(4));

  let result = [];

  for (let i = 0; i < matchList.length; i += 1) {
    const item = matchList[i];
    const itemMatch = item.match(/<(.*)>/);

    if (!itemMatch) {
      return `${item} 没有匹配到<SN><xxxx></SN>格式数据`;
    }

    let head = itemMatch[1];

    const footerIndex = item.indexOf('>') + 1;
    const footerList =  item.slice(footerIndex).split('|');

    if (!footerList) {
      return `${item} 没有匹配到<SN><xxxx></SN>xxxx|xxxx格式数据`;
    }

    const single = footerList.map((fi) => `${head}${fi}`);
    result = [
      ...result,
      ...single
    ]
  }

  return result;
}
