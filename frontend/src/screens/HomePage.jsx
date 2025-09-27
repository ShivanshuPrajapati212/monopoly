import { useNavigate } from "react-router"

const HomePage = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center'>
      <div><img src="/logo.png" alt="logo" className='h-200 w-200'/></div>
      <div className='text-2xl'>
        <button onClick={()=> navigate("/game")} type="button" class="btn">Play Monopoly!!!</button>
      </div> 
    </div>
  )
}

export default HomePage
