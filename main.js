import { readFile } from "node:fs"
import { exit } from "node:process"
import { interpret } from "./interpret.js"
import { program } from "commander"


const main = () => {
    program.version("1.0")
        .argument("<filename>", "The file you want to run")
        .action(filename => {
            readFile(filename, "utf-8", (err, data) => {
                if (err) exit(1)
            
                console.log(interpret(data))
            })
        })

    program.parse()
}

main()