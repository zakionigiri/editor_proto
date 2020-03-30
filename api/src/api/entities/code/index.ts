import fs from 'fs'
import { exec } from 'child_process'

const mapLangInfo = (language: string) => {
    switch(language) {
        case "javascript":
            return ['js', 'node']
        case "python":
            return ['py', 'python']
        default: 
            throw new Error("Invalid language")
    }
}

export const execCode = async (language: string, code: string) => {
    console.log("start executing code")
    console.log(code)
    const langInfo = mapLangInfo(language)
    const fileName = `script.${langInfo[0]}`
    await fs.writeFile(fileName, code, (err) => {
        if(err) throw new Error(JSON.stringify(err))
        console.log("new file created")
    })

    return new Promise( (resolve, reject) => {
        exec(`${langInfo[1]} ${fileName}`, (err, stdout, stderr) => {
            if(err) resolve(stderr)

            console.log(stdout || stderr)
            resolve(stdout || stderr)
        })
    })
}