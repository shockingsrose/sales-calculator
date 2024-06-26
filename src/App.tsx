import { useMemo, useRef, useState } from 'react'
import Decimal from 'decimal.js'

import './App.css'

interface CalcItem {
  count: number
  price: number
  subTotal: number
}

function App() {
  const [input, setInput] = useState('')
  const [list, setList] = useState<CalcItem[]>([])

  const inputRef = useRef<HTMLInputElement>(null);

  // const updateList = (list) => {
  //   setList(list);
  //   setInput('');
  // }

  const handleCalculate = () => {
    const arr = input.split(/[:\s]/);

    if (arr.length !== 2) {
      alert('请输入正确的数量和价格')
      return
    }

    list.push({
      count: Number(arr[0]),
      price: Number(arr[1]),
      subTotal: new Decimal(arr[0]).times(new Decimal(arr[1])).toNumber()
    })

    setList([...list])
    setInput('')

    inputRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  const total = useMemo(() => {
    return list.reduce((acc, item) => {
      return acc + item.subTotal
    }, 0)

  }, [list])

  const handleItemChange = ({ item, key, value }: { item: CalcItem, key: keyof CalcItem; value: number }) => {
    item[key] = value
    item.subTotal = new Decimal(item.count).times(new Decimal(item.price)).toNumber()
    setList([...list])
  }

  return (
    <div className="position-relative h-full w-full">
      <h1>Calculator</h1>


      <div className='flex justify-between'>
        <p>数量</p>
        <p>价格</p>
        <p>小计</p>
      </div>

      <div>
        {
          list.map((item, index) => {
            return <div
              key={index}
              className='flex justify-between py-1'
              style={{ borderBottom: '1px solid #333' }}
            >
              <input
                type='number'
                inputMode="decimal"
                value={item.count}
                className="  bg-transparent outline-none w-24  border-none text-sm "
                onChange={(e) => handleItemChange({ item, key: 'count', value: Number(e.target.value) })} />
              <input
                type='number'
                inputMode="decimal"
                value={item.price}
                className="  bg-transparent outline-none w-24 border-none text-sm"
                onChange={(e) => handleItemChange({ item, key: 'price', value: Number(e.target.value) })} />
              <span>{item.subTotal}</span>
            </div>
          })
        }
      </div>

      {
        !!total &&
        <div className='flex justify-between items-center mt-6'>
          <p>总计：{total}</p>
          <div
            className="flex-none w-8 rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
            onClick={() => setList([])}
          >
            重置
          </div>
        </div>
      }

      <div className='flex justify-between gap-1 w-full sticky bottom-20'>
        <div className="w-full flex items-center bg-gray-200 rounded-full p-2">
          <input
            ref={inputRef}
            value={input}
            type="text"
            placeholder="请输入数量和价格，使用冒号隔开"
            className="flex-1 text-dark bg-transparent outline-none px-2 border-none text-sm"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCalculate();
              }
            }}
          />
        </div>

      </div>


    </div >
  )
}

export default App
