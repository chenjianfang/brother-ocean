import { useState } from 'react';
import { Row, Col, Input, Button, message, Space } from 'antd';
import extract from './utils/extract';
import './style.css'

const { TextArea } = Input;

const buttonStyle = {display: 'flex', justifyContent: 'center', alignItems: 'center'}

function App() {
  const [str, setStr] = useState('');
  const [list, setList] = useState([]);
  const [repeat, setRepeat] = useState([]);

  const extractClick = async () => {
    if (!str) {
      return message.info('请输入内容')
    }
    let data =  extract(str);

    if (Array.isArray(data)) {
      let resultList = []; // 去重结果
      let repeatList = []; // 重复结果

      // 判断重复项
      data.forEach((item) => {
        if (resultList.includes(item)) {
          // 重复
          repeatList.push(item);
        } else {
          resultList.push(item);
        }
      })

      setList(resultList);
      setRepeat(repeatList);

      message.success('提取成功!');
    } else {
      message.error(data);
    }
  }

  return (
    <>
      一直免费。使用<a href="https://softforspeed.51xiazai.cn/down/ChromeSetup.exe">谷歌浏览器</a>打开
      <div className="app">
        <textarea className="showBox" rows={30} value={str} onChange={(e) => setStr(e.target.value)} />
        <div className="button" onClick={extractClick}>提取</div>
        <div className="showBox">
          {
            list.map((item, index) => (<p key={item}>{item}</p>))
          }
          {
            repeat.length ? (
              <div className='mt-10'>
                重复项:
                {
                  repeat.map((item) => (<p key={item}>{item}</p>))
                }
              </div>
            ): null
          }
        </div>
      </div>
    </>
  );
}

export default App;
