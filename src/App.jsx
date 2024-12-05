import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form";

const App = () => {
  
  const { register, handleSubmit, watch, formState: { errors } , setValue , trigger} = useForm();
  const cashArray = ['Cashin' , 'Cashout']
  const cashoutArray = ['groceries' , 'fuel' , 'food/drink' , 'car/bike' , 'taxi' , 'clothes' , 'shopping' , 'entertainment' , 'electricity']
  const cashinArray = ['salary' , 'business' , 'investment' , 'loan']
  const salaryArray = ['expertizo' , 'software house']
  const businessArray = ['Medical Store' , 'Car Business' , 'Restaurant']
  const investmentArray = ['Bitcoin' , 'Shares']
  const loanArray = ['freinds' , 'relatives' , 'family']
  const [cashNature , setCashNature] = useState('')
  const [CashinCategory , setCashinCategory] = useState('')
  const [CashOutCategory, setCashOutCategory] = useState('')
  const [expenseArray , setExpenseArray] = useState([])
  const [ cashInTotalArray , setCashInTotalArray] = useState([])
  const [ cashoutTotalArray , setCashOutTotalArray] = useState([])



  const onSubmit = (data) => {
    
    // console.log(data);
  
    const copyOfData = data

    if (data.NatureofCash === 'Cashin' && data.CashinValue) {
      delete copyOfData.CashOutValue;
      console.log (copyOfData)
      expenseArray.push({...copyOfData , addDate: getDate()}); 
      setExpenseArray([...expenseArray]);
      
      const CITotal = expenseArray.filter(item => item.NatureofCash === 'Cashin');
      setCashInTotalArray([...CITotal]);
    }
  
    if (data.NatureofCash === 'Cashout' && data.CashOutValue) {
      delete copyOfData.CashinValue;
      delete copyOfData.Sourceoffunds;
      console.log (copyOfData)
      expenseArray.push({...copyOfData , addDate: getDate()});  
      setExpenseArray([...expenseArray]);
      
      const COTotal = expenseArray.filter(item => item.NatureofCash === 'Cashout');
      setCashOutTotalArray([...COTotal]);
    }
  };



  const handleCashNature = (category) => {
      setCashNature (category)
      setValue('NatureofCash' , category)
      trigger('NatureofCash')
  }



  
  const handleCashinCategory = (category) => {
      setCashinCategory (category)
      setValue ('CashinValue' , category)
      trigger('CashinValue')
  }

  
  const handleCashOutCategory = (category) => {
    setCashOutCategory (category)
    setValue ('CashOutValue' , category)
    trigger('CashOutValue')
  }


  const handleSourceOfFunds = (category) => {
    setValue ('Sourceoffunds' , category)
    trigger('Sourceoffunds')
  }


  const deleteItem = (index) => {
    
    expenseArray.splice (index , 1)
    setExpenseArray([...expenseArray])
    
    const CITotal = expenseArray.filter(item => item.NatureofCash === 'Cashin');
      setCashInTotalArray([...CITotal]);

    const COTotal = expenseArray.filter(item => item.NatureofCash === 'Cashout');
    setCashOutTotalArray([...COTotal]);
  }
  
  function getDate() {
    const date = new Date();
    const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);
    const year = new Intl.DateTimeFormat('en-GB', { year: 'numeric' }).format(date);
  
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
  }


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




    <div>


        <form onSubmit={handleSubmit(onSubmit)}>
        
          <div>
            <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" {...register('inputValue' , {required: true})}/>
            {errors.inputValue && <span>This field is required</span>}      
          </div>
        


          <div>
            <select {...register('NatureofCash' , {required: 'Nature of Cash is required'})} onChange={(e) => handleCashNature (e.target.value)}>
              <option value={''}>Nature of Cash</option>
              {cashArray.map ((item , index ) => {
                  return <option key={index} value={item}>{item}</option>
              })}
            </select>
            {errors.NatureofCash && <span>{errors.NatureofCash.message}</span>}
          </div>

          
              

          
            {cashNature === 'Cashin'? <div>
              <select {...register('CashinValue' , {required: 'Cashin category is required'})} onChange={(e)=> handleCashinCategory(e.target.value)}>
            <option value={''}>Select Cashin Category</option>
            {cashinArray.map ((item , index ) => {
                return <option key={index} value={item}>{item}</option>
            })}
          </select>
          {errors.CashinValue && <span>{errors.CashinValue.message}</span>}
            </div>  : cashNature === 'Cashout' ? <div>
            <select {...register('CashOutValue' , {required: 'Cashout category is required'})} onChange={(e) => handleCashOutCategory(e.target.value)}>
            <option value={''}>Select Cashout Category</option>
            {cashoutArray.map ((item , index ) => {
                return <option key={index} value={item}>{item}</option>
            })}
          </select>
          {errors.CashOutValue && <span>{errors.CashOutValue.message}</span>}
            </div>
              :  null}
          




          {CashinCategory === 'salary' && cashNature === 'Cashin' ? <select {...register('Sourceoffunds' , {required: 'Source of funds is required'})} onChange={(e) => handleSourceOfFunds (e.target.value)}>
            <option value={''}>Select Source of funds</option>
            {salaryArray.map ((item , index ) => {
                return <option key={index} value={item}>{item}</option>
            })}
          </select> : CashinCategory === 'business' && cashNature === 'Cashin'? <select {...register('Sourceoffunds' , {required: 'Source of funds is required'})} onChange={(e) => handleSourceOfFunds (e.target.value)}>
            <option value={''}>Select Source of funds</option>
            {businessArray.map ((item , index ) => {
                return <option key={index} value={item}>{item}</option>
            })}
          </select> : CashinCategory === 'investment' && cashNature === 'Cashin' ? <select {...register('Sourceoffunds' , {required: 'Source of funds is required'})} onChange={(e) => handleSourceOfFunds (e.target.value)}>
            <option value={''}>Select Source of funds</option>
            {investmentArray.map ((item , index ) => {
                return <option key={index} value={item}>{item}</option>
            })}
          </select> : CashinCategory === 'loan' && cashNature === 'Cashin' ? <select {...register('Sourceoffunds' , {required: 'Source of funds is required'})} onChange={(e) => handleSourceOfFunds (e.target.value)}>
            <option value={''}>Select Source of funds</option>
            {loanArray.map ((item , index ) => {
                return <option key={index} value={item}>{item}</option>
            })}
          </select> : null}
          {errors.Sourceoffunds && <span>{errors.Sourceoffunds.message}</span>}

        
          <button type='submit' className="btn btn-active btn-primary">Done</button>
        
      </form>
    </div>






    <div className='flex flex-col justify-center items-center gap-2'>
      
      <div className='flex justify-center gap-5'>
        <button className="btn btn-active btn-primary w-[75px]">S.No</button>
        <button className="btn btn-active btn-primary w-[175px]">Nature</button>
        <button className="btn btn-active btn-primary w-[175px]">Category</button>
        <button className="btn btn-active btn-primary w-[175px]">Source</button>
        <button className="btn btn-active btn-primary w-[175px]">Amount {'Rs.'}</button>
        <button className="btn w-[100px]">Action</button>
      </div>

      {expenseArray.map ((item , index)=> {
        return <div className='flex justify-center items-center gap-5 border-b border-b-2 py-3'>
        <p className='w-[75px] text-center'>{index+1}</p>
        <p className='w-[175px] text-center'>{item.NatureofCash}</p>
        <p className='w-[175px] text-center'>{item.CashinValue}{item.CashOutValue}</p>
        <p className='w-[175px] text-center'>{item.Sourceoffunds || 'Nil'}</p>
        <p className='w-[175px] text-center'>{item.inputValue}</p>
        <button className="bg-error rounded text-white py-1 w-[100px]" onClick={()=> deleteItem (index)}>Delete</button>
      </div>
      })}
      
      

    </div>
    
    </>
  )
}

export default App
