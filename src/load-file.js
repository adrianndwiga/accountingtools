import { readFile } from 'fs'

class File {
    constructor(data) {
        const _data = JSON.parse(data)
        this.transactions = _data.list
        this.total = _data.list.length
    }
}

let props = {
    filePath: "",
    encoding: ""
}

process.argv.forEach(value => {
    if(value.startsWith("-f:")) {
        const parts = value.split(":")
        if (parts.length > 1) {
            parts.splice(0, 1)
            props.filePath = parts[0]
        }
    }
    if(value.startsWith("-e:")) {
        const parts = value.split(":")
        if (parts.length > 1) {
            parts.splice(0, 1)
            props.encoding = parts[0]
        }
    }
})

console.log(props)


readFile(props.filePath, props.encoding, (err, data) => {
    if(err !== null) console.log(err)
    console.log(new File(data))
})
