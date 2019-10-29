const req = require.context(`.`, true, /\.svg$/)

const iconList = req.keys().reduce((list, key) => {
  key |> console.log ('key', #)
  const icon = key.replace(/\.\/(.+).svg/, `$1`)
  icon |> console.log ('icon', #)
  list[icon] = req(key).default

  return list
}, {})

export default iconList
