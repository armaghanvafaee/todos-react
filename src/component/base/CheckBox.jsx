

export default function CheckBox({text , status,OnchangeHandler}){

    return(
        <div>
        <input type="checkbox" 
          checked={status}
          onChange={() => OnchangeHandler()}
        className="" />
         <p  className={`inline-block mt-1 ml-2 text-gray-600 ${status ?'line-through':''}` }>{text}</p>
        </div>
    )
}