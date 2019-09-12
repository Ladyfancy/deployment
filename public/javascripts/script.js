function deleteThis(color){
  console.log(color.innerText) //purple 
  
  axios
    .delete('/deleteColor', { data :  {color:color.innerText} })
    .then(colorDeleted => { 
      console.log(colorDeleted)
      color.remove()
    })
    .catch(err => { 

      console.error(err)
      alert('nooooo')
      window.location.href = '/'
    })


  
}