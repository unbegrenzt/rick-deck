import Lottie from "lottie-react";
import ricksDrinkAnimation from "assets/anim/ricksDrinkAnimation.json";

export default function NoCharacters() {
  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'>
      <h2 className='text-xl md:text-2xl text-center'>Sera mejor que tomemos algo de otro universo!</h2>
      <Lottie
        animationData={ricksDrinkAnimation}
        style={{
          width: 300,
          height: 'auto'
        }}
      />
    </div>
  )
}
