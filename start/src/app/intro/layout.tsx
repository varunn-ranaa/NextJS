export default function IntroLayout(
    {
    children,
  }: {
    children: React.ReactNode
  }
){
  return(
    <div className="text-2xl mt-4 text-center">{children}</div>
  )
}