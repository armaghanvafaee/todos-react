

export default function Input({ value,placeholder , onKeyDown,onChange}) {


  return (
    <>

        <input
        value={value}
          type="text"
          placeholder={placeholder}
          className="w-full px-2 py-3 border rounded outline-none border-grey-600"
          onChange={e=>onChange(e.target.value)}
          onKeyDown={
            (e)=>{
              if(e.key==="Enter" ){
                onKeyDown();
                
              }
          
            }
            }
        />
   
    </>
  );
}
