import _styled from 'styled-components'

// _styled.div |> console.log ('styled', #)

// class Styled {
//   constructor () {

//     return _styled
//   }
// }

// const styled = (component) => {
//   // console.log (`styled called`)
//   const returning = (...args) => {
//     // args |> console.log ('args', #)
//     return _styled[component](...args)
//   }
//   // returning |> console.log ('returning', #)
//   return returning
// }

const styled = _styled

// const styled = new Styled

export default styled

// class Func {
//   constructor (_func) {
//     this._func = _func

//     return ((...args) => {
//       alert (`${args}`)
//       this._func()
//     })
//   }
// }

// const test = new Func(() => {
//   alert (`called a function2`)
// })

// test.div(123)
