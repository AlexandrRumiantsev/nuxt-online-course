export default defineEventHandler(async (event) => {
  //const { name } = await readBody(event) || {}

  const response = await $fetch(`https://raw.githubusercontent.com/sveltejs/kit/master/README.md`)

  console.log('response',response)
  
  return { 
    content: response 
  }
})