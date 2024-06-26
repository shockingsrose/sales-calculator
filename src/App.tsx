import { useMemo, useState } from 'react'

import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [list, setList] = useState<{ price: number; count: number }[]>([])

  const handleCalculate = () => {
    console.log('input', input);
    const arr = input.split(/[:\s]/);

    if (arr.length !== 2) {
      alert('请输入正确的数量和价格')
      return
    }

    list.push({ count: Number(arr[0]), price: Number(arr[1]) })

    setList([...list])
    setInput('')
  }

  const total = useMemo(() => {
    return list.reduce((acc, item) => {
      return acc + item.count * item.price
    }, 0)

  }, [list])

  return (
    <div className="position-relative h-full">
      <h1>Sale Calculator</h1>


      <div className='flex justify-between'>
        <p>数量</p>
        <p>价格</p>
        <p>小计</p>
      </div>

      {
        list.map((item) => {
          return <div className='flex justify-between'>
            <p>{item.count}</p>
            <p>{item.price}</p>
            <p>{item.count * item.price}</p>
          </div>
        })
      }

      {
        !!total &&
        <div className='flex justify-between items-center mt-6'>
          <p>总计：{total}</p>
          <div
            className="flex-none w-8 rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">
            重置
          </div>
        </div>
      }



      <div className='flex justify-between gap-1 absolute w-full bottom-6'>
        <div className="w-full flex items-center bg-gray-200 rounded-full p-2">
          <input
            value={input}
            type="text"
            placeholder="请输入数量和价格，使用空格隔开，示例: 12 123"
            className="flex-1 text-dark bg-transparent outline-none px-2 border-none"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCalculate();
              }
            }}
          />
        </div>

      </div>


    </div>
  )
}

export default App
