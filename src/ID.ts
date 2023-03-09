

export const RandomID =() => [...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');


// const array = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0"]
// export const RandomID = Array.from({length: 8}, () => array[Math.floor(Math.random() * array.length)]).join().replaceAll(",", "")

