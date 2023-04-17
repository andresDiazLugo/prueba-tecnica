
const str = "user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=light%20Blue"

const separateElements = (simbol,value)=>{
  //esta funcion nos va a separar los string en arreglos
    const separate = value.split(simbol);
    return separate
}

const clearSimbol = (str,value,replace)=>{
  //esta function me remplaza un valor que tenga en el string por otro valor que coloque en el parametro
  const replaceWord = value.replace(str,replace);
  return replaceWord
}

const convertQueryToMap = (query)=>{
  //creo el objecto en el que se van a agregar las propiedades
  const urlObj = {}
  //utilizo una referencia para no perder la ubicacion de mis propiedades
  let reference = urlObj
  /*guardo en una constante el resultado de la funcion clearSimbol en este
  caso quiero que me remplaze %20 por espacios en blanco  
  */
  const clearWordSimbol = clearSimbol("%20",query," ")
  /*guardo un arreglo en la cual se separo por el simbolo & ejemplo de valor devuelto
  ["user.name.firstname=andres","user.name.lastname=alberto","user.address=jasjdjsajdsa"]
  */
  const arrayElements = separateElements("&",clearWordSimbol)
  /*vamos a recorrer cada elemento que tengamos en nuestro arreglo para poder separar los puntos
  y a si poder hacerlos elementos unicos ejemplo
  ["user.name.firstname=andres","user.name.lastname=alberto","user.address=jasjdjsajdsa"]
  recorremos el arreglo y cada elemento ("user.name.firstname=andres")
  lo convertimos en un arreglo nuevo y separamos por punto nos quedaria algo asi
  ["user","name,","firstname=andres"]
  */
  for(elements of arrayElements){
    /*["user.name.firstname=andres","user.name.lastname=alberto","user.address=jasjdjsajdsa"]
      recorremos
    */
    const elementArray = separateElements(".",elements)
    /*
    particionamos los elementos y quedaria algo asi
    ["user.name.firstname=andres","user.name.lastname=alberto","user.address=jasjdjsajdsa"]
    tenemos trese elementos lo separamos
    const elementArray = ["user","name,","firstname=andres"] 
    const elementArray = ["user","name,","lastname=alberto"] 
    const elementArray = ["user","address=sadjasjdklasj] 
    */
    for(element of elementArray){
      //recorremos cada ["user","name,","firstname=andres"] 
      if(reference.hasOwnProperty(element)){
      //preguntamos si los elementos "user","name","firstname=andres" existe en el objecto urlObj
        reference = reference[element]
      }else if(element.includes("=")){
      /*preguntamos si los elementos que recorremos incluye el signo = , en este caso solo van
      a entrar los ultimos datos de la propedad entonces separamos ese elemento en un arreglo
      en donde la pocicion 0 va a ser la key y la pocicion 1 va a ser el valor
      */
        const divElement = separateElements("=",element)
        /*entonces en reference vamos a tener el valor de la ultima propiedad agregada
        y agregaremos la key y value como ultimo 
        */
        reference = reference[divElement[0]] = divElement[1]
        /*
        una vez que se agrego todo los elementos como propiedades dek objecto 
        vamos a setear la variable de nuevo por el valor del urlObj ya que si seteamos 
        no podremos comparar si exite una propiedad en urlObj ya reference nos guarda la referencia del
        ultimo valor en este caso seria {firstname=andres}
        */
        reference = urlObj
      }else{
        /*si no existe la propiedad, la agregamos al objecto con valor objecto y reasignamos
        la variable por el valor ejemplo
         refrence = {}//comienzo de la referencia
         reference = {user:{}} cuando entra en la condicion crea una prop y se reasigna con lo que vale la prop
         reference = user:{} cuando entra en la condicion crea una prop y se reasigna con lo que vale la prop
         reference = user:{name:{}}cuando entra en la condicion crea una prop y se reasigna con lo que vale la prop
         referce = nam:{} cuando entra en la condicion crea una prop y se reasigna con lo que vale la prop
        */
        reference = reference[element]={}
      }
    }
  }
  return urlObj //retorno el objecto con sus propiedades agregadas
}
console.log(convertQueryToMap(str))

