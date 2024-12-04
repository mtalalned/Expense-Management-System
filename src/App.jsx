// import React, { useRef, useState } from 'react'

// const App = () => {
  

//   const cashoutArray = ['groceries' , 'fuel' , 'food/drink' , 'car/bike' , 'taxi' , 'clothes' , 'shopping' , 'entertainment' , 'electricity']
//   const cashinArray = ['salary' , 'business' , 'investment' , 'loan']
//   const inputValue = useRef()
//   const [CategoryValue , setCategoryValue] = useState('')
//   const [ SourceofFundsValue , setSourceofFundsValue ] = useState('')
//   const [CashValue , setCashValue] = useState('')
//   const cashArray = ['cashin' , 'cashout']

//   const addCashData = (event) => {
//     event.preventDefault()
//     console.log (CategoryValue)
//     console.log (SourceofFundsValue)
//     console.log (inputValue.current.value)
//   }

//   return (
//     <>
//     <div className='flex justify-center gap-[150px]'>
//       <div className='flex flex-col justify-center gap-4'>
//         <p>cash in</p>
//         <p>10000</p>
//       </div>
//       <div className='flex flex-col justify-center gap-4'>
//         <p>cash out</p>
//         <p>50000</p>
//       </div>
//       <div className='flex flex-col justify-center gap-4'>
//         <p>balnace</p>
//         <p>2000</p>
//       </div>
//     </div>

//     <form onSubmit={(event)=> addCashData(event)}>
      
//       <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" ref={inputValue}/>
      
      
//       <div className="dropdown">
//         <div tabIndex={0} className="btn m-1">{CashValue === '' ? 'Nature of funds' : CashValue}</div>
//         <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
//           {cashArray.map ((item , index ) => {
//             return <li onClick={()=> setCashValue (item)}><a>{item}</a></li>
//           })}
//         </ul>
//       </div>
    
//       {CashValue === 'cashin' ? <div className="dropdown">
//         <div tabIndex={0} className="btn m-1">{CategoryValue === '' ? 'Select Category' : CategoryValue}</div>
//         <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
//           {cashinArray.map ((item , index) => {
//             return <li onClick={()=> setCategoryValue (item)}><a>{item}</a></li>
//           })}
//         </ul>
//       </div> : <div className="dropdown">
//         <div tabIndex={0} className="btn m-1">{SourceofFundsValue === '' ? 'Select Category' : SourceofFundsValue}</div>
//         <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
//         {cashoutArray.map ((item , index) => {
//             return <li onClick={()=> setSourceofFundsValue (item)}><a>{item}</a></li>
//           })}
//         </ul>
//       </div>}
      


      

//       <button type='submit' className="btn btn-active btn-primary">Done</button>
      
//     </form>
//     </>
//   )
// }

// export default App





// export default function App() {
//   const { register, handleSubmit, watch, formState: { errors } } = useForm();
//   const onSubmit = data => console.log(data);
  
//   console.log(watch("example")); // watch input value by passing the name of it

//   return (
//     /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* register your input into the hook by invoking the "register" function */}
//       <input defaultValue="test" {...register("example")} />
      
//       {/* include validation with required or other standard HTML validation rules */}
//       <input {...register("exampleRequired", { required: true })} />
//       {/* errors will return when field validation fails  */}
//       {errors.exampleRequired && <span>This field is required</span>}
      
//       <input type="submit" />
//     </form>
//   );
// }






import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form";

const App = () => {
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const cashArray = ['cashin' , 'cashout']
  const cashoutArray = ['groceries' , 'fuel' , 'food/drink' , 'car/bike' , 'taxi' , 'clothes' , 'shopping' , 'entertainment' , 'electricity']
  const cashinArray = ['salary' , 'business' , 'investment' , 'loan']
  const salaryArray = ['expertizo' , 'software house']
  const businessArray = ['Medical Store' , 'Car Business' , 'Restaurant']
  const investmentArray = ['Bitcoin' , 'Shares']
  const loanArray = ['freinds' , 'relatives' , 'family']
  const [cashNature , setCashNature] = useState('')
  const [CashinCategory , setCashinCategory] = useState('')
  const [expenseArray , setExpenseArray] = useState([])
  const [ cashInTotalArray , setCashInTotalArray] = useState([])
  const [ cashoutTotalArray , setCashOutTotalArray] = useState([])


  const onSubmit = (data) => {
    
    console.log(data);
    expenseArray.push(data)
    setExpenseArray([...expenseArray])

    const CITotal = expenseArray.filter (item => item.NatureofCash === 'cashin')
    setCashInTotalArray([...CITotal])

    const COTotal = expenseArray.filter (item => item.NatureofCash === 'cashout')
    setCashOutTotalArray([...COTotal])

  }
  // const inputValue = useRef()
  // const [CategoryValue , setCategoryValue] = useState('')
  // const [ SourceofFundsValue , setSourceofFundsValue ] = useState('')
  // const [CashValue , setCashValue] = useState('')
 

  return (
    <>
    <div className='flex justify-center gap-[150px]'>
      <div className='flex flex-col justify-center gap-4'>
        <p>Cash in</p>
        <p>{cashInTotalArray.reduce((acc , CVal) => {
          return acc + +CVal.inputValue 
        } , 0)}</p>
      </div>
      <div className='flex flex-col justify-center gap-4'>
        <p>Cash out</p>
        <p>{cashoutTotalArray.reduce((acc , CVal) => {
          return acc + +CVal.inputValue 
        } , 0)}</p>
      </div>
      <div className='flex flex-col justify-center gap-4'>
        <p>Balance</p>
        <p>{cashInTotalArray.reduce((acc , CVal) => {
          return acc + +CVal.inputValue 
        } , 0) - cashoutTotalArray.reduce((acc , CVal) => {
          return acc + +CVal.inputValue 
        } , 0)}</p>
      </div>
    </div>

    <form onSubmit={handleSubmit(onSubmit)}>
      
      <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" {...register('inputValue' , {required: true})}/>
      {errors.inputValue && <span>This field is required</span>}      
      
      
      <select {...register('NatureofCash')} onChange={(e => setCashNature (e.target.value))}>
        <option defaultValue={'Nature of Cash'}>Nature of Cash</option>
        {cashArray.map ((item , index ) => {
            return <option key={index} value={item}>{item}</option>
        })}
      </select>

        {cashNature === 'cashin'? <select {...register('CashinValue')} onChange={(e)=> setCashinCategory(e.target.value)}>
        <option defaultValue={'Cashin Category'}>Select Cashin Category</option>
        {cashinArray.map ((item , index ) => {
            return <option key={index} value={item}>{item}</option>
        })}
      </select> : cashNature === '' ? null : <select {...register('CashOutValue')}>
        <option defaultValue={'Cashout Category'}>Select Cashout Category</option>
        {cashoutArray.map ((item , index ) => {
            return <option key={index} value={item}>{item}</option>
        })}
      </select>}
      
      {CashinCategory === 'salary' ? <select {...register('Source of funds')}>
        <option defaultValue={'Source of funds'}>Select Source of funds</option>
        {salaryArray.map ((item , index ) => {
            return <option key={index} value={item}>{item}</option>
        })}
      </select> : CashinCategory === 'business' ? <select {...register('Source of funds')}>
        <option defaultValue={'Source of funds'}>Select Source of funds</option>
        {businessArray.map ((item , index ) => {
            return <option key={index} value={item}>{item}</option>
        })}
      </select> : CashinCategory === 'investment' ? <select {...register('Source of funds')}>
        <option defaultValue={'Source of funds'}>Select Source of funds</option>
        {investmentArray.map ((item , index ) => {
            return <option key={index} value={item}>{item}</option>
        })}
      </select> : CashinCategory === 'loan' ? <select {...register('Source of funds')}>
        <option defaultValue={'Source of funds'}>Select Source of funds</option>
        {loanArray.map ((item , index ) => {
            return <option key={index} value={item}>{item}</option>
        })}
      </select> : null}
      
      <button type='submit' className="btn btn-active btn-primary">Done</button>
      
    </form>
    </>
  )
}

export default App
