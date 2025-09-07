import {exec, spawn} from 'node:child_process'
import { watch } from 'node:fs/promises'

const [node, _, file] = process.argv

function spawnNode () {
    const childProcess = spawn(node, [file])
    childProcess.stdout.on('data', (data) => {
        console.log(data.toString('utf8'))
    })

    childProcess.stderr.on('data', (data) => {
        console.error(data.toString('utf8'))
    })

    childProcess.on('close', (code) => {
        if (code > 0) {
            throw new Error('Process exited : ' + code)
        }
    })

    return childProcess
}

let childNodeProcess = spawnNode()
const watcher = watch('./', {recursive: true})
for await (const event of watcher) {
    if (event.filename.endsWith('.js')) {
        childNodeProcess.kill()
        childNodeProcess = spawnNode()
    }
}


