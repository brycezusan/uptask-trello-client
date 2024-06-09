export const formatDate = (dateString:string)=>{
  const date =  new Date(dateString)
  const formatter = new Intl.DateTimeFormat('es-ES',{
    year:'numeric',
    month:'long',
    day:'2-digit'
  })

  return formatter.format(date)
}