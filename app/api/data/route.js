import db from "./config/dbSQL"
import conn from "./config/dbSQL"


export const POST = async (request) => {
    const data = await request.json()
    const {name, email, text, lang} = data
try {
    if(name && text && lang){
        const response = await db('wishes').insert({user_name: name, email, text, language: lang})
        return new Response('Data was recieved')
    }else{
        return new Response("Data wasn't recieved")
    }
} catch (error) {
    return new Response("Something was wrong")
}
   
}

export const GET = async (request) => {
    const wishes = await db('wishes')
    .select('user_name', 'text', 'language')
    .orderBy('user_id', 'asc');    console.log(wishes)
    return new Response(JSON.stringify({stories: wishes}))
}